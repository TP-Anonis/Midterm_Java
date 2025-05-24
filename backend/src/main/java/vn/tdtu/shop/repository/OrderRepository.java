package vn.tdtu.shop.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import vn.tdtu.shop.domain.Order;
import vn.tdtu.shop.util.constant.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Page<Order> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT COALESCE(SUM(oi.price * oi.quantity), 0) " +
            "FROM Order o JOIN o.items oi " +
            "WHERE o.orderDate >= :startDate AND o.orderDate < :endDate " +
            "AND o.status IN (vn.tdtu.shop.util.constant.OrderStatus.CONFIRMED, " +
            "vn.tdtu.shop.util.constant.OrderStatus.SHIPPED, " +
            "vn.tdtu.shop.util.constant.OrderStatus.DELIVERED)")
    BigDecimal calculateRevenueBetweenDates(Instant startDate, Instant endDate);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    long countByStatus(OrderStatus status);

    @Query("SELECT MONTH(o.orderDate) as month, COALESCE(SUM(oi.price * oi.quantity), 0) as revenue " +
            "FROM Order o JOIN o.items oi " +
            "WHERE YEAR(o.orderDate) = :year " +
            "AND o.status IN (vn.tdtu.shop.util.constant.OrderStatus.CONFIRMED, " +
            "vn.tdtu.shop.util.constant.OrderStatus.SHIPPED, " +
            "vn.tdtu.shop.util.constant.OrderStatus.DELIVERED) " +
            "GROUP BY MONTH(o.orderDate)")
    List<Object[]> getMonthlyRevenueForYear(int year);
    
    
    @Modifying
    @Query("DELETE FROM Order o WHERE o.user.id = :userId")
    void deleteByUserId(Long userId);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId")
    long countByUserId(Long userId);
}