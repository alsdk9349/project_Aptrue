package aptrue.backend.S3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class S3Controller {

    private final S3BucketClient bucketClient;

    @PostMapping("/picture/upload")
    public String pictureUpload(@RequestParam("file") MultipartFile photo) throws FileNotFoundException {
        String fileName = photo.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            fileName = "default.jpg"; // 기본 파일 이름 설정
        }
        log.info("Received file: Name={}, Size={}", fileName, photo.getSize());
        bucketClient.uploadPhoto(photo, fileName); // 파일 이름 전달
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
