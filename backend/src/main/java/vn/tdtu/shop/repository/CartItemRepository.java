package vn.tdtu.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import vn.tdtu.shop.domain.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.product.id = :productId")
    void deleteByProductId(Long productId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartId")
    void deleteByCartId(Long cartId);
}
