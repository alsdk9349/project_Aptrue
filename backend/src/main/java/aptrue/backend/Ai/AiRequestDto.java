package aptrue.backend.Ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiRequestDto {
    private int ClipRQId;
    private int adminID;
    private LocalDateTime createdAt;
    private List<String> imgNames;
    private List<String> cctvNames;
}
