package com.btl.java_web.controller;

import com.btl.java_web.dto.request.AccountCreationRequest;
import com.btl.java_web.dto.request.LoginRequest;
import com.btl.java_web.dto.response.LoginResponse;
import com.btl.java_web.entity.Account;
import com.btl.java_web.service.AccountService;
import com.btl.java_web.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth") // Đặt đường dẫn chung là /auth
public class AuthController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<Account> registerUser(@RequestBody AccountCreationRequest request) {

        // ⚠️ VÁ LỖ HỔNG BẢO MẬT: LUÔN SET ROLE LÀ USER KHI ĐĂNG KÝ
        request.setRole("USER");

        Account newAccount = accountService.createAccount(request);
        return ResponseEntity.ok(newAccount);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        // Xác thực người dùng (username, password)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Nếu xác thực thành công
        if (authentication.isAuthenticated()) {
            // Tìm thông tin Account (để tạo token)
            var userDetails = accountService.getAccountByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Tạo access token và refresh token
            String accessToken = jwtService.generateAccessToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return ResponseEntity.ok(new LoginResponse(accessToken, refreshToken));
        } else {
            // Trường hợp xác thực thất bại
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }
}