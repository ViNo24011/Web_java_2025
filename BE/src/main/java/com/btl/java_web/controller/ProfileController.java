package com.btl.java_web.controller;

import com.btl.java_web.dto.request.ProfileUpdateRequest;
import com.btl.java_web.entity.Account;
import com.btl.java_web.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile") // Đường dẫn chung cho khu vực cá nhân
public class ProfileController {

    @Autowired
    private AccountService accountService;

    /**
     * API: Lấy thông tin profile của chính user đang đăng nhập
     * Method: GET
     * URL: /profile/me
     */
    @GetMapping("/me")
    public ResponseEntity<Account> getMyProfile() {
        // Lấy thông tin xác thực (đã được JwtAuthenticationFilter xử lý)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Lấy username từ thông tin xác thực
        String myUsername = authentication.getName();

        // Dùng username để tìm Account
        Account myAccount = accountService.getAccountByUsername(myUsername)
                .orElseThrow(() -> new RuntimeException("Error: My profile not found"));

        // ⚠️ BẢO MẬT: Không bao giờ trả về mật khẩu trong API response
        myAccount.setPassword(null);

        return ResponseEntity.ok(myAccount);
    }

    /**
     * API: Lấy lịch sử đặt vé của chính user đang đăng nhập
     * Method: GET
     * URL: /profile/history
     */
    @GetMapping("/history")
    public ResponseEntity<List<String>> getMyOrderHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String myUsername = authentication.getName();

        Account myAccount = accountService.getAccountByUsername(myUsername)
                .orElseThrow(() -> new RuntimeException("Error: My profile not found"));

        return ResponseEntity.ok(myAccount.getOrderHistory());
    }

    /**
     * API: Cập nhật thông tin profile của chính user đang đăng nhập
     * Method: PUT
     * URL: /profile/me
     */
    @PutMapping("/me")
    public ResponseEntity<Account> updateMyProfile(@RequestBody ProfileUpdateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String myUsername = authentication.getName();

        Account myAccount = accountService.getAccountByUsername(myUsername)
                .orElseThrow(() -> new RuntimeException("Error: My profile not found"));

        // Gọi hàm service mới (chúng ta sẽ tạo ở Bước 4.3)
        // Hàm này sẽ dùng DTO an toàn (ProfileUpdateRequest)
        Account updatedAccount = accountService.updateMyProfile(myAccount.getAccount_id(), request);

        updatedAccount.setPassword(null); // Không trả về mật khẩu
        return ResponseEntity.ok(updatedAccount);
    }
}