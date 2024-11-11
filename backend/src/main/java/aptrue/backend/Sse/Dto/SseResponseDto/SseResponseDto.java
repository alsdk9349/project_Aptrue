package aptrue.backend.Sse.Dto.SseResponseDto;

import aptrue.backend.Clip.Entity.ClipRQ;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SseResponseDto {

    private long clipId;
    private String name;
    private String message;
    private LocalDateTime createdAt;

    @Builder
    private SseResponseDto(long clipId, String name, String message) {
        this.clipId = clipId;
        this.name = name;
        this.createdAt = LocalDateTime.now();;
        this.message = message;
    }

    public static SseResponseDto of(ClipRQ clipRQ) {
        return SseResponseDto.builder()
                .clipId(clipRQ.getClipRQId())
                .name(clipRQ.getName())
                .build();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"message\": ").append(message).append(", ");
        sb.append("\"clipId\": ").append(clipId).append(", ");
        sb.append("\"name\": ").append(name).append(", ");
        sb.append("\"createdAt\": ").append(createdAt).append(" }");

        return sb.toString();
    }
}
