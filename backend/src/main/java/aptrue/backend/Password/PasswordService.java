package aptrue.backend.Password;

import aptrue.backend.Password.Dto.PWVerifyRequestDto;
import aptrue.backend.Password.Dto.PWVerifyResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface PasswordService {
    PWVerifyResponseDto verify(PWVerifyRequestDto pwVerifyRequestDto, int clip_id);
    PWChangeResponseDto passwordChange(PWChangeRequestDto pwChangeRequestDto, HttpServletRequest httpServletRequest);
}
