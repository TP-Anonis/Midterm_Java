package vn.tdtu.shop.util.response;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class AdminDashboardDTO {
    private BigDecimal currentYearRevenue;
    private BigDecimal currentMonthRevenue;
    private long totalUsers;
    private long pendingOrders;
    private List<MonthlyRevenueDTO> yearlyRevenueChart;

    @Data
    public static class MonthlyRevenueDTO {
        private int month;
        private BigDecimal revenue;
    }
}
