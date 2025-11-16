package com.btl.java_web.dto.response;

import lombok.Data;

@Data
public class VehicleResponse {
    private Long coachId;
    private String coachName;
    private String coachType;
    private int totalSeat;
    private String status;
}