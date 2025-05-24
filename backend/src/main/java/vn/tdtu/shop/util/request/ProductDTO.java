package vn.tdtu.shop.util.request;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotNull(message = "Giá không được để trống")
    @PositiveOrZero(message = "Giá phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    @NotBlank(message = "Thương hiệu không được để trống")
    private String brand;

    @NotBlank(message = "Danh mục không được để trống")
    private String category;

    private Long views;

    private Long soldQuantity;

    private String shortDescription;

    private String detailedDescription;

    private List<String> images = new ArrayList<>();
}