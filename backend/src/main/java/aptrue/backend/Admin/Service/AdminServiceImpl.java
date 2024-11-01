package aptrue.backend.Admin.Service;

import aptrue.backend.Global.BusinessException;
import aptrue.backend.Global.ErrorCode;
import aptrue.backend.Admin.Dto.LoginRequestDto;
import aptrue.backend.Admin.Dto.LoginResponseDto;
import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Transactional
    public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse) throws BadCredentialsException, UsernameNotFoundException {
        String account = loginRequestDto.getAccount();
        String password = loginRequestDto.getPassword();
        Admin admin = adminRepository.findByAccount(account).orElseThrow(
                () -> new BusinessException(ErrorCode.ADMIN_NOT_FOUND)
        );
        LoginResponseDto loginResponseDto = LoginResponseDto
                .builder()
                .adminID(admin.getAdminId())
                .account(admin.getAccount())
                .name(admin.getName())
                .build();
        return loginResponseDto;
    }
}
