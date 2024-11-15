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
import aptrue.backend.Password.Dto.Response.CheckPasswordResponseDto;
import aptrue.backend.Password.Dto.Response.PWVerifyResponseDto;
import aptrue.backend.Password.Dto.Request.PWChangeRequestDto;
import aptrue.backend.Password.Dto.Response.PWChangeResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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
    public CheckPasswordResponseDto checkPassword(CheckPasswordRequestDto requestDto, HttpServletRequest httpServletRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String requestPassword = requestDto.getPassword();

        int adminId = cookieUtil.getAdminId(httpServletRequest);
        Optional<Admin> admin = adminRepository.findByAdminId(adminId);

        if (admin.isEmpty()) {
            throw new BusinessException(ErrorCode.ADMIN_NOT_FOUND);
        }

        String logInPassword = admin.get().getPassword();

        if (!passwordEncoder.matches(requestPassword, logInPassword)) {
            throw new BusinessException(ErrorCode.PASSWORD_DIFF);
        }

        ClipRQ clipRQ = clipRQRepository.findById(requestDto.getClipRQId())
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        List<String> sections = clipRQ.getSections();
        LocalDateTime start = clipRQ.getStartDate();
        LocalDateTime end = clipRQ.getEndDate();
        List<String> original = new ArrayList<>();

        // 날짜와 시간을 포맷팅하기 위한 포맷터 설정
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");

        // sections의 각 항목에 대해 반복
        for (String section : sections) {
            // start부터 end까지 1분 단위로 반복
            LocalDateTime currentTime = start;
            while (!currentTime.isAfter(end)) {
                // 날짜와 시간을 포맷팅하여 URL을 생성
                String dateStr = currentTime.format(dateFormatter);  // 날짜 부분
                String timeStr = currentTime.format(timeFormatter);  // 시간 부분

                // URL을 생성하여 original 리스트에 추가
                String url = "https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/" +
                        dateStr + "-" + section + "-" + timeStr + ".mp4";
                original.add(url);

                // 1분 후로 시간이 증가
                currentTime = currentTime.plusMinutes(1);
            }
        }

        CheckPasswordResponseDto checkPasswordResponseDto = CheckPasswordResponseDto.builder()
                .videos(original)
                .build();

        return checkPasswordResponseDto;
    }
}
