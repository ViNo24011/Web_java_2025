package com.btl.java_web.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trip")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    @Id
    private String tripId; // mã chuyến

    private String startLocation;
    private String endLocation;

    private LocalDateTime startTime;
    private int timeTravel;
    private int price;
    private String status; //ended, waiting, cancelled

    private String coachType; //join từ coach
    private Long coachId;
    private int totalSeat;

    @ElementCollection
    private List<String> orderedSeat; // danh sách ghế đã đặt
}