package vn.tdtu.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.tdtu.shop.service.EmailService;

@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/api/email")
    public String sendSimpleEmail() {
        this.emailService.sendSimpleEmail("ads.hoidanit@gmail.com", "Test Email", "Hello, this is a test email!");
        return "ok";
    }
}