package aptrue.backend.Password.Service;

import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.Util.CookieUtil;
import aptrue.backend.Password.Dto.Request.CheckPasswordRequestDto;
import aptrue.backend.Password.Dto.Request.PWVerifyRequestDto;
import aptrue.backend.Password.Dto.Response.PWVerifyResponseDto;
import aptrue.backend.Password.Dto.Request.PWChangeRequestDto;
import aptrue.backend.Password.Dto.Response.PWChangeResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PasswordServiceImpl implements PasswordService {

    private final ClipRQRepository clipRQRepository;
    private final CookieUtil cookieUtil;
    private final AdminRepository adminRepository;

    @Transactional
    public PWVerifyResponseDto verify(PWVerifyRequestDto pwVerifyRequestDto, int clip_id) {
        ClipRQ clipRQ = clipRQRepository.findById(clip_id)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));
        String original = clipRQ.getPassword();
        String now = pwVerifyRequestDto.getPassword();
        if (!original.equals(now)) {
            throw new BusinessException(ErrorCode.PASSWORD_DIFF);
        }
        PWVerifyResponseDto pwVerifyResponseDto = PWVerifyResponseDto.builder()
                .clipId(clip_id)
                .build();
        return pwVerifyResponseDto;
    }

    @Transactional
    public PWChangeResponseDto passwordChange(PWChangeRequestDto pwChangeRequestDto, HttpServletRequest httpServletRequest) {
        int superAdminId = cookieUtil.getAdminId(httpServletRequest);

        Admin superAdmin = adminRepository.findByAdminId(superAdminId)
                .orElseThrow(()-> new BusinessException(ErrorCode.NOT_SUPER_ADMIN));

        if (!superAdmin.isSuperAdmin()) {
            throw new BusinessException(ErrorCode.NOT_SUPER_ADMIN);
        }

        Admin admin = adminRepository.findByAdminId(pwChangeRequestDto.getAdminId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String newPW = passwordEncoder.encode(pwChangeRequestDto.getPassword());
        admin.setPassword(newPW);
        adminRepository.save(admin);

        PWChangeResponseDto pwChangeResponseDto = PWChangeResponseDto.builder()
                .adminId(admin.getAdminId())
                .build();

        return pwChangeResponseDto;

    }


    @Transactional
    public boolean checkPassword(CheckPasswordRequestDto requestDto, HttpServletRequest httpServletRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String requestPassword = requestDto.getPassword();

        int adminId = cookieUtil.getAdminId(httpServletRequest);
        Optional<Admin> admin = adminRepository.findByAdminId(adminId);

        if (admin.isEmpty()) {
            throw new BusinessException(ErrorCode.ADMIN_NOT_FOUND);
        }

        String logInPassword = admin.get().getPassword();

        return passwordEncoder.matches(requestPassword, logInPassword);
    }
}
