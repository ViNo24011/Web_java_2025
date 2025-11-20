package com.btl.java_web.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List; // Nhớ import List

@Data
public class BookingRequest {
    // ... Các trường khác giữ nguyên ...

    @JsonProperty("account_id")
    private String accountId;
    
    private String name;
    private String phone;
    private String address;
    private String note;
    
    @JsonProperty("ticket_type")
    private String ticketType;

    @JsonProperty("start_location")
    private String startLocation;
    @JsonProperty("end_location")
    private String endLocation;

    // --- CHIỀU ĐI ---
    @JsonProperty("trip_id")
    private String tripId;
    
    @JsonProperty("coach_id")
    private String coachId;
    
    private Double price;
    
    @JsonProperty("ordered_seat")
    private List<String> orderedSeat;

    // --- CHIỀU VỀ ---
    @JsonProperty("return_trip_id")
    private String returnTripId;

    @JsonProperty("return_coach_id")
    private String returnCoachId;
    
    @JsonProperty("return_price")
    private Double returnPrice;

    @JsonProperty("return_ordered_seat")
    private List<String> returnOrderedSeat;
}