package vn.tdtu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import vn.tdtu.shop.domain.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	
	@Modifying
    @Query("DELETE FROM OrderItem oi WHERE oi.product.id = :productId")
    void deleteByProductId(Long productId);
}