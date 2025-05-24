package vn.tdtu.shop.util.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {
    @NotBlank(message = "Địa chỉ giao hàng không được để trống")
    private String shippingAddress;

    @NotBlank(message = "Số điện thoại người nhận không được để trống")
    private String receiverPhone;

    @NotBlank(message = "Tên người nhận không được để trống")
    private String receiverName;
}