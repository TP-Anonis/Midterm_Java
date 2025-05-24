package vn.tdtu.shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.tdtu.shop.service.AdminDashboardService;
import vn.tdtu.shop.util.response.AdminDashboardDTO;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardDTO> fetchDashboardData() {
        return ResponseEntity.ok(retrieveDashboardData());
    }

    private AdminDashboardDTO retrieveDashboardData() {
        return adminDashboardService.fetchDashboardData();
    }
}