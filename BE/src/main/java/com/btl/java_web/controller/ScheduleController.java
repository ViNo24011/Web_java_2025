package com.btl.java_web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedules") // Đã được bảo vệ bởi SecurityConfig
public class ScheduleController {

    @PostMapping
    public String createSchedule() {
        // Logic chi tiết sẽ do người khác code
        return "ADMIN: (Stub) Schedule created successfully";
    }

    @GetMapping
    public String getAllSchedules() {
        // Logic chi tiết sẽ do người khác code
        return "ADMIN: (Stub) Returning all schedules";
    }
}