package com.btl.java_web.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VehicleResponse {
    @JsonProperty("coach_id")
    private Long coachId;

    @JsonProperty("coach_name")
    private String coachName;

    @JsonProperty("coach_type")
    private String coachType;

    @JsonProperty("total_seat")
    private int totalSeat;
    private String status;
}