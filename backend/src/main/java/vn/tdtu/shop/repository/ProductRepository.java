package vn.tdtu.shop.repository;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.tdtu.shop.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(String category, Pageable pageable);

    Page<Product> findByBrand(String brand, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:category IS NULL OR p.category = :category) AND " +
            "(:brand IS NULL OR p.brand = :brand) AND " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> findByMultipleCriteria(
            @Param("category") String category,
            @Param("brand") String brand,
            @Param("name") String name,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);
}
