package aptrue.backend.Password.Service;

import aptrue.backend.Password.Dto.Request.CheckPasswordRequestDto;
import aptrue.backend.Password.Dto.Request.PWVerifyRequestDto;
import aptrue.backend.Password.Dto.Response.CheckPasswordResponseDto;
import aptrue.backend.Password.Dto.Response.PWVerifyResponseDto;
import aptrue.backend.Password.Dto.Request.PWChangeRequestDto;
import aptrue.backend.Password.Dto.Response.PWChangeResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface PasswordService {
    PWVerifyResponseDto verify(PWVerifyRequestDto pwVerifyRequestDto, int clip_id);
    PWChangeResponseDto passwordChange(PWChangeRequestDto pwChangeRequestDto, HttpServletRequest httpServletRequest);
    CheckPasswordResponseDto checkPassword(CheckPasswordRequestDto requestDto, HttpServletRequest httpServletRequest);
}
