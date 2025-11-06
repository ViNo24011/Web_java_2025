package com.btl.java_web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

@Configuration // Báo cho Spring biết đây là file cấu hình
public class SecurityConfig {

    @Bean // Tạo ra một "Bean" (đối tượng) để Spring quản lý
    public PasswordEncoder passwordEncoder() {
        // Chúng ta sử dụng thuật toán mã hóa BCrypt
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}