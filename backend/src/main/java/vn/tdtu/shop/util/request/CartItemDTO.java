package vn.tdtu.shop.util.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal productPrice;

    @NotNull(message = "Số lượng không được để trống")
    @Positive(message = "Số lượng phải lớn hơn 0")
    private Integer quantity;
}