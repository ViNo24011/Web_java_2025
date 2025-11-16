package com.btl.java_web.controller;

import com.btl.java_web.dto.request.DeleteSelectedRequest;
import com.btl.java_web.dto.request.VehicleRequest;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.dto.response.VehicleResponse;
import com.btl.java_web.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles") // Đã được bảo vệ bởi SecurityConfig
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/create")
    public ResponseEntity<?> createVehicle(@RequestBody VehicleRequest vehicleRequest) {
        if(vehicleService.create(vehicleRequest)) {
            return ResponseEntity.ok().body("Tạo xe thành công!");
        }
        return ResponseEntity.badRequest().body("Tạo xe thất bại!");
    }

    @GetMapping
    public ResponseEntity<?> getAllVehicle(@RequestParam(defaultValue = "1") int current, @RequestParam(defaultValue =
            "5") int pageSize) {
        PaginationResponse<VehicleResponse> response = vehicleService.getAll(current, pageSize);
        if(response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> updateVehicle(@RequestBody VehicleRequest request, @PathVariable String id) {
        if(vehicleService.update(id, request)) {
            return ResponseEntity.ok().body("Sửa thông tin xe thành công!");
        }
        return ResponseEntity.badRequest().body("Sửa thông tin xe thất bại!");
    }

    @DeleteMapping("/delete-selected")
    public ResponseEntity<?> deleteSelected(@RequestBody DeleteSelectedRequest request) {
        if(vehicleService.deleteMany(request.getIds())) {
            return ResponseEntity.ok().body("Xoá xe thành công!");
        }
        return ResponseEntity.badRequest().body("Xoá xe thất bại!");
    }
}