package com.btl.java_web.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @JsonProperty("account_id")
    private String accountId;
    
    @JsonProperty("trip_id")
    private String tripId;
    
    @JsonProperty("coach_id")
    private String coachId;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("phone")
    private String phone;
    
    @JsonProperty("address")
    private String address;
    
    @JsonProperty("price")
    private Double price;
    
    @JsonProperty("ticket_type")
    private String ticketType;
    
    @JsonProperty("start_location")
    private String startLocation;
    
    @JsonProperty("end_location")
    private String endLocation;
    
    @JsonProperty("ordered_seat")
    private String orderedSeat; // single seat identifier
}
