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
public class TripRequest {
    @JsonProperty("coach_id")
    String coachId;

    @JsonProperty("coach_type")
    String coachType;

    @JsonProperty("end_location")
    String endLocation;

    @JsonProperty("start_location")
    String startLocation;

    @JsonProperty("ordered_seat")
    List<String> orderedSeat;

    @JsonProperty("price")
    int cost;

    @JsonProperty("start_time")
    LocalDateTime startTime;

    String status;

    @JsonProperty("total_seat")
    int totalSeat;
}
