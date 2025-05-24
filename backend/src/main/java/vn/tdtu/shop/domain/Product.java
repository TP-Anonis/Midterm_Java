package vn.tdtu.shop.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @PositiveOrZero(message = "Price must be greater than or equal to 0")
    private BigDecimal price;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long views;

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long soldQuantity;

    @Column
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String detailedDescription;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    @Column(nullable = false)
    private Instant createdAt;

    @Column
    private Instant updatedAt;

    @PrePersist
    private void setCreatedAt() {
        this.createdAt = Instant.now();
    }

    @PreUpdate
    private void setUpdatedAt() {
        this.updatedAt = Instant.now();
    }
}