package com.btl.java_web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard") // Đã được bảo vệ bởi SecurityConfig
public class DashboardController {

    @GetMapping("/income")
    public String getIncomeReport() {
        // Logic chi tiết sẽ do người khác code
        return "ADMIN: (Stub) Returning income report";
    }
}