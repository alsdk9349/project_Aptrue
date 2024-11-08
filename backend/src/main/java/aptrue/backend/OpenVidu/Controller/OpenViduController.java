package aptrue.backend.OpenVidu.Controller;

import aptrue.backend.OpenVidu.Service.OpenViduService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/openvidu")
@Slf4j
public class OpenViduController {

    private final OpenViduService openViduService;

    @GetMapping("/token")
    public String getToken() {
        return openViduService.createSessionAndToken();
    }
}
