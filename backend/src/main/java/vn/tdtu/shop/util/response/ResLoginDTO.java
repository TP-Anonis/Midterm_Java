package vn.tdtu.shop.util.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.tdtu.shop.util.constant.GenderEnum;
import vn.tdtu.shop.util.constant.RoleEnum;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResLoginDTO {
    private String accessToken;

    private UserLogin user;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserLogin {
        private long id;
        private String email;
        private String name;
        private RoleEnum role;
        private String avatar;
        private GenderEnum gender;
        private String phone;

    }
}
