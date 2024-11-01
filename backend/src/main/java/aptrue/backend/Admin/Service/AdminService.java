package aptrue.backend.Admin.Service;

import aptrue.backend.Admin.Dto.LoginRequestDto;
import aptrue.backend.Admin.Dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletResponse;

public interface AdminService {
    LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse);
}
