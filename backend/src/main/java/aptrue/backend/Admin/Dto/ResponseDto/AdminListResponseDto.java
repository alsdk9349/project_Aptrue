package aptrue.backend.Admin.Dto.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminListResponseDto {
    private int adminID;
    private String account;
    private String name;
    private String phone;
    private LocalDateTime createdAt;
}
