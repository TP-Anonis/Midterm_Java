package vn.tdtu.shop.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.service.ForgotPasswordService;
import vn.tdtu.shop.service.UserService;
import vn.tdtu.shop.util.SecurityUtil;
import vn.tdtu.shop.util.annotation.ApiMessage;
import vn.tdtu.shop.util.constant.RoleEnum;
import vn.tdtu.shop.util.error.InputInvalidException;
import vn.tdtu.shop.util.request.ChangePasswordRequest;
import vn.tdtu.shop.util.request.EmailRequest;
import vn.tdtu.shop.util.request.LoginDTO;
import vn.tdtu.shop.util.request.RegisterDTO;
import vn.tdtu.shop.util.request.ResetPasswordRequest;
import vn.tdtu.shop.util.response.ResCreateUserDTO;
import vn.tdtu.shop.util.response.ResLoginDTO;

/**
 * Controller xử lý các yêu cầu liên quan đến xác thực và quản lý người dùng.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManagerBuilder authManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final PasswordEncoder encoder;
    private final ForgotPasswordService forgotPasswordService;

    public AuthController(AuthenticationManagerBuilder authManagerBuilder, SecurityUtil securityUtil,
                          UserService userService, PasswordEncoder encoder, ForgotPasswordService forgotPasswordService) {
        this.authManagerBuilder = authManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
        this.encoder = encoder;
        this.forgotPasswordService = forgotPasswordService;
    }

    /**
     * Xử lý đăng nhập người dùng.
     */
    @PostMapping("/login")
    public ResponseEntity<ResLoginDTO> handleLogin(@Valid @RequestBody LoginDTO loginRequest) {
        Authentication auth = authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        ResLoginDTO response = buildLoginResponse(auth, loginRequest.getUsername());
        return ResponseEntity.ok(response);
    }

    /**
     * Lấy thông tin tài khoản người dùng hiện tại.
     */
    @GetMapping("/account")
    public ResponseEntity<ResLoginDTO.UserLogin> fetchAccountInfo() {
        String userEmail = securityUtil.getCurrentUserLogin()
                .orElse("");
        return ResponseEntity.ok(buildUserLoginResponse(userEmail));
    }

    /**
     * Đăng ký người dùng mới.
     */
    @PostMapping("/register")
    public ResponseEntity<ResCreateUserDTO> handleRegistration(@Valid @RequestBody RegisterDTO registerRequest) 
            throws InputInvalidException {
        validateEmailUniqueness(registerRequest.getEmail());
        User newUser = createNewUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(buildCreateUserResponse(newUser));
    }

    /**
     * Yêu cầu đặt lại mật khẩu.
     */
    @ApiMessage("Mã xác nhận đã được gửi đến email của bạn.")
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> initiatePasswordReset(@RequestBody EmailRequest emailRequest) 
            throws InputInvalidException {
        forgotPasswordService.requestPasswordReset(emailRequest.getEmail());
        return ResponseEntity.ok().build();
    }

    /**
     * Đặt lại mật khẩu với mã xác nhận.
     */
    @ApiMessage("Đổi mật khẩu thành công")
    @PostMapping("/reset-password")
    public ResponseEntity<Void> performPasswordReset(@Valid @RequestBody ResetPasswordRequest resetRequest) 
            throws InputInvalidException {
        forgotPasswordService.resetPassword(
                resetRequest.getEmail(), 
                resetRequest.getCode(), 
                resetRequest.getNewPassword()
        );
        return ResponseEntity.ok().build();
    }

    /**
     * Thay đổi mật khẩu người dùng hiện tại.
     */
    @ApiMessage("Đổi mật khẩu thành công")
    @PostMapping("/change-password")
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody ChangePasswordRequest changeRequest) 
            throws InputInvalidException {
        String userEmail = securityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new InputInvalidException("Bạn cần đăng nhập để đổi mật khẩu"));
        userService.changePassword(userEmail, changeRequest.getCurrentPassword(), changeRequest.getNewPassword());
        return ResponseEntity.ok().build();
    }

    // --- Private helper methods ---

    private Authentication authenticateUser(String username, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication auth = authManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        return auth;
    }

    private ResLoginDTO buildLoginResponse(Authentication auth, String username) {
        String accessToken = securityUtil.createToken(auth);
        ResLoginDTO response = new ResLoginDTO();
        response.setAccessToken(accessToken);

        User user = userService.handleGetUserByUserName(username);
        if (user != null) {
            response.setUser(new ResLoginDTO.UserLogin(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getRole(),
                    user.getAvatar(),
                    user.getGender(),
                    user.getPhone()
            ));
        }
        return response;
    }

    private ResLoginDTO.UserLogin buildUserLoginResponse(String email) {
        User user = userService.handleGetUserByUserName(email);
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        if (user != null) {
            userLogin.setId(user.getId());
            userLogin.setEmail(user.getEmail());
            userLogin.setName(user.getName());
            userLogin.setRole(user.getRole());
            userLogin.setAvatar(user.getAvatar());
            userLogin.setGender(user.getGender());
            userLogin.setPhone(user.getPhone());
        }
        return userLogin;
    }

    private void validateEmailUniqueness(String email) throws InputInvalidException {
        if (userService.isEmailExist(email)) {
            throw new InputInvalidException(
                    String.format("Email %s đã tồn tại, vui lòng sử dụng email khác.", email));
        }
    }

    private User createNewUser(RegisterDTO registerRequest) {
        User user = new User();
        user.setName(registerRequest.getName());
        user.setPhone(registerRequest.getPhone());
        user.setEmail(registerRequest.getEmail());
        user.setGender(registerRequest.getGender());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setRole(RoleEnum.USER);
        user.setCreatedBy(registerRequest.getEmail());
        return userService.handleCreateUser(user);
    }

    private ResCreateUserDTO buildCreateUserResponse(User user) {
        ResCreateUserDTO response = new ResCreateUserDTO();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setGender(user.getGender());
        response.setPhone(user.getPhone());
        response.setCreatedAt(user.getCreatedAt());
        response.setCreatedBy(user.getCreatedBy());
        return response;
    }
}