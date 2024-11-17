package aptrue.backend.Sse.Repository;

import aptrue.backend.Sse.Dto.SseEventWrapper;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    private final Map<String, List<Object>> eventCache = new ConcurrentHashMap<>();

    public void save(String key, SseEmitter emitter) {
        emitters.put(key, emitter);
    }

    public SseEmitter get(String key) {
        return emitters.get(key);
    }

    public void remove(String key) {
        emitters.remove(key);
    }

    public Map<String, SseEmitter> getAll() {
        return emitters;
    }

    // 이벤트 캐시 저장
    public void cacheEvent(String key, Object event) {
        eventCache.computeIfAbsent(key, k -> new ArrayList<>()).add(event);
    }

    // 특정 키로 이벤트 가져오기
    public List<Object> getEvents(String key) {
        return eventCache.getOrDefault(key, new ArrayList<>());
    }

    public List<Object> getAllEvents() {
        List<Object> allEvents = new ArrayList<>();
        for (List<Object> events : eventCache.values()) {
            allEvents.addAll(events);
        }
        return allEvents;
    }

//    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
//    private final Map<String, List<SseEventWrapper>> eventCache = new ConcurrentHashMap<>();
//
//    public void save(String clientId, SseEmitter emitter) {
//        emitters.put(clientId, emitter);
//    }
//
//    public void remove(String clientId) {
//        emitters.remove(clientId);
//    }
//
//    public Map<String, SseEmitter> getAllEmitters() {
//        return emitters;
//    }
//
//    public void cacheEvent(String clientId, SseEventWrapper event) {
//        eventCache.computeIfAbsent(clientId, key -> new java.util.ArrayList<>()).add(event);
//    }
//
//    public List<SseEventWrapper> getCachedEvents(String clientId) {
//        return eventCache.getOrDefault(clientId, new java.util.ArrayList<>());
//    }
//
//    public void clearCachedEvents(String clientId) {
//        eventCache.remove(clientId);
//    }


}
