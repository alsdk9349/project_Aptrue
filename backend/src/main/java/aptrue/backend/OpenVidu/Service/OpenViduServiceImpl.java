package aptrue.backend.OpenVidu.Service;

import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.OpenVidu.Dto.ResponseDto.GetSessionResponseDto;
import aptrue.backend.OpenVidu.Entity.Openvidu;
import aptrue.backend.OpenVidu.Repository.OpenviduRepository;
import io.openvidu.java.client.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class OpenViduServiceImpl implements OpenViduService {

    private final OpenVidu openVidu;
    private final OpenviduRepository openviduRepository;

    @Autowired  // 명시적으로 의존성 주입을 처리
    public OpenViduServiceImpl(@Value("${openvidu.url}") String openviduUrl,
                               @Value("${openvidu.secret}") String secret,
                               OpenviduRepository openviduRepository) {
        this.openVidu = new OpenVidu(openviduUrl, secret);
        this.openviduRepository = openviduRepository;
    }

    @Override
    public String createSession(Map<String, Object> params) {

        try {
            SessionProperties properties = SessionProperties.fromJson(params).build();
            log.info("dddddddddddddddddddddddddddd");
            Session session = openVidu.createSession(properties);
            Openvidu openvidu = Openvidu.builder()
                    .sessionId(session.getSessionId())
                    .build();

            openviduRepository.save(openvidu);

            return session.getSessionId();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error(e.getMessage());
            throw new BusinessException(ErrorCode.SESSION_CREATION_FAILED);
        }
    }

    public GetSessionResponseDto getSession() {
        List<Openvidu> sessions = openviduRepository.findAll();

        if (!sessions.isEmpty()) {
            String sessionId = sessions.getLast().getSessionId();
            Openvidu openvidu = openviduRepository.findBySessionId(sessionId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.SESSION_NOT_FOUND));

            GetSessionResponseDto responseDto = GetSessionResponseDto.builder()
                            .sessionId(sessionId)
                                    .openviduId(sessions.getLast().getOpenviduId())
                                            .build();

            return responseDto;

        } else {
            throw new BusinessException(ErrorCode.SESSION_NOT_FOUND);
        }
    }

    @Override
    public String createConnection(String sessionId,Map<String, Object> params) {
        log.info("토큰 만들어 보자ㅏㅏㅏ");
        try {
            Session session = openVidu.getActiveSession(sessionId);
            log.info("Session state 있냐없냐: {}", session != null ? "Active" : "Not found");
            if (session == null) {
                log.info("Session not found, creating new session with id: {}", sessionId);
                SessionProperties properties = new SessionProperties.Builder()
                        .customSessionId(sessionId)
                        .build();
                session = openVidu.createSession(properties);
                log.info("Session created: {}", session.getSessionId());
            }
            log.info("Session found or created: {}", session.getSessionId());

            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            log.info("Connection properties created: {}", properties);

            Connection connection = session.createConnection(properties);
            log.info("Connection created, token: {}", connection.getToken());

            return connection.getToken();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error("Error creating connection 에러에러: {}", e.getMessage(), e);
            throw new BusinessException(ErrorCode.TOKEN_CREATION_FAILED);
        }

    }
}
