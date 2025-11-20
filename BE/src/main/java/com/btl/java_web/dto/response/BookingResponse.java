package com.btl.java_web.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BookingResponse {
    @JsonProperty("account_id")
    private String accountId;

    private String name;
    private String address;
    private String phone;

    @JsonProperty("ticket_type")
    private String ticketType;

    @JsonProperty("total_price")
    private long totalPrice;

    @JsonProperty("payment_status")
    private String paymentStatus;

    @JsonProperty("created_time")
    private LocalDateTime createdTime;

    private String note = ""; // Mặc định rỗng nếu null

    @JsonProperty("start_location")
    private String startLocation;

    @JsonProperty("end_location")
    private String endLocation;

    // Nested Object: Chiều đi
    private TripDetail outbound;

    // Nested Object: Chiều về (Luôn hiện, có thể rỗng)
    private TripDetail returnTrip;

    @Data
    public static class TripDetail {
        @JsonProperty("trip_id")
        private String tripId = "";

        private long price = 0;

        @JsonProperty("start_time")
        private Object startTime = ""; // Dùng Object để trả về LocalDateTime hoặc ""

        @JsonProperty("coach_type")
        private String coachType = "";

        @JsonProperty("coach_id")
        private Object coachId = ""; // Dùng Object để trả về Long hoặc ""

        @JsonProperty("ordered_seat")
        private List<String> orderedSeat = new ArrayList<>();
    }
}