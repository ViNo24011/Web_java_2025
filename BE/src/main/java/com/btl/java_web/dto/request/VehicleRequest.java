package com.btl.java_web.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequest {
    @JsonProperty("coach_name")
    private String coachName;

    @JsonProperty("coach_type")
    private String coachType;

    @JsonProperty("total_seat")
    private int totalSeat;

    private String status;
    
}
