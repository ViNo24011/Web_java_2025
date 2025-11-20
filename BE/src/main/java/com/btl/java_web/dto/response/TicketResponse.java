package com.btl.java_web.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TicketResponse {
    
    @JsonProperty("ticket_id")
    private String ticketId;
    
    @JsonProperty("account_id")
    private String accountId;
    
    private String name;
    private String phone;
    private String address;
    
    @JsonProperty("ticket_type")
    private String ticketType;
    
    @JsonProperty("total_price")
    private Double totalPrice;
    
    @JsonProperty("payment_status")
    private String paymentStatus;
    
    @JsonProperty("created_time")
    private LocalDateTime createdTime;
    
    private String note;
    
    @JsonProperty("start_location")
    private String startLocation;
    
    @JsonProperty("end_location")
    private String endLocation;
    
    // Nested objects
    private TripDetail outbound;
    
    @JsonProperty("returnTrip")
    private TripDetail returnTrip;
    
    // Inner class for trip details
    @Data
    public static class TripDetail {
        @JsonProperty("trip_id")
        private String tripId;
        
        @JsonProperty("start_time")
        private LocalDateTime startTime;
        
        @JsonProperty("coach_type")
        private String coachType;
        
        @JsonProperty("coach_id")
        private Integer coachId;
        
        @JsonProperty("ordered_seat")
        private List<String> orderedSeat;
        
        private Double price;
    }
}