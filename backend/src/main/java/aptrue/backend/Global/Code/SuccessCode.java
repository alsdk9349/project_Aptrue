package aptrue.backend.Global.Code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    // 기본형
    COMMON_OK(HttpStatus.OK, "S000", "요청을 처리했습니다."),

    // 관리자
    LOGIN_OK(HttpStatus.OK, "A001", "로그인 성공했습니다."),
    SUPER_ADMIN_CHECK(HttpStatus.OK, "A002", "Super User 확인했습니다."),
    GET_ADMIN_LIST(HttpStatus.OK, "A003", "관리자 목록을 조회했습니다."),
    SIGN_UP_SUPERUSER(HttpStatus.OK, "A004", "슈퍼 유저를 등록했습니다."),
    SIGN_UP_OK(HttpStatus.OK, "A005", "새로운 관리자를 등록했습니다."),
    DELETE_ADMIN(HttpStatus.OK, "A006", "관리자를 삭제했습니다.");


    private final HttpStatus status;
    private final String code;
    private String message;
}
