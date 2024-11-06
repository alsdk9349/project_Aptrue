package aptrue.backend.S3;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

public interface BucketClient {
    void uploadPhoto(MultipartFile photo, String fileName) throws FileNotFoundException;
    void uploadVideo(MultipartFile video, String fileName) throws FileNotFoundException;
}
