// ...existing code...
package com.btl.java_web.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripUpdatesRequest{
    int price;
    String status;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Long coachId;
    String coachType;
    int totalSeat;
    List<String> orderedSeat;
}