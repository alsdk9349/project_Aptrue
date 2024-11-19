package aptrue.backend.Clip.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClipListResponseDto {

    private int clipRQId;

    private String status;

    private String address;

    private String name;

    private LocalDateTime createdAt;
}
