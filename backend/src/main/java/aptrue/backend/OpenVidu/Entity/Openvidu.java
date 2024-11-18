package aptrue.backend.OpenVidu.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "Openvidu")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Openvidu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "openvidu_id")
    private int openviduId;

    @NotNull
    @Column(name = "session_id")
    private String sessionId;
}
