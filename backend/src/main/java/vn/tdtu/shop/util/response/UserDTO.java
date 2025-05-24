package vn.tdtu.shop.util.response;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

@Getter
@Setter
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private RoleEnum role;
    private GenderEnum gender;
    private String avatar;
    private String phone;
    private String address;
    private Instant createdAt;
    private Instant updatedAt;

}
