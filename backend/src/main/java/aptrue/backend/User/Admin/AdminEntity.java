package aptrue.backend.User.Admin;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "admin")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private long adminId;

    @NotNull
    @Column(name = "email", unique = true, length = 100)
    private String email;

    @NotNull
    @Column(name = "is_superuser")
    private boolean isSuperuser;

    @NotNull
    @Column(name = "password")
    private String password;

    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "phone")
    private int phone;

    @Column(name = "name")
    private String name;

}
