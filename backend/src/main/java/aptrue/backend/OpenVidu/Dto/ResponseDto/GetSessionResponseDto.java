package aptrue.backend.OpenVidu.Dto.ResponseDto;

import lombok.Builder;

@Builder
public class GetSessionResponseDto {
    int openviduId;
    String sessionId;
}
