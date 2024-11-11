package aptrue.backend.Sse.Service;

import aptrue.backend.Clip.Dto.CompleteResponseDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    SseEmitter connect(String SseId);
    void send(CompleteResponseDto completeResponseDto, String message);

}
