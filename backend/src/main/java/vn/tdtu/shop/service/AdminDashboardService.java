package vn.tdtu.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.tdtu.shop.repository.OrderRepository;
import vn.tdtu.shop.repository.UserRepository;
import vn.tdtu.shop.util.constant.OrderStatus;
import vn.tdtu.shop.util.response.AdminDashboardDTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminDashboardDTO fetchDashboardData() {
        AdminDashboardDTO dashboard = new AdminDashboardDTO();
        LocalDate currentDate = LocalDate.now();
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();

        dashboard.setCurrentYearRevenue(calculateYearRevenue(year));
        dashboard.setCurrentMonthRevenue(calculateMonthRevenue(year, month));
        dashboard.setTotalUsers(userRepository.count());
        dashboard.setPendingOrders(orderRepository.countByStatus(OrderStatus.PENDING));
        dashboard.setYearlyRevenueChart(buildYearlyRevenueChart(year));

        return dashboard;
    }

    private BigDecimal calculateYearRevenue(int year) {
        Instant start = LocalDate.of(year, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant end = LocalDate.of(year + 1, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        try {
            BigDecimal revenue = orderRepository.calculateRevenueBetweenDates(start, end);
            return revenue != null ? revenue : BigDecimal.ZERO;
        } catch (Exception e) {
            System.err.println("Error calculating year revenue: " + e.getMessage());
            return BigDecimal.ZERO;
        }
    }

    private BigDecimal calculateMonthRevenue(int year, int month) {
        Instant start = LocalDate.of(year, month, 1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant end = LocalDate.of(year, month + 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        try {
            BigDecimal revenue = orderRepository.calculateRevenueBetweenDates(start, end);
            return revenue != null ? revenue : BigDecimal.ZERO;
        } catch (Exception e) {
            System.err.println("Error calculating month revenue: " + e.getMessage());
            return BigDecimal.ZERO;
        }
    }

    private List<AdminDashboardDTO.MonthlyRevenueDTO> buildYearlyRevenueChart(int year) {
        List<AdminDashboardDTO.MonthlyRevenueDTO> chart = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            AdminDashboardDTO.MonthlyRevenueDTO monthlyRevenue = new AdminDashboardDTO.MonthlyRevenueDTO();
            monthlyRevenue.setMonth(month);
            monthlyRevenue.setRevenue(BigDecimal.ZERO);
            chart.add(monthlyRevenue);
        }

        try {
            List<Object[]> monthlyRevenues = orderRepository.getMonthlyRevenueForYear(year);
            for (Object[] result : monthlyRevenues) {
                int month = ((Number) result[0]).intValue();
                BigDecimal revenue = (BigDecimal) result[1];
                if (month >= 1 && month <= 12) {
                    chart.get(month - 1).setRevenue(revenue != null ? revenue : BigDecimal.ZERO);
                }
            }
        } catch (Exception e) {
            System.err.println("Error building yearly revenue chart: " + e.getMessage());
        }

        return chart;
    }
}