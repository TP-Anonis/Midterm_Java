package vn.tdtu.shop.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.tdtu.shop.service.CartService;
import vn.tdtu.shop.util.request.AddToCartRequest;
import vn.tdtu.shop.util.request.CartDTO;
import vn.tdtu.shop.util.request.UpdateCartItemRequest;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<CartDTO> fetchCart() {
        return ResponseEntity.ok(retrieveCart());
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<CartDTO> addProductToCart(@Valid @RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(processAddToCart(request));
    }

    @PutMapping("/items/{cartItemId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<CartDTO> updateCartProduct(
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(processUpdateCartItem(cartItemId, request));
    }

    @DeleteMapping("/items/{cartItemId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<CartDTO> deleteCartItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(processRemoveCartItem(cartItemId));
    }

    private CartDTO retrieveCart() {
        return cartService.fetchCart();
    }

    private CartDTO processAddToCart(AddToCartRequest request) {
        return cartService.addProductToCart(request);
    }

    private CartDTO processUpdateCartItem(Long cartItemId, UpdateCartItemRequest request) {
        return cartService.updateCartItemQuantity(cartItemId, request);
    }

    private CartDTO processRemoveCartItem(Long cartItemId) {
        return cartService.removeItemFromCart(cartItemId);
    }
}