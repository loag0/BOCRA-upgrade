package com.bocra.backend;

import com.bocra.backend.user.AppUser;
import com.bocra.backend.user.AppUserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AppUserRepository userRepository;

    @PostMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);

            AppUser user = userRepository.findByUid(decoded.getUid())
                    .orElseGet(() -> userRepository.save(
                            AppUser.builder()
                                    .uid(decoded.getUid())
                                    .email(decoded.getEmail())
                                    .role("user")
                                    .build()));

            if (user == null) {
                return ResponseEntity.status(403).body(Map.of("error", "User not found"));
            }

            return ResponseEntity.ok(Map.of(
                    "uid", user.getUid(),
                    "email", user.getEmail(),
                    "role", user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }
}