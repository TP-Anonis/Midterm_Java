package vn.tdtu.shop.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.service.UserService;
import vn.tdtu.shop.util.error.InputInvalidException;
import vn.tdtu.shop.util.request.CreateUserDTO;
import vn.tdtu.shop.util.request.UpdateProfileDTO;
import vn.tdtu.shop.util.request.UserFilterRequest;
import vn.tdtu.shop.util.request.UserUpdateDTO;
import vn.tdtu.shop.util.response.ResCreateUserDTO;
import vn.tdtu.shop.util.response.ResUpdateUserDTO;
import vn.tdtu.shop.util.response.UserDTO;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/admin/users")
    public ResponseEntity<ResCreateUserDTO> createNewUser(@Valid @RequestBody CreateUserDTO userDTO) throws InputInvalidException {
        validateEmail(userDTO.getEmail());
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResCreateUserDTO(userService.handleCreateUser(userDTO)));
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws InputInvalidException {
        validateUserExists(id);
        userService.handleDeleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> fetchUserById(@PathVariable Long id) throws InputInvalidException {
        User user = validateAndGetUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/admin/users")
    public ResponseEntity<ResUpdateUserDTO> updateUser(@Valid @RequestBody UserUpdateDTO userDTO) throws InputInvalidException {
        User updatedUser = userService.handleUpdateUser(userDTO);
        validateUserExists(userDTO.getId());
        return ResponseEntity.ok(new ResUpdateUserDTO(updatedUser));
    }

    @PutMapping("/users/update-profile")
    public ResponseEntity<ResUpdateUserDTO> updateUserProfile(@Valid @RequestBody UpdateProfileDTO profileDTO) throws InputInvalidException {
        User updatedUser = userService.handleUpdateProfile(profileDTO);
        validateUserExists(profileDTO.getId());
        return ResponseEntity.ok(new ResUpdateUserDTO(updatedUser));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<Page<UserDTO>> fetchUsers(@ModelAttribute UserFilterRequest filter) {
        return ResponseEntity.ok(userService.getUsers(filter));
    }

    private void validateEmail(String email) throws InputInvalidException {
        if (userService.isEmailExist(email)) {
            throw new InputInvalidException("Email " + email + " đã tồn tại, vui lòng sử dụng email khác.");
        }
    }

    private User validateAndGetUser(Long id) throws InputInvalidException {
        User user = userService.fetchUserById(id);
        if (user == null) {
            throw new InputInvalidException("Id không hợp lệ: không tìm thấy user id " + id + ", ...");
        }
        return user;
    }

    private void validateUserExists(Long id) throws InputInvalidException {
        if (userService.fetchUserById(id) == null) {
            throw new InputInvalidException("User id " + id + " không tồn tại.");
        }
    }
}