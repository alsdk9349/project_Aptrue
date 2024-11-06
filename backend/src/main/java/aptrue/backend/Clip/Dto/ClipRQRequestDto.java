package aptrue.backend.Clip.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class ClipRQRequestDto {

    @NotNull
    private String name;

    @NotNull
    private String phone;

    @NotNull
    private String email;

    @NotNull
    private String address;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    @NotNull
    private List<String> sections;

}
