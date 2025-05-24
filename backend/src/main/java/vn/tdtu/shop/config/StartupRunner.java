package vn.tdtu.shop.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.tdtu.shop.domain.Image;
import vn.tdtu.shop.domain.Product;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.repository.ProductRepository;
import vn.tdtu.shop.service.UserService;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class StartupRunner implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        System.out.println(">>> START INIT DATABASE");

        // initializeUsers();
        // initializeProducts();

        System.out.println(">>> END INIT DATABASE");
    }

    private void initializeUsers() {
        System.out.println(">>> INIT TABLE 'users': 1 ADMIN, 50 USER");
        List<User> users = new ArrayList<>();

        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setName("Quản trị viên");
        admin.setPassword(passwordEncoder.encode("123456"));
        admin.setRole(RoleEnum.ADMIN);
        admin.setGender(GenderEnum.MALE);
        admin.setPhone("0123456789");
        admin.setAddress("Thành Phố Hồ Chí Minh");
        users.add(admin);

        for (int i = 1; i <= 50; i++) {
            User user = new User();
            user.setEmail("user" + i + "@gmail.com");
            user.setName("TestUser" + i);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRole(RoleEnum.USER);
            user.setGender(i % 2 == 0 ? GenderEnum.MALE : GenderEnum.FEMALE);
            user.setPhone("01234567" + String.format("%02d", i));
            user.setAddress(i % 2 == 0 ? "Thành Phố Hồ Chí Minh" : "Thành Phố Hà Nội");
            users.add(user);
        }

        for (User user : users) {
            if (!userService.isEmailExist(user.getEmail())) {
                userService.handleCreateUser(user);
            }
        }
    }

    private void initializeProducts() {
        System.out.println(">>> INIT TABLE 'products': 20 PRODUCTS");
        if (productRepository.count() == 0) {
            List<Product> products = new ArrayList<>();
            String[] brands = {"Apple", "Acer", "Levono", "Dell", "Asus"};
            String[] categories = {"Electronics", "Clothing", "Books", "Home Appliances"};
            String[] descriptionSentences = {
                    "Sản phẩm này được thiết kế với công nghệ tiên tiến nhất.",
                    "Chất lượng cao, đảm bảo độ bền lâu dài.",
                    "Phù hợp cho mọi lứa tuổi và nhu cầu sử dụng.",
                    "Sản phẩm thân thiện với môi trường, an toàn cho người dùng.",
                    "Đi kèm với bảo hành chính hãng lên đến 12 tháng.",
                    "Thiết kế tinh tế, mang lại trải nghiệm sử dụng tuyệt vời.",
                    "Hiệu suất vượt trội so với các sản phẩm cùng phân khúc.",
                    "Dễ dàng sử dụng, phù hợp cho cả người mới bắt đầu.",
                    "Sản phẩm được kiểm tra kỹ lưỡng trước khi xuất xưởng.",
                    "Phong cách hiện đại, phù hợp với mọi không gian."
            };

            Random random = new Random();
            for (int i = 1; i <= 20; i++) {
                Product product = new Product();
                product.setName("Product " + i);
                product.setPrice(BigDecimal.valueOf(100 + random.nextInt(900)));
                product.setBrand(brands[random.nextInt(brands.length)]);
                product.setCategory(categories[random.nextInt(categories.length)]);
                product.setViews((long) random.nextInt(1000));
                product.setSoldQuantity((long) random.nextInt(100));
                product.setShortDescription("Mô tả ngắn cho sản phẩm " + i);

                StringBuilder detailedDescription = new StringBuilder();
                detailedDescription.append("Mô tả chi tiết cho sản phẩm ").append(i).append(":\n");
                int sentenceCount = random.nextInt(3) + 5;
                for (int j = 0; j < sentenceCount; j++) {
                    detailedDescription.append(descriptionSentences[random.nextInt(descriptionSentences.length)]).append("\n");
                }
                detailedDescription.append("Đây là lựa chọn hoàn hảo cho nhu cầu của bạn!");
                product.setDetailedDescription(detailedDescription.toString());

                product.setCreatedAt(Instant.now());

                List<Image> images = new ArrayList<>();
                int imageCount = random.nextInt(3) + 1;
                for (int j = 1; j <= imageCount; j++) {
                    Image image = new Image();
                    image.setUrl("image_" + j + ".jpg");
                    image.setProduct(product);
                    images.add(image);
                }
                product.setImages(images);

                products.add(product);
            }

            productRepository.saveAll(products);
        }
    }
}