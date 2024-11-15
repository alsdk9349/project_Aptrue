package aptrue.backend.Admin.Service;

import aptrue.backend.Admin.Dto.RequestDto.CheckPasswordRequestDto;
import aptrue.backend.Admin.Dto.RequestDto.LoginRequestDto;
import aptrue.backend.Admin.Dto.RequestDto.SignupRequestDto;
import aptrue.backend.Admin.Dto.ResponseDto.AdminListResponseDto;
import aptrue.backend.Admin.Dto.ResponseDto.LoginResponseDto;
import aptrue.backend.Admin.Dto.ResponseDto.SignupResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface AdminService {
    LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse);
    SignupResponseDto signup(SignupRequestDto adminIn, HttpServletRequest signupRequestDto);
    List<AdminListResponseDto> getAdminList(HttpServletRequest httpServletRequest, int page, int limit);
    List<AdminListResponseDto> getAdminListv1(int page, int limit);
    void deleteAdmin(HttpServletRequest httpServletRequest, int adminId);
    boolean checkPassword(CheckPasswordRequestDto requestDto, HttpServletRequest httpServletRequest);
}
