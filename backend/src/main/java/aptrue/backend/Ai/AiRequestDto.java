package aptrue.backend.Ai;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private List<String> imgNames;
    private List<String> cctvNames;
}
