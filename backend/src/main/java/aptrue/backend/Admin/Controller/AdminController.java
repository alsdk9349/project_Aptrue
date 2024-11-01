package aptrue.backend.Admin.Controller;

import aptrue.backend.Admin.Dto.LoginRequestDto;
import aptrue.backend.Admin.Service.AdminService;
import aptrue.backend.Global.ResultResponse;
import aptrue.backend.Global.SuccessCode;
import aptrue.backend.Admin.Dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse) {
        LoginResponseDto loginResponseDto = adminService.login(loginRequestDto, httpServletResponse);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.LOGIN_OK, loginResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    public void test() {

    }
}
