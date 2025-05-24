package vn.tdtu.shop.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    @Async
    public void sendEmailWithTemplate(String to, String subject, String templateName, String username, String code) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("code", code);
        String content = templateEngine.process(templateName, context);
        sendEmail(to, subject, content, false, true);
    }

    public String generateResetCode() {
        return String.valueOf(10000 + new SecureRandom().nextInt(90000));
    }

    @Async
    public void sendForgotPasswordEmail(String to, String username, String resetCode) {
        String subject = "Mã Xác Nhận Đặt Lại Mật Khẩu - Batdongsan360";
        sendEmailWithTemplate(to, subject, "forgot-password", username, resetCode);
    }
}