package com.btl.java_web.config;

import com.btl.java_web.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // Kích hoạt bảo mật web Spring
public class SecurityConfig {

    @Autowired
    private AccountRepository accountRepository;


    // --- BEAN TỪ BƯỚC 1 ---
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // --- BEAN TỪ BƯỚC 2 ---
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // --- CÁC BEAN CẦN THIẾT CHO BƯỚC 2 HOẠT ĐỘNG ---

    /**
     * Bean này nói cho Spring Security cách tìm kiếm một user.
     * Nó sử dụng AccountRepository để tìm theo username.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    /**
     * Bean này kết hợp UserDetailsService (tìm user) và PasswordEncoder (check pass)
     * để tạo thành một cơ chế xác thực hoàn chỉnh.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Đây là BEAN QUAN TRỌNG NHẤT (của Bước 3)
     * Nó cấu hình các quy tắc bảo mật cho từng đường dẫn (API)
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                // Tắt CSRF
                .csrf(csrf -> csrf.disable())

                // Cấu hình các quy tắc phân quyền (Authorization Rules)
                .authorizeHttpRequests(authz -> authz

                        // --- PHẦN CÔNG KHAI (PUBLIC) ---
                        // Cho phép tất cả các request tới /auth/** (login, register)
                        .requestMatchers("/auth/**").permitAll()

                        // --- PHẦN CỦA ADMIN ---
                        // Yêu cầu "ROLE_ADMIN" cho tất cả các endpoint /accounts/**
                        .requestMatchers("/accounts/**").hasRole("ADMIN")

                        // (Thêm các luật cho Admin ở đây như bạn yêu cầu)
                        .requestMatchers("/schedules/**").hasRole("ADMIN") // Tạo lịch trình
                        .requestMatchers("/buses/**").hasRole("ADMIN")     // Tạo xe
                        .requestMatchers("/dashboard/**").hasRole("ADMIN") // Xem thu nhập

                        // --- PHẦN CỦA USER/ADMIN ---
                        // (Chúng ta sẽ thêm ở Bước 4, ví dụ: /profile/me)
                        // .requestMatchers("/profile/me/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/profile/**").hasAnyRole("USER", "ADMIN")

                        // TẤT CẢ các request còn lại đều phải được xác thực
                        .anyRequest().authenticated()
                )

                // Cấu hình quản lý session: Không tạo session (stateless)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Bổ sung AuthenticationProvider
                .authenticationProvider(authenticationProvider())


                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class).addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}