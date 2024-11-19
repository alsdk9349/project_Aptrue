package aptrue.backend.Global.Security;

import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomAdminDetailsService implements UserDetailsService {
    private final AdminRepository adminRepository;

    // JWT에서 추출한 유저 식별자(adminId)와 일치하는 admin이 데이터베이스에 존재하는지의 여부를 판단
    // Auth 객체(UserPasswordAuthenticationToken)를 만들 때 필요한 UserDetails 객체로 반환
    @Override
    public UserDetails loadUserByUsername(String adminId) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByAdminId(Integer.parseInt(adminId))
                .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND));

        CustomAdminInfoDto customAdminInfoDto = CustomAdminInfoDto.builder()
                .adminId(admin.getAdminId())
                .account(admin.getAccount())
                .isSuperAdmin(admin.isSuperAdmin())
                .phone(admin.getPhone())
                .createdAt(admin.getCreatedAt())
                .name(admin.getName())
                .password(admin.getPassword())
                .roles(admin.isSuperAdmin() ? List.of("ROLE_SUPER_ADMIN") : List.of("ROLE_ADMIN")) // roles 설정 확인
                .build();

        return new CustomAdminDetails(customAdminInfoDto);
    }

}
