package aptrue.backend.Ai;

import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class WebClientService {

    private final WebClient webClient;
    private final ClipRQRepository clipRQRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public WebClientService(WebClient.Builder builder, ClipRQRepository clipRQRepository, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        // Reactor Netty HttpClient 설정
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(10))
                        .addHandlerLast(new WriteTimeoutHandler(10)));

        objectMapper.registerModule(new JavaTimeModule());

        this.webClient = builder
                .baseUrl("http://70.12.130.111:8888")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();

        this.clipRQRepository = clipRQRepository;
    }

    public void sendAsyncPostRequest(AiRequestDto aiRequestDto) {

        log.info("aaaaa + , {}", aiRequestDto.getClipRQId());

        webClient.post()
                .uri("/upload-video") // 엔드포인트
                .header("Content-Type", "application/json")
                .bodyValue(aiRequestDto)
                .retrieve()
                .bodyToMono(AiResponseDto.class) // 응답 타입을 ResponseType으로 설정
                .doOnError(error -> {
                    // 오류 발생 시 로깅 처리
                    System.err.println("Error occurred during request: " + error.getMessage());
                })
                .subscribe(response -> {
                    // 응답이 도착했을 때 데이터베이스 업데이트 실행
                    updateDatabase(response);
                });
        log.info("bbb+ , {}", aiRequestDto.getClipRQId());
    }

    private void updateDatabase(AiResponseDto aiResponseDto) {
        // 데이터베이스 업데이트 로직
        System.out.println("Updating database with response: " + aiResponseDto);

        ClipRQ optionalClipRQ = clipRQRepository.findById(1)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        List<String> clipList = new ArrayList<>();
        clipList.add("여기를 실제 저장 url로 바꿔야됨");
        optionalClipRQ.setClipList(clipList);

        clipRQRepository.save(optionalClipRQ);

        // 여기서 SSE로 프론트한테 알림 줘야함
    }
}
