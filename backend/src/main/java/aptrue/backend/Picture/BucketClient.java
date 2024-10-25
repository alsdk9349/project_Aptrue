package aptrue.backend.Picture;

import java.io.FileNotFoundException;

public interface BucketClient {
    void uploadObject() throws FileNotFoundException;
}
