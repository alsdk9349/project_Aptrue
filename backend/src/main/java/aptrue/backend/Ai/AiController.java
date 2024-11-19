package aptrue.backend.Ai;

import aptrue.backend.Admin.Dto.RequestDto.SignupRequestDto;
import aptrue.backend.Admin.Dto.ResponseDto.SignupResponseDto;
import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Code.SuccessCode;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.ResultResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import aptrue.backend.Ai.WebClientService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AiController {

    private final ClipRQRepository clipRQRepository;
    private final WebClientService webClientService;


    @PostMapping("/ai")
    public String pictureUpload() throws JsonProcessingException {
        log.info("11111111");
        List<String> originalCctvList = new ArrayList<>();
        originalCctvList.add("please1111");
        originalCctvList.add("please2222");

        log.info("22222 + , {}", originalCctvList);
        ClipRQ optionalClipRQ = clipRQRepository.findById(1)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        log.info("33333 + , {}", optionalClipRQ.getClipRQId());

        AiRequestDto aiRequestDto = AiRequestDto.builder()
                .ClipRQId(1)
                .adminID(1)
                .imgNames(optionalClipRQ.getImages())
                .cctvNames(originalCctvList)
                .build();

        webClientService.sendAsyncPostRequest(aiRequestDto);

        System.out.println("Payload sent to GPU server: " + new ObjectMapper().writeValueAsString(aiRequestDto));

        return "success";
    }




}
