package aptrue.backend.Sse.Service;

import aptrue.backend.Sse.Dto.SseResponseDto.SseResponseDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {
    SseEmitter connect(String clientId);
    void sendEvent(String eventName, SseResponseDto data);
}
