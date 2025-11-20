package com.btl.java_web.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BookingResponse {
    @JsonProperty("ticket_id")
    private String ticketId;
    
    @JsonProperty("account_id")
    private String accountId;

    private String name;
    private String address;
    private String phone;

    @JsonProperty("ticket_type")
    private String ticketType;

    @JsonProperty("total_price")
    private Double totalPrice;

    @JsonProperty("payment_status")
    private String paymentStatus;

    @JsonProperty("created_time")
    private LocalDateTime createdTime;

    private String note; // Để null nếu không có

    @JsonProperty("start_location")
    private String startLocation;

    @JsonProperty("end_location")
    private String endLocation;

    // Nested Object: Chiều đi (required)
    private Outbound outbound;

    // Nested Object: Chiều về (optional - có thể null)
    @JsonProperty("returnTrip")
    private ReturnTrip returnTrip;

    @Data
    public static class Outbound {
        @JsonProperty("trip_id")
        private String tripId;

        private Double price;

        @JsonProperty("start_time")
        private LocalDateTime startTime;

        @JsonProperty("coach_type")
        private String coachType;

        @JsonProperty("coach_id")
        private Integer coachId;

        @JsonProperty("ordered_seat")
        private List<String> orderedSeat;
    }
    
    @Data
    public static class ReturnTrip {
        @JsonProperty("trip_id")
        private String tripId;

        private Double price;

        @JsonProperty("start_time")
        private LocalDateTime startTime;

        @JsonProperty("coach_type")
        private String coachType;

        @JsonProperty("coach_id")
        private Integer coachId;

        @JsonProperty("ordered_seat")
        private List<String> orderedSeat;
    }
}