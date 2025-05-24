package vn.tdtu.shop.util.request;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

@Setter
@Getter
public class UserFilterRequest {
    private String name;
    private String email;
    private RoleEnum role;
    private GenderEnum gender;
    private String phone;
    private String address;
    private Instant createdFrom;
    private Instant createdTo;
    private Integer page = 0;
    private Integer size = 10;

}
