package aptrue.backend.Global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Admin
    ADMIN_NOT_FOUND(HttpStatus.NOT_FOUND, "E001", "존재하지 않는 관리자입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
