package com.btl.java_web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehicle") // Đã được bảo vệ bởi SecurityConfig
public class CoachController {

    @PostMapping
    public String createBus() {
        // Logic chi tiết sẽ do người khác code
        return "ADMIN: (Stub) Bus created successfully";
    }

    @GetMapping
    public String getAllBuses() {
        // Logic chi tiết sẽ do người khác code
        return "ADMIN: (Stub) Returning all buses";
    }

    @PatchMapping
    public String updateBus() {
        return "ADMIN: (Stub) Bus updated successfully";
    }
}