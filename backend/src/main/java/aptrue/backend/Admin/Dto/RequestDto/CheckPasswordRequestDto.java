package aptrue.backend.Admin.Dto.RequestDto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckPasswordRequestDto {

    @NotNull
    private String password;
}
