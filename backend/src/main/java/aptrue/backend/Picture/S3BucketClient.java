package aptrue.backend.Picture;

import io.awspring.cloud.s3.S3Operations;
import io.awspring.cloud.s3.S3Resource;
import lombok.RequiredArgsConstructor;
import java.util.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3BucketClient implements BucketClient{

    private final S3Operations s3Operations;

    @Override
    public void uploadObject() throws FileNotFoundException {

        try (InputStream inputStream = new ClassPathResource("static/puppy.jpg").getInputStream()){
            log.info("Uploading file to S3...");
            S3Resource upload = s3Operations.upload("aptrue-s3-bucket", "images/puppy.jpg", inputStream);
            log.info("Upload successful: " + upload.getURL());
        } catch (IOException e) {
            log.error("Error during upload", e);
            throw new RuntimeException(e);
        }
    }
}
