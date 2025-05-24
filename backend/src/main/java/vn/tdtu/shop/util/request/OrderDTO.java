package vn.tdtu.shop.util.request;

import lombok.Data;
import vn.tdtu.shop.util.constant.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private Long userId;
    private Instant orderDate;
    private OrderStatus status;
    private String shippingAddress;
    private String receiverPhone;
    private String receiverName;
    private List<OrderItemDTO> items;
    private BigDecimal totalAmount;
}