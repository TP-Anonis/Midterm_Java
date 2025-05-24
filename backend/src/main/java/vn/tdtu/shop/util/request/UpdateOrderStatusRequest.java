package vn.tdtu.shop.util.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.tdtu.shop.util.constant.OrderStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderStatusRequest {
    @NotNull(message = "Trạng thái đơn hàng không được để trống")
    private OrderStatus status;
}