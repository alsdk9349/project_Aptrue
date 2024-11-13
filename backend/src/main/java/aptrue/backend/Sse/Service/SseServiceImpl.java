package aptrue.backend.Sse.Service;

import aptrue.backend.Sse.Dto.SseEventWrapper;
import aptrue.backend.Sse.Dto.SseResponseDto.SseResponseDto;
import aptrue.backend.Sse.Repository.SseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

    private static final long TIMEOUT = 30 * 60 * 1000L;
    private final SseRepository sseRepository;

    @Override
    public SseEmitter connect(String clientId) {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        sseRepository.save(clientId, emitter);

        emitter.onCompletion(() -> sseRepository.remove(clientId));
        emitter.onTimeout(() -> sseRepository.remove(clientId));

        SseResponseDto responseDto = SseResponseDto.builder()
                .clipId(0)
                        .name("전가현이다")
                                .message("연결 성공")
                                        .status("연결이다")
                                                .build();

        sendEvent("연결 성공1", responseDto);

        // 캐시된 이벤트 전송
        if (!sseRepository.getAllEmitters().isEmpty()) {
            sseRepository.getCachedEvents(clientId).forEach(eventWrapper -> {
                try {
                    emitter.send(SseEmitter.event()
                            .name(eventWrapper.getEventName())
                            .data(eventWrapper.getData()));
                } catch (Exception e) {
                    log.error("Failed to send cached event to client {}: {}", clientId, e.getMessage());
                }
            });
            sseRepository.clearCachedEvents(clientId);
        }

        return emitter;
    }

    @Override
    public void sendEvent(String eventName, SseResponseDto data) {
        log.info("Sending event '{}' to all clients", eventName);

        for (Map.Entry<String, SseEmitter> entry : sseRepository.getAllEmitters().entrySet()) {
            String clientId = entry.getKey();
            SseEmitter emitter = entry.getValue();

            try {
                emitter.send(SseEmitter.event()
                        .name(eventName)
                        .data(data));
            } catch (Exception e) {
                log.warn("Failed to send event to client {}: {}", clientId, e.getMessage());
                sseRepository.cacheEvent(clientId, new SseEventWrapper(eventName, data));
                sseRepository.remove(clientId);
            }
        }
    }
}
