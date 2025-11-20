package com.btl.java_web.controller;

import com.btl.java_web.dto.request.TripRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.btl.java_web.dto.request.DeleteSelectedRequest;
import com.btl.java_web.dto.request.TripUpdatesRequest;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.service.TripService;

@RestController
@RequestMapping("admin/trips")
//@PreAuthorize("hasRole('ADMIN')") // Tất cả endpoints yêu cầu ADMIN
public class TripAdminController {
    private final TripService tripService;

    public TripAdminController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTrip(@RequestParam(defaultValue = "1") int current, @RequestParam(defaultValue =
            "5") int pageSize) {
        PaginationResponse<Trip> response = tripService.getAll(current, pageSize);
        if(response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Trip trip) {
        try {
            if(tripService.createTrip(trip)) {
                return ResponseEntity.ok().body("Tạo chuyến thành công!");
            }
            return ResponseEntity.badRequest().body("Lỗi khi tạo chuyến. Vui lòng kiểm tra dữ liệu và thử lại.");
        } catch (Exception e) {
            // Trả về error message chi tiết để frontend biết lỗi gì
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PatchMapping("/edit/{id}")
    public Trip update(@PathVariable String id, @RequestBody TripUpdatesRequest trip) {
        return tripService.updateTrip(id, trip);
    }

   @DeleteMapping("/delete-selected")
    public ResponseEntity<?> deleteSelected(@RequestBody DeleteSelectedRequest request) {
        if(tripService.deleteMany(request.getIds())) {
            return ResponseEntity.ok().body("Xoá chuyến thành công!");
        }
        return ResponseEntity.badRequest().body("Xoá chuyến thất bại!");
    }
}