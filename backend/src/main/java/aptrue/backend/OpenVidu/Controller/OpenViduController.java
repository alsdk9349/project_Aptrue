package aptrue.backend.OpenVidu.Controller;

import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.ResultResponse;
import aptrue.backend.OpenVidu.Service.OpenViduService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class OpenViduController {

    private final OpenViduService openViduService;

    @PostMapping("/session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session 생성 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResultResponse.class))),
    })
    public Map<String, Object> createSession(@RequestBody(required = false) Map<String, Object> params) {
        try {
            String sessionId = openViduService.createSession(params!=null ? params : new HashMap<>());
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", sessionId);
            return response;
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.SESSION_CREATION_FAILED);
        }
    }

    @GetMapping("get/session")
    public ResponseEntity<?> getSession() {

    }

    @PostMapping("session/{sessionId}/connection")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token 생성 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResultResponse.class))),
    })
    public Map<String, Object> createConnections(@PathVariable String sessionId,
                                                 @RequestBody(required = false) Map<String, Object> params) {
        try {
            String token = openViduService.createConnection(sessionId, params != null ? params : new HashMap<>());
            log.info("params  : {}", params);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            return response;
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Token creation failed", e);
            throw new BusinessException(ErrorCode.TOKEN_CREATION_FAILED);
        }
    }
}
