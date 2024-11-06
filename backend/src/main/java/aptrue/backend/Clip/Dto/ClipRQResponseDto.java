package aptrue.backend.Clip.Dto;

import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Clip.Entity.Clip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
public class ClipRQResponseDto {

    private int clipRQId;

    private List<String> sections;

    private String address;

    private String phone;

    private LocalDateTime createdAt;

    private String name;

    private String email;

    private String status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

}
