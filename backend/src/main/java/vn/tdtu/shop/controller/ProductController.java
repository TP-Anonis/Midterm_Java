package vn.tdtu.shop.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.tdtu.shop.service.ProductService;
import vn.tdtu.shop.util.request.ProductDTO;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> fetchAllProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> fetchProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> createNewProduct(@Valid @RequestBody ProductDTO productDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> updateExistingProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> searchProductsByCriteria(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            Pageable pageable) {
        return ResponseEntity.ok(productService.searchProducts(category, brand, name, minPrice, maxPrice, pageable));
    }
}