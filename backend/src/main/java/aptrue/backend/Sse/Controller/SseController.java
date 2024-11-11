package aptrue.backend.Sse.Controller;

import aptrue.backend.Clip.Dto.CompleteResponseDto;
import aptrue.backend.Sse.Service.SseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SseController {
    private final SseService sseService;

    @GetMapping(path = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(HttpServletRequest httpServletRequest) {

        SseEmitter emitter = sseService.connect(httpServletRequest.getSession().getId());
        return ResponseEntity.ok(emitter);
    }

    public void send(CompleteResponseDto completeResponseDto, String message) {
        sseService.send(completeResponseDto, message);
    }
}
