// ...existing code...
package com.btl.java_web.dto.request;

import java.time.LocalDateTime;

public class TripUpdatesRequest{
    int cost;
    String status;
    LocalDateTime startTime;
    String coachId;
    String coachType;

    public int getCost() {
        return cost;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public String getCoachId() {
        return coachId;
    }

    public String getCoachType() {
        return coachType;
    }
}