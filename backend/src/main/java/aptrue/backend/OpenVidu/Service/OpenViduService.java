package aptrue.backend.OpenVidu.Service;

import java.util.Map;

public interface OpenViduService {

    String createSession(Map<String, Object> params);
    String createConnection(String sessionId, Map<String, Object> params);
    String getSession();
}
