package vn.tdtu.shop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "password_reset_tokens")
@Getter
@Setter
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private Instant expirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    private void setExpirationTime() {
        if (this.expirationTime == null) {
            this.expirationTime = Instant.now().plusSeconds(600);
        }
    }
}