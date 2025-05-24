package vn.tdtu.shop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import vn.tdtu.shop.util.SecurityUtil;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    private String avatar;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String address;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant updatedAt;

    private String createdBy;

    private String updatedBy;

    @PrePersist
    private void initializeUser() {
        this.createdBy = resolveCreatedBy();
        this.avatar = "avatar-default.webp";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    private void updateUser() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().orElse("");
        this.updatedAt = Instant.now();
    }

    private String resolveCreatedBy() {
        String currentUser = SecurityUtil.getCurrentUserLogin().orElse("");
        return currentUser.isEmpty() || currentUser.equals("anonymousUser") ? this.email : currentUser;
    }
}