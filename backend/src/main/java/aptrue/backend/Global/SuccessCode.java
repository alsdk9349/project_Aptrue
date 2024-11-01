package aptrue.backend.Global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    // 기본형
    COMMON_OK(HttpStatus.OK, "S000", "요청을 처리했습니다."),

    // 관리자
    LOGIN_OK(HttpStatus.OK, "A001", "로그인 성공했습니다.");

    private final HttpStatus status;
    private final String code;
    private String message;
}
