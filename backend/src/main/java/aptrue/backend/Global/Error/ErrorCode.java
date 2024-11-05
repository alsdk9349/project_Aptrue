package aptrue.backend.Global.Error;

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
    PASSWORD_DIFF(HttpStatus.NOT_FOUND, "E005", "비밀번호가 틀렸습니다."),

    // CCTV
    CLIP_RQ_FAIL(HttpStatus.NOT_FOUND, "E101", "CCTV 요청이 처리되지 않았습니다."),
    PHOTO_EXCEED_9(HttpStatus.NOT_FOUND, "E102", "사진은 9장까지 업로드할 수 있습니다.");


    private final HttpStatus status;
    private final String code;
    private final String message;
}
