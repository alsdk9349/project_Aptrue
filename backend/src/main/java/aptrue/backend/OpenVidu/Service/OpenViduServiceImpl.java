package aptrue.backend.OpenVidu.Service;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.TokenOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OpenViduServiceImpl implements OpenViduService {
    private final OpenVidu openVidu;

    @Value("${openvidu.url}")
    private String openViduUrl;

    @Value("${openvidu.secret}")
    private String openViduSecret;

    public OpenViduServiceImpl() {
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
    }

    @Override
    public String createSessionAndToken() {
        try {
            Session session = openVidu.createSession();

            TokenOptions tokenOptions = new TokenOptions.Builder()
                    .build();

            return session.generateToken(tokenOptions);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
