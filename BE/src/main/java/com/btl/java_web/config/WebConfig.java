package com.btl.java_web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Cho phép tất cả các đường dẫn
                        .allowedOrigins("http://localhost:8386") // Chỉ cho phép origin này
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các method
                        .allowedHeaders("*") // Cho phép tất cả các header
                        .allowCredentials(true) // Cho phép gửi cookie/auth
                        .maxAge(3600); // Cache preflight request trong 1 giờ
            }
        };
    }

    /**
     * Bean này cho phép Spring Security sử dụng CORS configuration
     * Điều này đảm bảo rằng preflight requests (OPTIONS) được xử lý đúng
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8386"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        // Phải dùng addAllowedHeader thay vì setAllowedHeaders với wildcard
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); // Cache preflight trong 1 giờ
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}