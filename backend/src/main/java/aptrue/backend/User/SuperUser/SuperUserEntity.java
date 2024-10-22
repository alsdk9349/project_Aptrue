package aptrue.backend.User.SuperUser;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "superuser")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SuperUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "superuser_id")
    private long superuserId;

    @NotNull
    @Column(name = "email", unique = true, length = 100)
    private String email;

    @NotNull
    @Column(name = "issuperuser")
    private boolean issuperuser;

    @NotNull
    @Column(name = "password")
    private String password;

    @Column(name = "token", length = 500)
    private String token;
}
