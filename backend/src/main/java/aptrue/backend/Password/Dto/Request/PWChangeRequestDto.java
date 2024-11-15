package aptrue.backend.Password.Dto.Request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PWChangeRequestDto {

    @NotNull
    private int adminId;

    @NotNull
    private String password;
}
