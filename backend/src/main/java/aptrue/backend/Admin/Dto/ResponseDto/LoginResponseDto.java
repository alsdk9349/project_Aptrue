package aptrue.backend.Admin.Dto.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private int adminID;
    private String account;
    private String name;
    private boolean isSuperAdmin;
}
