package aptrue.backend.Password.Controller;

import aptrue.backend.Password.Dto.Request.CheckPasswordRequestDto;
import aptrue.backend.Admin.Service.AdminService;
import aptrue.backend.Global.Code.SuccessCode;
import aptrue.backend.Global.ResultResponse;
import aptrue.backend.Password.Dto.Request.PWVerifyRequestDto;
import aptrue.backend.Password.Dto.Response.CheckPasswordResponseDto;
import aptrue.backend.Password.Dto.Response.PWVerifyResponseDto;
import aptrue.backend.Password.Dto.Request.PWChangeRequestDto;
import aptrue.backend.Password.Dto.Response.PWChangeResponseDto;
import aptrue.backend.Password.Service.PasswordService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PasswordController {

    private final AdminService adminService;
    private final PasswordService passwordService;

    @PostMapping("/clip/upload/{clip_id}/link")
    public ResponseEntity<?> verify (@RequestBody PWVerifyRequestDto pwVerifyRequestDto, @PathVariable int clip_id) {
        PWVerifyResponseDto pwVerifyResponseDto = passwordService.verify(pwVerifyRequestDto, clip_id);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.PW_OK, pwVerifyResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/change/password")
    public ResponseEntity<?> passwordChange(@RequestBody PWChangeRequestDto pwChangeRequestDto, HttpServletRequest httpServletRequest) {
        PWChangeResponseDto pwChangeResponseDto = passwordService.passwordChange(pwChangeRequestDto, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.PW_CHANGE_OK, pwChangeResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/checkPassword")
    public ResponseEntity<?> checkPassword(@RequestBody CheckPasswordRequestDto requestDto, HttpServletRequest httpServletRequest) {
        CheckPasswordResponseDto checkPasswordResponseDto = passwordService.checkPassword(requestDto, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.CHECK_PASSWORD, checkPasswordResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
