package aptrue.backend.OpenVidu.Dto.ResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetSessionResponseDto {
    private int openviduId;
    private String sessionId;
}
