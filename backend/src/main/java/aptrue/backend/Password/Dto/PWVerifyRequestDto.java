package aptrue.backend.Password.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PWVerifyRequestDto {

    @NotNull
    private String password;
}
