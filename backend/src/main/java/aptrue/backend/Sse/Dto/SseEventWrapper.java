package aptrue.backend.Sse.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SseEventWrapper {
    private String eventName;
    private Object data;
}
