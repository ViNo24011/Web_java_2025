package com.btl.java_web.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class BookingRequest {
    // --- THÔNG TIN KHÁCH HÀNG (Dùng chung) ---
    @JsonProperty("account_id")
    private String accountId;
    
    private String name;
    private String phone;
    private String address;
    private String note;
    
    @JsonProperty("ticket_type")
    private String ticketType; // "oneWay" hoặc "roundTrip"

    @JsonProperty("start_location")
    private String startLocation;
    
    @JsonProperty("end_location")
    private String endLocation;

    // --- OBJECT CHIỀU ĐI (Bắt buộc) ---
    @JsonProperty("outbound")
    private TripInput outbound;

    // --- OBJECT CHIỀU VỀ (Tùy chọn - có thể null) ---
    @JsonProperty("returnTrip")
    private TripInput returnTrip;

    // --- CLASS CON ĐỂ HỨNG DỮ LIỆU TỪNG CHIỀU ---
    @Data
    public static class TripInput {
        @JsonProperty("trip_id")
        private String tripId;
        
        @JsonProperty("coach_id")
        private String coachId;
        
        private Double price;
        
        @JsonProperty("ordered_seat")
        private List<String> orderedSeat; // Nhận mảng ["A1", "A2"]

        @JsonProperty("start_time")
        private String startTime;

        @JsonProperty("coach_type")
        private String coachType;
    }
}