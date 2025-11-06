package com.btl.java_web.config;

import com.btl.java_web.entity.Account;
import com.btl.java_web.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component // Báo cho Spring biết đây là một Bean
public class DataSeeder implements CommandLineRunner { // Implement CommandLineRunner

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // 1. Kiểm tra xem tài khoản "admin" đã tồn tại hay chưa
        if (accountRepository.existsByUsername("admin")) {
            System.out.println("Admin account already exists. Skipping seeding.");
            return; // Nếu đã tồn tại, không làm gì cả
        }

        // 2. Nếu chưa tồn tại, tạo tài khoản ADMIN mới
        Account adminAccount = new Account();
        adminAccount.setUsername("admin");
        adminAccount.setPassword(passwordEncoder.encode("admin123")); // Set một mật khẩu mặc định
        adminAccount.setRole("ADMIN");
        adminAccount.setName("Default Admin");
        adminAccount.setPhone("000000000");
        adminAccount.setAddress("Admin Headquarters");
        adminAccount.setOrderHistory(Collections.emptyList()); // Khởi tạo danh sách rỗng

        // 3. Lưu tài khoản mới vào CSDL
        accountRepository.save(adminAccount);

        System.out.println("Default ADMIN account created successfully!");
    }
}