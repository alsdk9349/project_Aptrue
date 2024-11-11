package aptrue.backend.Sse.Service;

import aptrue.backend.Clip.Dto.ClipRQResponseDto;
import aptrue.backend.Clip.Dto.CompleteResponseDto;
import aptrue.backend.Sse.Dto.SseResponseDto.SseResponseDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    SseEmitter connect(String email);
    void send(SseResponseDto sseResponseDto, String message);

}
