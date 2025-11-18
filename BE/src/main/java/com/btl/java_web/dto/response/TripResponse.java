package com.btl.java_web.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.ElementCollection;
import lombok.Data;

@Data
public class TripResponse {
    private String tripId; // mã chuyến

    private String startLocation;
    private String endLocation;

    private LocalDateTime startTime;
    private int cost;
    private String status; //ended, waiting, cancelled

    private String coachType; //join từ coach
    private String coachId;
    private int totalSeat;

    @ElementCollection
    private List<String> orderedSeat; // danh sách ghế đã đặt
}