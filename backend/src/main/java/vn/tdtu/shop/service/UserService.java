package vn.tdtu.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import vn.tdtu.shop.domain.Cart;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.repository.CartRepository;
import vn.tdtu.shop.repository.OrderRepository;
import vn.tdtu.shop.repository.UserRepository;
import vn.tdtu.shop.service.specification.UserSpecification;
import vn.tdtu.shop.util.error.InputInvalidException;
import vn.tdtu.shop.util.request.CreateUserDTO;
import vn.tdtu.shop.util.request.UpdateProfileDTO;
import vn.tdtu.shop.util.request.UserFilterRequest;
import vn.tdtu.shop.util.request.UserUpdateDTO;
import vn.tdtu.shop.util.response.UserDTO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User handleCreateUser(CreateUserDTO createUserDTO) {
        User user = new User();
        user.setName(createUserDTO.getName());
        user.setPhone(createUserDTO.getPhone());
        user.setEmail(createUserDTO.getEmail());
        user.setPassword(createUserDTO.getPassword());
        user.setRole(createUserDTO.getRole());
        user.setGender(createUserDTO.getGender());
        user.setAddress(createUserDTO.getAddress());
        return this.userRepository.save(user);
    }

    public User handleCreateUser(User user) {

        return this.userRepository.save(user);
    }

    @Transactional
    public void handleDeleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Người dùng không tồn tại với ID: " + id);
        }
        // Kiểm tra xem người dùng có Order không
        long orderCount = orderRepository.countByUserId(id);
        if (orderCount > 0) {
            throw new IllegalStateException("Không thể xóa người dùng vì họ có đơn hàng liên quan.");
        }
        // Tìm Cart của User
        Cart cart = cartRepository.findByUserId(id)
                .orElse(null);
        if (cart != null) {
            // Xóa Cart (các CartItem sẽ được xóa tự động do cascade = CascadeType.ALL)
            cartRepository.delete(cart);
        }
        // Xóa User
        userRepository.deleteById(id);
    }

    public User fetchUserById(long id) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    public User handleGetUserByUserName(String username) {
        Optional<User> userOptional = this.userRepository.findByEmail(username);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    public List<User> fetchAllUser() {
        return this.userRepository.findAll();
    }

    public User handleUpdateUser(UserUpdateDTO userUpdateDTO) {
        User currentUser = fetchUserById(userUpdateDTO.getId());
        if (currentUser != null) {
            currentUser.setName(userUpdateDTO.getName());
            currentUser.setRole(userUpdateDTO.getRole());
            currentUser.setGender(userUpdateDTO.getGender());
            currentUser.setAvatar(userUpdateDTO.getAvatar());
            currentUser.setPhone(userUpdateDTO.getPhone());
            currentUser.setAddress(userUpdateDTO.getAddress());
            return currentUser = this.userRepository.save(currentUser);
        }
        return null;
    }

    public User handleUpdateProfile(UpdateProfileDTO userUpdateDTO) {
        User currentUser = fetchUserById(userUpdateDTO.getId());
        if (currentUser != null) {
            currentUser.setName(userUpdateDTO.getName());
            currentUser.setGender(userUpdateDTO.getGender());
            currentUser.setAvatar(userUpdateDTO.getAvatar());
            currentUser.setPhone(userUpdateDTO.getPhone());
            currentUser.setAddress(userUpdateDTO.getAddress());
            return currentUser = this.userRepository.save(currentUser);
        }
        return null;
    }

    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    public Page<UserDTO> getUsers(UserFilterRequest filter) {
        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize());
        Page<User> userPage = userRepository.findAll(
                UserSpecification.filterUsers(filter),
                pageable);
        return userPage.map(this::convertToDTO);
    }

    public void changePassword(String email, String currentPassword, String newPassword) throws InputInvalidException {
        User user = handleGetUserByUserName(email);
        if (user == null) {
            throw new InputInvalidException("Người dùng không tồn tại, vui lòng kiểm tra lại đăng nhập!");
        }
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InputInvalidException("Mật khẩu hiện tại không đúng");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setGender(user.getGender());
        dto.setAvatar(user.getAvatar());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}
