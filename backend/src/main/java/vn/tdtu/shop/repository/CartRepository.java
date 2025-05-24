package vn.tdtu.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import vn.tdtu.shop.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
    void deleteByUserId(Long userId);
    
    
}
