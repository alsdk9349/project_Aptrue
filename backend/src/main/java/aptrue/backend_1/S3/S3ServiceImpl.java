package aptrue.backend.S3;

import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        // 여기부터는 AI 관련 코드입니당
        RestTemplate restTemplate = new RestTemplate();
        String gpuServerUrl = "http://70.12.130.111:8888/upload-video";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("ClipRQId", clipRQId); // clipRQ 엔티티의 ID 사용
        requestBody.put("adminID", clipRQ.getAdmin().getAdminId()); // Admin 엔티티의 ID 사용
        requestBody.put("imgNames", images); // 이미지 이름 목록
        requestBody.put("cctvNames", clipRQ.getSections()); // CCTV 파일 이름 목록
        requestBody.put("createdAt", clipRQ.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, httpHeaders);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(gpuServerUrl, requestEntity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("GPU 서버로 요청이 성공적으로 전송되었습니다: {}", response.getBody());
            } else {
                log.error("GPU 서버 요청 실패: {}", response.getStatusCode());
                throw new BusinessException(ErrorCode.GPU_SERVER_REQUEST_FAILED);
            }
        } catch (HttpClientErrorException e) {
            log.error("GPU 서버 요청 중 에러 발생: {}", e.getStatusCode());
            throw new BusinessException(ErrorCode.GPU_SERVER_REQUEST_FAILED);
        }
        // 여기까지용
    }
}
