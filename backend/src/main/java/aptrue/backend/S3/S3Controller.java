package aptrue.backend.S3;

import aptrue.backend.Ai.AiRequestDto;
import aptrue.backend.Ai.WebClientService;
import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class S3Controller {

    private final S3BucketClient bucketClient;
    private final S3Service s3Service;
    private final WebClientService webClientService;
    private final ClipRQRepository clipRQRepository;

    @PostMapping("/picture/upload")
    public String pictureUpload(
            @RequestParam("clipRQId") int clipRQId,
            @RequestParam("files") List<MultipartFile> photos) throws FileNotFoundException {
        int len = photos.size();
        if (len > 9) {
            throw new IllegalArgumentException("You can upload a maximum of 9 photos.");
        }
        for (int i=0;i< len;i++) {
            String fileName = i+1+"";
            String directoryPath = "request_" + clipRQId; // clipRQ 번호로 디렉토리 경로 설정
            String fullPath = directoryPath + "/images/" + fileName;

            log.info("Received file: ClipRQ={}, Name={}, Size={}", clipRQId, fileName, photos.get(i).getSize());

            bucketClient.uploadPhoto(photos.get(i), fullPath); // 파일을 경로 포함해서 업로드
        }
        s3Service.updateImages(clipRQId, len);

        ClipRQ optionalClipRQ = clipRQRepository.findById(clipRQId)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        // S3에 올리는 영상 주소로 바꿔야함
        List<String> originalCctvList = new ArrayList<>();

        AiRequestDto aiRequestDto = AiRequestDto.builder()
                .ClipRQId(clipRQId)
                .adminID(optionalClipRQ.getAdmin().getAdminId())
                .createdAt(optionalClipRQ.getCreatedAt())
                .imgNames(optionalClipRQ.getImages())
                .cctvNames(originalCctvList)
                .build();
        webClientService.sendAsyncPostRequest(aiRequestDto);
        return "success";
    }

    @PostMapping("/video/upload")
    public String videoUpload(@RequestParam("file") MultipartFile video) throws FileNotFoundException {
        String fileName = video.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            fileName = "default.video"; // 기본 파일 이름 설정
        }
        log.info("Received file: Name={}, Size={}", fileName, video.getSize());
        bucketClient.uploadVideo(video, fileName); // 파일 이름 전달
        return "success";
    }

}
