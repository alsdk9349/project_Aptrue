package aptrue.backend.Global.Util;

import aptrue.backend.Global.Security.CustomAdminInfoDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration_time}")
    private long accessTokenExpTime;

    @Value("${jwt.refresh_expiration_time}")
    private long refreshTokenExpTime;

    private Key key;

    @PostConstruct // 빈이 생성되고 의존관계 주입이 완료 된 후 실행되는 `초기화 콜백`을 적용하는 어노테이션
    public void init() {
        try {
            byte[] bytes = Base64.getDecoder().decode(secretKey);
            key = Keys.hmacShaKeyFor(bytes);
        } catch (IllegalArgumentException e) {
            log.error("Invalid JWT secret key format", e);
            throw e; // 예외를 던져 스프링이 빈 생성에 실패하도록 함
        }
    }

    public String createAccessToken(CustomAdminInfoDto adminInfoDto){
        return createToken(adminInfoDto, accessTokenExpTime);
    }

    public String createRefreshToken(CustomAdminInfoDto adminInfoDto) { return createToken(adminInfoDto, refreshTokenExpTime); }

    private String createToken(CustomAdminInfoDto adminInfoDto, long expireTime){

        Claims claims = Jwts.claims();

        claims.put("adminId", adminInfoDto.getAdminId());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now.toInstant())) // 토큰 발행 시간
                .setExpiration(Date.from(tokenValidity.toInstant())) // 토큰 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) // 암호화 알고리즘으로 토큰 암호화
                .compact(); // 토큰을 문자열 형태로 반환
    }


    public int getAdminId(String token){
        return parseClaims(token).get("adminId", Integer.class);
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch(io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
            log.info("Invalid JWT signature");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            log.info("JWT claims is empty");
        }
        return false;
    }

    public Claims parseClaims(String accessToken){
        try{
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch(ExpiredJwtException e){
            return e.getClaims();
        }
    }

}
