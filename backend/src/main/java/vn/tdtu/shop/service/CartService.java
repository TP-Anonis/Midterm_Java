package vn.tdtu.shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.tdtu.shop.domain.Cart;
import vn.tdtu.shop.domain.CartItem;
import vn.tdtu.shop.domain.Product;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.repository.CartItemRepository;
import vn.tdtu.shop.repository.CartRepository;
import vn.tdtu.shop.repository.ProductRepository;
import vn.tdtu.shop.repository.UserRepository;
import vn.tdtu.shop.util.error.ResourceNotFoundException;
import vn.tdtu.shop.util.request.AddToCartRequest;
import vn.tdtu.shop.util.request.CartDTO;
import vn.tdtu.shop.util.request.CartItemDTO;
import vn.tdtu.shop.util.request.UpdateCartItemRequest;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartDTO fetchCart() {
        User user = retrieveCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> initializeCart(user));
        return convertToCartDTO(cart);
    }

    @Transactional
    public CartDTO addProductToCart(AddToCartRequest request) {
        User user = retrieveCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> initializeCart(user));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại"));

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElseGet(() -> createCartItem(cart, product));

        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cartItemRepository.save(cartItem);

        return convertToCartDTO(cart);
    }

    @Transactional
    public CartDTO updateCartItemQuantity(Long cartItemId, UpdateCartItemRequest request) {
        User user = retrieveCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng không tồn tại"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .filter(item -> item.getCart().getId().equals(cart.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Hàng không tồn tại trong giỏ"));

        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        return convertToCartDTO(cart);
    }

    @Transactional
    public CartDTO removeItemFromCart(Long cartItemId) {
        User user = retrieveCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng không tồn tại"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .filter(item -> item.getCart().getId().equals(cart.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Hàng không tồn tại trong giỏ"));

        cart.getCartItems().remove(cartItem);
        cartRepository.save(cart);

        return convertToCartDTO(cart);
    }

    @Transactional
    public CartDTO clearCartItems() {
        User user = retrieveCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng không tồn tại"));

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return convertToCartDTO(cart);
    }

    private Cart initializeCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    private User retrieveCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setItems(cart.getCartItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList()));
        return cartDTO;
    }

    private CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setId(cartItem.getId());
        itemDTO.setProductId(cartItem.getProduct().getId());
        itemDTO.setProductName(cartItem.getProduct().getName());
        itemDTO.setProductPrice(cartItem.getProduct().getPrice());
        itemDTO.setProductImage(cartItem.getProduct().getImages().isEmpty() ? null : cartItem.getProduct().getImages().get(0).getUrl());
        itemDTO.setQuantity(cartItem.getQuantity());
        return itemDTO;
    }

    private CartItem createCartItem(Cart cart, Product product) {
        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(0);
        return item;
    }
}