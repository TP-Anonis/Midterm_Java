package vn.tdtu.shop.service.specification;

import org.springframework.data.jpa.domain.Specification;
import vn.tdtu.shop.domain.Order;
import vn.tdtu.shop.util.constant.OrderStatus;

import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class OrderSpecification {

    public static Specification<Order> filterOrders(OrderStatus status, Instant startDate, Instant endDate,
            String search) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (startDate != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("orderDate"), startDate));
            }

            if (endDate != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("orderDate"), endDate));
            }

            if (search != null && !search.isBlank()) {
                // Tìm kiếm orderId hoặc receiverPhone
                List<Predicate> searchPredicates = new ArrayList<>();
                
                // Tìm kiếm theo orderId (kiểm tra nếu search là số)
                try {
                    Long orderId = Long.parseLong(search);
                    searchPredicates.add(criteriaBuilder.equal(root.get("id"), orderId));
                } catch (NumberFormatException e) {
                    // Nếu search không phải số, bỏ qua tìm kiếm theo orderId
                }

                // Tìm kiếm theo receiverPhone, chỉ khớp với số điện thoại bắt đầu bằng search
                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("receiverPhone")),
                        search.toLowerCase() + "%")); // Loại bỏ % bên trái, chỉ giữ % bên phải

                // Kết hợp các điều kiện tìm kiếm với OR
                predicates.add(criteriaBuilder.or(searchPredicates.toArray(new Predicate[0])));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}