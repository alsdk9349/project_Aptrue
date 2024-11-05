package aptrue.backend.Clip.Service;

import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Clip.Dto.ClipRQRequestDto;
import aptrue.backend.Clip.Dto.ClipRQResponseDto;
import aptrue.backend.Clip.Entity.Clip;
import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.Util.CookieUtil;
import jakarta.persistence.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClipRQServiceImpl implements ClipRQService {

    private final ClipRQRepository clipRQRepository;
    private final CookieUtil cookieUtil;
    private final AdminRepository adminRepository;

    @Transactional
    public ClipRQResponseDto newClipRQ(ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        List<String> empty = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        ClipRQ clipRQ = ClipRQ.builder()
                .admin(admin)
                .images(empty)
                .sections(clipRQRequestDto.getSections())
                .address(clipRQRequestDto.getAddress())
                .phone(clipRQRequestDto.getPhone())
                .createdAt(now)
                .name(clipRQRequestDto.getName())
                .email(clipRQRequestDto.getEmail())
                .status("처리 대기")
                .startTime(clipRQRequestDto.getStartTime())
                .endTime(clipRQRequestDto.getEndTime())
                .build();

        clipRQRepository.save(clipRQ);

        ClipRQ optionalClipRQ = clipRQRepository.findByPhone(clipRQRequestDto.getPhone())
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        ClipRQResponseDto clipRQResponseDto = ClipRQResponseDto.builder()
                .clipRQId(optionalClipRQ.getClipRQId())
                .sections(optionalClipRQ.getSections())
                .address(optionalClipRQ.getAddress())
                .phone(optionalClipRQ.getPhone())
                .createdAt(optionalClipRQ.getCreatedAt())
                .name(optionalClipRQ.getName())
                .email(optionalClipRQ.getEmail())
                .status(optionalClipRQ.getStatus())
                .startTime(optionalClipRQ.getStartTime())
                .endTime(optionalClipRQ.getEndTime())
                .build();

        return clipRQResponseDto;
    }
}
