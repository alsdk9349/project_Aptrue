package aptrue.backend.Global.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@RequiredArgsConstructor
@Slf4j
public class CookieUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    /**
     * JWT에서 ID 정보 확인
     *
     * @param request
     * @return
     */
    public int getAdminId(HttpServletRequest request) {
        // 쿠키에서 JWT 토큰을 가져옴
        String accessToken = getJwtFromCookies(request, "accessToken");

        log.info("{}", accessToken);
        log.info("secret : {}", secretKey);
        if (accessToken != null) {
            try {
                // JWT 토큰을 파싱하여 클레임을 추출
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(accessToken)
                        .getBody();


                int adminId = getId(claims);
                log.info("memberId : {}", adminId);

                return adminId;

            } catch (SignatureException e) {
                // JWT 서명 오류 처리
                e.printStackTrace();
            } catch (Exception e) {
                // 기타 오류 처리
                e.printStackTrace();
            }
        }
        // 기본값 또는 예외 처리
        return -1;
    }

    private int getId(Claims claims) {
        Object userIdObject = claims.get("adminId");

        if (userIdObject instanceof String) {
            return Integer.parseInt((String) userIdObject);
        } else if (userIdObject instanceof Integer) {
            return ((Integer) userIdObject).intValue();
        } else {
            // 예상되지 않은 타입 처리
            log.error("Unexpected userId type: {}", userIdObject.getClass());
            throw new IllegalArgumentException("Invalid userId type");
        }
    }

    private String getJwtFromCookies(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}