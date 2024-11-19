package aptrue.backend.S3;

import io.awspring.cloud.s3.S3Operations;
import io.awspring.cloud.s3.S3Resource;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3BucketClient implements BucketClient{

    private final S3Operations s3Operations;

    @Override
    public void uploadPhoto(MultipartFile file, String fileName) throws FileNotFoundException {
        try (InputStream inputStream = file.getInputStream()) {
            S3Resource upload = s3Operations.upload("aptrue-s3-bucket",  "request/" + fileName, inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void uploadVideo(MultipartFile file, String fileName) throws FileNotFoundException {
        try (InputStream inputStream = file.getInputStream()) {
            S3Resource upload = s3Operations.upload("aptrue-s3-bucket", "videos/" + fileName, inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
