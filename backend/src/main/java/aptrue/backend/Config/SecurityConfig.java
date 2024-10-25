package aptrue.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 해제
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/public/**").permitAll() // 특정 경로에 대한 접근 허용
                        .requestMatchers("/picture/upload").permitAll() // 업로드 경로 허용
                        .anyRequest().authenticated() // 그 외 경로는 인증 필요
                )
                .formLogin(form -> form.permitAll()); // 기본 로그인 폼 사용 및 접근 허용

        return http.build();
    }
}
