package aptrue.backend.Global.Security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Getter
public class CustomAdminDetails implements UserDetails {
    private final CustomAdminInfoDto admin;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return admin.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return admin.getPassword();
    }

    @Override
    public String getUsername() {
        return String.valueOf(admin.getName());
    }

    public String getAccount() {return admin.getAccount();}
    public int getAdminId() {return admin.getAdminId();}
    public boolean isSuperAdmin() {return admin.isSuperAdmin();}
    public String getPhone() {return admin.getPhone();}
    public LocalDateTime getCreatedAt() {return admin.getCreatedAt();}



    @Override
    public boolean isAccountNonExpired() { // 계정 만료 여부
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // 계정이 잠겼는지 여부, 계정이 잠겨있는 경우 인증을 방지하는데 사용
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() { // 계정 활성화, 비활성화 여부
        return true;
    }
}
