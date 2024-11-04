package aptrue.backend.Global.Code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Admin
    ADMIN_NOT_FOUND(HttpStatus.NOT_FOUND, "E001", "존재하지 않는 관리자입니다."),
    NOT_SUPER_ADMIN(HttpStatus.NOT_FOUND, "E002", "SuperUser가 아닙니다."),
    ACCOUNT_EXIST(HttpStatus.NOT_FOUND, "E003", "이미 존재하는 계정입니다."),
    PHONE_EXIST(HttpStatus.NOT_FOUND, "E004", "이미 존재하는 번호입니다."),
    PASSWORD_DIFF(HttpStatus.NOT_FOUND, "E005", "비밀번호가 틀렸습니다.");


    private final HttpStatus status;
    private final String code;
    private final String message;
}
