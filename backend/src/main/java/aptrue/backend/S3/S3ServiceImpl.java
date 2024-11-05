package aptrue.backend.S3;

import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class S3ServiceImpl implements S3Service {

    private final ClipRQRepository clipRQRepository;

    @Transactional
    public void updateImages(int clipRQId, int len) {
        ClipRQ clipRQ = clipRQRepository.findById(clipRQId)
                .orElseThrow(()-> new BusinessException(ErrorCode.NOT_FOUND_RQId));
        List<String> prev = clipRQ.getImages();
        if (!prev.isEmpty()) {
            throw new BusinessException(ErrorCode.IMAGES_EXIST);
        }
        List<String> images = new ArrayList<>();
        for (int u=0;u<len;u++) {
            String url = "https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/request/request_";
            url+=clipRQId+"/images/"+(u+1);
            images.add(url);
        }
        clipRQ.setImages(images);
    }
}
