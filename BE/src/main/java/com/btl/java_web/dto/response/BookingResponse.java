package com.btl.java_web.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
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
    private Long totalPrice;

    @JsonProperty("payment_status")
    private String paymentStatus;

    @JsonProperty("created_time")
    private LocalDateTime createdTime;

    private String note;

    @JsonProperty("start_location")
    private String startLocation;

    @JsonProperty("end_location")
    private String endLocation;

    private Outbound outbound;

    @JsonProperty("returnTrip")
    private Outbound returnTrip;

    public static class Outbound {
        @JsonProperty("price")
        private Long price;

        @JsonProperty("trip_id")
        private String tripId;

        @JsonProperty("start_time")
        private LocalDateTime startTime;

        @JsonProperty("coach_type")
        private String coachType;

        @JsonProperty("coach_id")
        private String coachId;

        @JsonProperty("ordered_seat")
        private List<String> orderedSeat;

        public Long getPrice() { return price; }
        public void setPrice(Long price) { this.price = price; }
        public String getTripId() { return tripId; }
        public void setTripId(String tripId) { this.tripId = tripId; }
        public LocalDateTime getStartTime() { return startTime; }
        public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
        public String getCoachType() { return coachType; }
        public void setCoachType(String coachType) { this.coachType = coachType; }
        public String getCoachId() { return coachId; }
        public void setCoachId(String coachId) { this.coachId = coachId; }
        public List<String> getOrderedSeat() { return orderedSeat; }
        public void setOrderedSeat(List<String> orderedSeat) { this.orderedSeat = orderedSeat; }
    }

    // Getters and setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }
    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }
    public Long getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Long totalPrice) { this.totalPrice = totalPrice; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public LocalDateTime getCreatedTime() { return createdTime; }
    public void setCreatedTime(LocalDateTime createdTime) { this.createdTime = createdTime; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public String getStartLocation() { return startLocation; }
    public void setStartLocation(String startLocation) { this.startLocation = startLocation; }
    public String getEndLocation() { return endLocation; }
    public void setEndLocation(String endLocation) { this.endLocation = endLocation; }
    public Outbound getOutbound() { return outbound; }
    public void setOutbound(Outbound outbound) { this.outbound = outbound; }
    public Outbound getReturnTrip() { return returnTrip; }
    public void setReturnTrip(Outbound returnTrip) { this.returnTrip = returnTrip; }
}
