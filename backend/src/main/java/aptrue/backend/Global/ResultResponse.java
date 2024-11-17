package aptrue.backend.Global;

import aptrue.backend.Global.Code.SuccessCode;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResultResponse {
    private final int status;
    private final String code;
    private final String message;
    private final Object data;

    public static ResultResponse of(SuccessCode successCode, Object data) {
        return ResultResponse.builder()
                .status(successCode.getStatus().value())
                .code(successCode.getCode())
                .data(data)
                .message(successCode.getMessage())
                .build();
    }

    public static ResultResponse of(SuccessCode successCode) {
        return ResultResponse.builder()
                .status(successCode.getStatus().value())
                .code(successCode.getCode())
                .message(successCode.getMessage())
                .build();
    }
}
