package com.btl.java_web.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripUpdatesRequest {
    
    @JsonProperty("start_location")
    private String startLocation;
    
    @JsonProperty("end_location")
    private String endLocation;
    
    @JsonProperty("start_time")
    private LocalDateTime startTime;
    
    @JsonProperty("end_time")
    private LocalDateTime endTime;
    
    @JsonProperty("price")
    private Integer price;
    
    private String status;
    
    @JsonProperty("coach_type")
    private String coachType;
    
    @JsonProperty("coach_id")
    private Long coachId;
    
    @JsonProperty("total_seat")
    private Integer totalSeat;
    
    @JsonProperty("ordered_seat")
    private List<String> orderedSeat;
}