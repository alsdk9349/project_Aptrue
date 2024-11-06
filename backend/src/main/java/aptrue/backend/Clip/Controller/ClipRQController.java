package aptrue.backend.Clip.Controller;

import aptrue.backend.Clip.Dto.ClipRQRequestDto;
import aptrue.backend.Clip.Dto.ClipRQResponseDto;
import aptrue.backend.Clip.Service.ClipRQService;
import aptrue.backend.Global.Code.SuccessCode;
import aptrue.backend.Global.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/clipRQ")
@RequiredArgsConstructor
public class ClipRQController {

    private final ClipRQService clipRQService;

    @PostMapping("/new")
    public ResponseEntity<?> newClipRQ(@RequestBody ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest) {
        ClipRQResponseDto clipRQResponseDto = clipRQService.newClipRQ(clipRQRequestDto, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.CLIP_RQ_OK, clipRQResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
