package aptrue.backend.Admin.Dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignupRequestDto {

    @NotNull
    private String name;

    @NotNull
    private String account;

    @NotNull
    private String password;

    @NotNull
    private String phone;
}
