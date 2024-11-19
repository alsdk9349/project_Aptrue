package aptrue.backend.Admin.Entity;

import aptrue.backend.Apartment.Entity.Apartment;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private int adminId;

    @NotNull
    @Column(name = "account", unique = true, length = 100)
    private String account;

    @NotNull
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "phone")
    private String phone;

    @NotNull
    @Column(name = "is_super_admin")
    private boolean isSuperAdmin;

    @NotNull
    @Column(name = "createdAt", columnDefinition = "timestamp")
    private LocalDateTime createdAt;

    @Column(name = "token", length = 500)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apartment apartment;
}
