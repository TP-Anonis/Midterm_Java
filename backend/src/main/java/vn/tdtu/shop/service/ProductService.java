package vn.tdtu.shop.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.tdtu.shop.domain.Image;
import vn.tdtu.shop.domain.Product;
import vn.tdtu.shop.repository.CartItemRepository;
import vn.tdtu.shop.repository.OrderItemRepository;
import vn.tdtu.shop.repository.ProductRepository;
import vn.tdtu.shop.util.request.ProductDTO;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::mapToDTO);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại: " + id));
        return mapToDTO(product);
    }

    public ProductDTO createProduct(ProductDTO dto) {
        Product product = new Product();
        mapToEntity(dto, product);
        return mapToDTO(productRepository.save(product));
    }

    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại: " + id));
        mapToEntity(dto, product);
        return mapToDTO(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Sản phẩm không tồn tại: " + id);
        }
        cartItemRepository.deleteByProductId(id);
        orderItemRepository.deleteByProductId(id);
        productRepository.deleteById(id);
    }

    public Page<ProductDTO> searchProducts(String category, String brand, String name, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return productRepository.findByMultipleCriteria(category, brand, name, minPrice, maxPrice, pageable)
                .map(this::mapToDTO);
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setBrand(product.getBrand());
        dto.setCategory(product.getCategory());
        dto.setViews(product.getViews());
        dto.setSoldQuantity(product.getSoldQuantity());
        dto.setShortDescription(product.getShortDescription());
        dto.setDetailedDescription(product.getDetailedDescription());
        dto.setImages(product.getImages().stream().map(Image::getUrl).collect(Collectors.toList()));
        return dto;
    }

    private void mapToEntity(ProductDTO dto, Product product) {
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setBrand(dto.getBrand());
        product.setCategory(dto.getCategory());
        product.setShortDescription(dto.getShortDescription());
        product.setDetailedDescription(dto.getDetailedDescription());
        product.setSoldQuantity(dto.getSoldQuantity() != null ? dto.getSoldQuantity() : 0L);
        product.setViews(dto.getViews() != null ? dto.getViews() : 0L);
        product.getImages().clear();
        product.getImages().addAll(dto.getImages().stream()
                .map(url -> {
                    Image image = new Image();
                    image.setUrl(url);
                    image.setProduct(product);
                    return image;
                }).collect(Collectors.toList()));
    }
}