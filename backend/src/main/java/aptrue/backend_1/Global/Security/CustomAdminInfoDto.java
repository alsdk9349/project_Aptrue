package aptrue.backend.Global.Security;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomAdminInfoDto {
    private int adminId;
    private String account;
    private String password;
    private String name;
    private String phone;
    private boolean isSuperAdmin;
    private LocalDateTime createdAt;

    // roles 필드를 추가하여 관리자 권한 설정
    private List<String> roles;

    @Builder
    public CustomAdminInfoDto(int adminId, String account, String password, String name, String phone, boolean isSuperAdmin, LocalDateTime createdAt) {
        this.adminId = adminId;
        this.account = account;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.isSuperAdmin = isSuperAdmin;
        this.createdAt = createdAt;

        // 슈퍼 관리자일 경우 ROLE_SUPER_ADMIN을 할당
        this.roles = isSuperAdmin ? List.of("ROLE_SUPER_ADMIN") : Collections.emptyList();
    }
}
