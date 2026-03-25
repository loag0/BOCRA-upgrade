package com.bocra.backend;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bocra.backend.user.AppUser;
import com.bocra.backend.user.AppUserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AppUserRepository userRepository;
    private final List<String> adminEmails;

    public AuthController(
            AppUserRepository userRepository,
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
            Optional<AppUser> byUid = userRepository.findByUid(uid);

            AppUser user;
            if (byUid.isPresent()) {
                user = byUid.get();
            } else {
                // 2. UID not found - check if email already exists (handles the case
                //    where a Firebase user was deleted and recreated with a new UID)
                Optional<AppUser> byEmail = userRepository.findByEmail(email);
                if (byEmail.isPresent()) {
                    user = byEmail.get();
                    user.setUid(uid); // Update to the new Firebase UID
                    log.info("Updated UID for existing user: {}", email);
                } else {
                    // 3. Completely new user - create row
                    user = AppUser.builder()
                            .uid(uid)
                            .email(email)
                            .role(assignedRole)
                            .build();
                    log.info("Creating new user: {} with role: {}", email, assignedRole);
                }
            }

            // Promote to admin if email is in the admin list but role isn't admin yet
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
