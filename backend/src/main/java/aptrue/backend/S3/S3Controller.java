package aptrue.backend.S3;

import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Sse.Dto.SseResponseDto.SseResponseDto;
import aptrue.backend.Sse.Repository.SseRepository;
import aptrue.backend.Sse.Service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
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
    private final ClipRQRepository clipRQRepository;
    private final SseRepository sseRepository;
    private final SseService sseService;

    @Transactional
    @PostMapping("/picture/upload")
    public String pictureUpload(
            @RequestParam("clipRQId") int clipRQId,
            @RequestParam("files") List<MultipartFile> photos) throws FileNotFoundException {
        List<String> images = new ArrayList<>();
        int len = photos.size();
        if (len > 9) {
            throw new IllegalArgumentException("You can upload a maximum of 9 photos.");
        }
        for (int i=0;i< len;i++) {
            String fileName = i+1+"";
            String directoryPath = "request_" + clipRQId; // clipRQ 번호로 디렉토리 경로 설정
            String fullPath = directoryPath + "/images/" + fileName;
            images.add("https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/request/" + fullPath);
            bucketClient.uploadPhoto(photos.get(i), fullPath); // 파일을 경로 포함해서 업로드
        }
        s3Service.updateImages(clipRQId, len);
        ClipRQ optionalClipRQ = clipRQRepository.findById(clipRQId)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        SseResponseDto responseDto = SseResponseDto.builder()
                .clipId(optionalClipRQ.getClipRQId())
                .message("사람 사진 업로드 완료")
                .name(optionalClipRQ.getName())
                .status(optionalClipRQ.getStatus())
                .build();

        sseService.sendEvent("사람 사진 업로드 완료", responseDto);

        optionalClipRQ.setPhotoStatus(true);
        optionalClipRQ.setImages(images);
        clipRQRepository.save(optionalClipRQ);

        return "success";
    }

    @PostMapping("/video/upload")
    public String videoUpload(@RequestParam("file") MultipartFile video) throws FileNotFoundException {
        String fileName = video.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            fileName = "default.video"; // 기본 파일 이름 설정
        }
        fileName = fileName.replace("-","/");
        bucketClient.uploadVideo(video, fileName); // 파일 이름 전달
        return "success";
    }

}
