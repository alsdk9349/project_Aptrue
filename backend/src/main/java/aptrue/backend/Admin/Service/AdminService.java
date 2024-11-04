package aptrue.backend.Admin.Service;

import aptrue.backend.Admin.Dto.LoginRequestDto;
import aptrue.backend.Admin.Dto.LoginResponseDto;
import aptrue.backend.Admin.Dto.SignupRequestDto;
import aptrue.backend.Admin.Dto.SignupResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AdminService {
    LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse);
    SignupResponseDto signup(SignupRequestDto adminIn, HttpServletRequest signupRequestDto);
}
