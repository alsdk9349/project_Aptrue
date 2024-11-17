package aptrue.backend.Sse.Controller;

import aptrue.backend.Global.Security.CustomAdminDetails;
import aptrue.backend.Sse.Dto.SseResponseDto.SseResponseDto;
import aptrue.backend.Sse.Service.SseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SseController {
    private final SseService sseService;

//    @GetMapping(path = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    @Operation(summary = "SSE 연결", description = "SSE 초기에 연결하는 API")
//    @ApiResponse(responseCode = "200", description = "SSE 연결 성공")
//    public ResponseEntity<SseEmitter> connect(@AuthenticationPrincipal CustomAdminDetails adminDetails) {
//        String clientId = adminDetails.getAccount();
//        log.info("Connection established with client ID: {}", clientId);
//        SseEmitter emitter = sseService.connect(clientId);
//        log.info("Connection established with client ID 연결 성공: {}", clientId);
//        emitter.onError(e -> log.info("SSE 에러", e));
//        return ResponseEntity.ok(emitter);
//    }

    @GetMapping(path = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@AuthenticationPrincipal CustomAdminDetails customAdminDetails                                            ) {

        SseEmitter emitter = sseService.connect(customAdminDetails.getAccount());
        return ResponseEntity.ok(emitter);
    }
}
