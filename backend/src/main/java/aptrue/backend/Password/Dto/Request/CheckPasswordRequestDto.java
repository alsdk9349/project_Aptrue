package aptrue.backend.Password.Dto.Request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckPasswordRequestDto {

    @NotNull
    private String password;

    @NotNull
    private int clipRQId;
}
