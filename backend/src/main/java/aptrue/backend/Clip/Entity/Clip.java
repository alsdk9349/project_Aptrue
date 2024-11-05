package aptrue.backend.Clip.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "clip")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Clip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clip_id")
    private int clipId;

    @NotNull
    @Column(name = "clip_list")
    private List<String> clipList;

    @NotNull
    @Column(name = "createdAt", columnDefinition = "timestamp")
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "clip", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ClipRQ clipRQ;
}
