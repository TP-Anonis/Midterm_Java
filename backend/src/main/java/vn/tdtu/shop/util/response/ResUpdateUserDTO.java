package vn.tdtu.shop.util.response;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;
import vn.tdtu.shop.domain.User;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

@Getter
@Setter
public class ResUpdateUserDTO {

    private long id;
    private String name;
    private String email;
    private RoleEnum role;
    private GenderEnum gender;
    private String phone;
    private String address;
    private String avatar;
    private Instant createdAt;
    private String createdBy;
    private String updatedBy;
    private Instant updatedAt;

    public ResUpdateUserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.avatar = user.getAvatar();
        this.gender = user.getGender();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.createdAt = user.getCreatedAt();
        this.createdBy = user.getCreatedBy();
        this.updatedAt = user.getUpdatedAt();
        this.updatedBy = user.getUpdatedBy();
    }

}
