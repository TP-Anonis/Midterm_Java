package vn.tdtu.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.tdtu.shop.domain.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByTokenAndUserEmail(String token, String email);
}
