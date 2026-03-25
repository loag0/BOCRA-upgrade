package com.bocra.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUid(String uid);
    Optional<AppUser> findByEmail(String email);
}