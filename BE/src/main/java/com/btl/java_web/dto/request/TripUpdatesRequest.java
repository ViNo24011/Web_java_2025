// ...existing code...
package com.btl.java_web.dto.request;

import java.time.LocalDateTime;
import java.util.List;

public class TripUpdatesRequest{
    int price;
    String status;
    LocalDateTime startTime;
    Long coachId;
    String coachType;
    int totalSeat;
    List<String> orderedSeat;


    public int getPrice() {
        return price;
    }
    public List<String> getOrderedSeat(){
        return orderedSeat; 
    }
    public String getStatus() {
        return status;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public Long getCoachId() {
        return coachId;
    }

    public String getCoachType() {
        return coachType;
    }
    public int getTotalSeat(){
        return totalSeat;
    }
}