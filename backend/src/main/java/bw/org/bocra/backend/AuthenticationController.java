package bw.org.bocra.backend;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import bw.org.bocra.backend.user.User;
import bw.org.bocra.backend.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(bw.org.bocra.backend.AuthenticationController.class);

    private final UserRepository userRepository;
    private final List<String> adminEmails;

    public AuthenticationController(
            UserRepository userRepository,
            @Value("${admin.emails:}") String adminEmailsCsv) {
        this.userRepository = userRepository;
        this.adminEmails = Arrays.stream(adminEmailsCsv.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isEmpty())
                .toList();
        log.info("Admin emails loaded: {}", this.adminEmails);
    }

    @PostMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);

            String uid = decoded.getUid();
            String email = decoded.getEmail();
            boolean isAdmin = email != null && adminEmails.contains(email.toLowerCase());
            String assignedRole = isAdmin ? "admin" : "user";

            // 1. Try to find by Firebase UID (normal path)
            Optional<User> byUid = userRepository.findByUid(uid);

            User user;
            if (byUid.isPresent()) {
                user = byUid.get();
            } else {

                Optional<User> byEmail = userRepository.findByEmail(email);
                if (byEmail.isPresent()) {
                    user = byEmail.get();
                    user.setUid(uid);
                    log.info("Updated UID for existing user: {}", email);
                } else {

                    user = User.builder()
                            .uid(uid)
                            .email(email)
                            .role(assignedRole)
                            .build();
                    log.info("Creating new user: {} with role: {}", email, assignedRole);
                }
            }


            if (isAdmin && !"admin".equals(user.getRole())) {
                user.setRole("admin");
                log.info("Promoting user to admin: {}", email);
            }

            userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                    "uid", user.getUid(),
                    "email", user.getEmail(),
                    "role", user.getRole()));
        } catch (Exception e) {
            log.error("Auth error: {}", e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }
}
