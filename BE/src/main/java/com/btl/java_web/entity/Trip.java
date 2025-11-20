package com.btl.java_web.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Column;
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
    @JsonProperty("trip_id")
    private String tripId; // mã chuyến

    @Column(name = "start_location")
    @JsonProperty("start_location")
    private String startLocation;
    
    @Column(name = "end_location")
    @JsonProperty("end_location")
    private String endLocation;

    @Column(name = "start_time")
    @JsonProperty("start_time")
    private LocalDateTime startTime;
    
    @Column(name = "end_time")
    @JsonProperty("end_time")
    private LocalDateTime endTime;

    @Column(name = "price")
    @JsonProperty("price")
    private int price;
    
    @Column(name = "status")
    private String status; //ended,waiting,running

    @Column(name = "coach_type")
    @JsonProperty("coach_type")
    private String coachType; //join từ coach
    
    @Column(name = "coach_id")
    @JsonProperty("coach_id")
    private Long coachId;
    
    @Column(name = "total_seat")
    @JsonProperty("total_seat")
    private int totalSeat;

    @ElementCollection
    @JsonProperty("ordered_seat")
    private List<String> orderedSeat; // danh sách ghế đã đặt
}