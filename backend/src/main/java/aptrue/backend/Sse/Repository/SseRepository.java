package aptrue.backend.Sse.Repository;

import aptrue.backend.Sse.Dto.SseEventWrapper;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, List<SseEventWrapper>> eventCache = new ConcurrentHashMap<>();

    public void save(String clientId, SseEmitter emitter) {
        emitters.put(clientId, emitter);
    }

    public void remove(String clientId) {
        emitters.remove(clientId);
    }

    public Map<String, SseEmitter> getAllEmitters() {
        return emitters;
    }

    public void cacheEvent(String clientId, SseEventWrapper event) {
        eventCache.computeIfAbsent(clientId, key -> new java.util.ArrayList<>()).add(event);
    }

    public List<SseEventWrapper> getCachedEvents(String clientId) {
        return eventCache.getOrDefault(clientId, new java.util.ArrayList<>());
    }

    public void clearCachedEvents(String clientId) {
        eventCache.remove(clientId);
    }
}
