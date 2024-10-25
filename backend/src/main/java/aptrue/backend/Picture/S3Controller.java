package aptrue.backend.Picture;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.FileNotFoundException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class S3Controller {

    private final S3BucketClient bucketClient;

    @PostMapping("/picture/upload")
    public String upload() throws FileNotFoundException {
        System.out.println("Pleaaaaaaaaaaaaaaaaase");
        log.info("uploadrequest");
        bucketClient.uploadObject();
        return "success";
    }
}
