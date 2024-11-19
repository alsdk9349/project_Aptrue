package aptrue.backend.Admin.Dto.RequestDto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SuperAdminRequestDto {

    @NotNull
    private String name;

    @NotNull
    private String account;

    @NotNull
    private String password;

    @NotNull
    private String phone;

    private String aptName;
    private String aptImg;
    private String location;
    private int block;
    private int household;
}
