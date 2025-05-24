package vn.tdtu.shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.tdtu.shop.domain.*;
import vn.tdtu.shop.repository.*;
import vn.tdtu.shop.service.specification.OrderSpecification;
import vn.tdtu.shop.util.constant.OrderStatus;
import vn.tdtu.shop.util.error.ResourceNotFoundException;
import vn.tdtu.shop.util.request.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderDTO createOrder(CreateOrderRequest request) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng không tồn tại"));

        if (cart.getCartItems().isEmpty()) {
            throw new IllegalStateException("Giỏ hàng rỗng");
        }

        // Tạo danh sách OrderItem từ CartItem
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setReceiverPhone(request.getReceiverPhone());
        order.setReceiverName(request.getReceiverName());
        order.setStatus(OrderStatus.PENDING);

        cart.getCartItems().forEach(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            order.getItems().add(orderItem);
        });

        order.setTotalAmount(calculateTotalAmount(order));
        Order savedOrder = orderRepository.save(order);

        updateProductSoldQuantities(savedOrder);
        clearCart(cart.getId());

        return mapToOrderDTO(savedOrder);
    }

    public Page<OrderDTO> getUserOrders(Pageable pageable) {
        User user = getCurrentUser();
        return orderRepository.findByUserId(user.getId(), pageable)
                .map(this::mapToOrderDTO);
    }

    public OrderDTO getOrderById(Long orderId) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .filter(o -> o.getUser().getId().equals(user.getId()) || hasAdminRole())
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng không tồn tại hoặc không có quyền truy cập"));
        return mapToOrderDTO(order);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng không tồn tại"));
        order.setStatus(request.getStatus());
        return mapToOrderDTO(orderRepository.save(order));
    }

    @Transactional
    public OrderDTO cancelOrder(Long orderId) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .filter(o -> o.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng không tồn tại hoặc không có quyền hủy"));
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Chỉ có thể hủy đơn hàng ở trạng thái PENDING");
        }
        order.setStatus(OrderStatus.CANCELLED);
        return mapToOrderDTO(orderRepository.save(order));
    }

    public Page<OrderDTO> getAllOrders(Pageable pageable, OrderStatus status, Instant startDate, Instant endDate, String search) {
        return orderRepository.findAll(OrderSpecification.filterOrders(status, startDate, endDate, search), pageable)
                .map(this::mapToOrderDTO);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
    }

    private boolean hasAdminRole() {
        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    }

    private BigDecimal calculateTotalAmount(Order order) {
        return order.getItems().stream()
                .map(item -> item.getPrice().multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void updateProductSoldQuantities(Order order) {
        order.getItems().forEach(item -> {
            Product product = item.getProduct();
            product.setSoldQuantity(product.getSoldQuantity() + item.getQuantity());
            productRepository.save(product);
        });
    }

    private void clearCart(Long cartId) {
        cartItemRepository.deleteByCartId(cartId);
        // Không cần cart.getCartItems().clear() vì đã xóa trực tiếp trong DB
    }

    private OrderDTO mapToOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setReceiverPhone(order.getReceiverPhone());
        dto.setReceiverName(order.getReceiverName());
        dto.setItems(order.getItems().stream().map(this::mapToOrderItemDTO).collect(Collectors.toList()));
        dto.setTotalAmount(order.getTotalAmount());
        return dto;
    }

    private OrderItemDTO mapToOrderItemDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();	
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setProductImage(item.getProduct().getImages().isEmpty() ? null : item.getProduct().getImages().get(0).getUrl());
        return dto;
    }
}