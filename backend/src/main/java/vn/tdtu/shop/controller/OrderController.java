package vn.tdtu.shop.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.tdtu.shop.service.OrderService;
import vn.tdtu.shop.util.constant.OrderStatus;
import vn.tdtu.shop.util.request.CreateOrderRequest;
import vn.tdtu.shop.util.request.OrderDTO;
import vn.tdtu.shop.util.request.UpdateOrderStatusRequest;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<OrderDTO> createNewOrder(@Valid @RequestBody CreateOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Page<OrderDTO>> fetchUserOrders(Pageable pageable) {
        return ResponseEntity.ok(orderService.getUserOrders(pageable));
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<OrderDTO> fetchOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long orderId, @Valid @RequestBody UpdateOrderStatusRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request));
    }

    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<OrderDTO> cancelUserOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<OrderDTO>> fetchAllOrders(
            Pageable pageable,
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) java.time.Instant startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) java.time.Instant endDate,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(orderService.getAllOrders(pageable, status, startDate, endDate, search));
    }
}