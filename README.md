# Midterm_Java
Nguyên Tắc, Mô Hình và Thực Tiễn
Tính Mô-đun: Sử dụng context (AuthContext, CartContext) để tách biệt.
Trách Nhiệm Duy Nhất: Mỗi hàm/thành phần chỉ xử lý một nhiệm vụ (ví dụ: fetchCart, handleCreateOrder).
React Hooks: Dùng useState, useEffect để quản lý trạng thái.
Xử Lý Lỗi: Áp dụng try-catch và thông báo qua message.
RESTful API: Tích hợp axios với backend.
Debouncing: Tối ưu tìm kiếm trong ProductList.

Cấu Trúc Mã

Frontend

src/:

    components/: Thành phần tái sử dụng (ví dụ: OrderDetailModal).
    
    pages/: Cart.js, ProductList.js, ProductDetail.js, OrderManagement.js, ProductManagement.js, UserManagement.js..v..v..
    
          contexts/: AuthContext.js, CartContext.js. 
    
    Trong folder pages chưa cả folder contexts, trong pages sẽ bao gồm các trang chính của giao diện của cả người dùng và quản trị viên
    
    api/: Chứa cấu hình axiosConfig.js để định nghĩa instance axios cho các yêu cầu API.
    
    assets/: Lưu trữ tài nguyên tĩnh (nếu có, ví dụ: hình ảnh mặc định).
    
Backend

src/:

    ShopApplication.java: Lớp chính khởi động ứng dụng Spring Boot.
    
    config/: Cấu hình.
    
    controller/: Các controller REST API.
    
    domain/: Các thực thể (entities) mô hình dữ liệu.
    
    repository/: Các repository JPA cho truy vấn dữ liệu.
    
    service/: Logic nghiệp vụ.
    
    util/: Các tiện ích.

Hướng dẫn chạy ứng dụng 

Frontend

1.Yêu Cầu: Node.js (14.x+), npm/yarn, backend tại VITE_API_URL.

2.Cài Đặt:

-Clone: git clone <repository-url>

-CD: cd <project-folder>

-Cài phụ thuộc: npm install

-Tạo .env với:

    VITE_API_URL=http://localhost:8080
  
    VITE_UPLOADS_URL=http://localhost:8080/uploads

3. Chạy ứng dụng: npm run dev

Backend

1.Yêu cầu

-Java 17 (hoặc cao hơn).

-Maven.

-Database.

2. Cài đặt

-Clone: git clone <repository-url>

-CD: cd <project-folder>/backend

-Cài phụ thuộc

Lệnh CURL Kiểm Tra API

Thay <token> bằng token thực tế.

1.Đăng Nhập (POST /api/auth/login):curl -X POST "http://localhost:8080/api/auth/login" -H "Content-Type: application/json" -d '{"username":"user@example.com","password":"password"}' -v

2.Lấy Giỏ Hàng (GET /api/cart):curl -X GET "http://localhost:8080/api/cart" -H "Authorization: Bearer <token>" -v

3.Cập Nhật Số Lượng (PUT /api/cart/items/{itemId}):curl -X PUT "http://localhost:8080/api/cart/items/1" -H "Authorization: Bearer <token>" -d '{"quantity": 2}' -v

4.Xóa Sản Phẩm (DELETE /api/cart/items/{itemId}):curl -X DELETE "http://localhost:8080/api/cart/items/1" -H "Authorization: Bearer <token>" -v

5.Tạo Đơn Hàng (POST /api/orders):curl -X POST "http://localhost:8080/api/orders" -H "Authorization: Bearer <token>" -d '{"receiverName":"Nguyen Van A","shippingAddress":"Quận 
1","receiverPhone":"0909999999","items":[{"productId":1,"quantity":1}]}' -v

6.Tìm Kiếm Sản Phẩm (GET /api/products/search):curl -X GET "http://localhost:8080/api/products/search?name=chuột&category=Chơi%20game" -H "Authorization: Bearer <token>" -v

7.Thêm Vào Giỏ (POST /api/cart/add):curl -X POST "http://localhost:8080/api/cart/add" -H "Authorization: Bearer <token>" -d '{"productId":1,"quantity":1}' -v

8.Lấy Danh Sách Đơn Hàng (GET /api/orders/all):curl -X GET "http://localhost:8080/api/orders/all?page=0&size=10" -H "Authorization: Bearer <token>" -v

9.Lấy Danh Sách Người Dùng (GET /api/admin/users):curl -X GET "http://localhost:8080/api/admin/users?page=0&size=10" -H "Authorization: Bearer <token>" -v

10.Xóa Người Dùng (DELETE /api/admin/users/{id}):curl -X DELETE "http://localhost:8080/api/admin/users/1" -H "Authorization: Bearer <token>" -v

11.Lấy Chi Tiết Đơn Hàng (GET /api/orders/{id}):curl -X GET "http://localhost:8080/api/orders/1" -H "Authorization: Bearer <token>" -v

12.Lấy Thông Tin Người Dùng (GET /api/users/{id}):curl -X GET "http://localhost:8080/api/users/1" -H "Authorization: Bearer <token>" -v

13.Lấy Chi Tiết Sản Phẩm (GET /api/products/{id}):curl -X GET "http://localhost:8080/api/products/1" -H "Authorization: Bearer <token>" -v

Đây là các API mà bạn có thể sử dụng để kiểm tra ứng dụng.# Java_Midterm

