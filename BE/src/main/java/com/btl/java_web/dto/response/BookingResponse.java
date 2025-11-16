package com.btl.java_web.dto.response;

import java.time.LocalDateTime;

public class BookingResponse {
    private String ticketId;
    private String accountId;
    private String name;
    private String phone;
    private String address;
    private Double price;
    private String ticketType;
    private String paymentStatus;
    private LocalDateTime createdTime;
    private String orderedSeat;
    
    // Trip info
    private String tripId;
    private String coachId;
    private String startLocation;
    private String endLocation;
    private LocalDateTime tripStartTime;
    private int tripCost;
    private String tripStatus;
    private String coachType;
    private int totalSeat;

    public BookingResponse() {}

    public BookingResponse(String ticketId, String accountId, String name, String phone, String address,
                          Double price, String ticketType, String paymentStatus, LocalDateTime createdTime,
                          String orderedSeat, String tripId, String coachId, String startLocation, 
                          String endLocation, LocalDateTime tripStartTime, int tripCost, String tripStatus,
                          String coachType, int totalSeat) {
        this.ticketId = ticketId;
        this.accountId = accountId;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.price = price;
        this.ticketType = ticketType;
        this.paymentStatus = paymentStatus;
        this.createdTime = createdTime;
        this.orderedSeat = orderedSeat;
        this.tripId = tripId;
        this.coachId = coachId;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.tripStartTime = tripStartTime;
        this.tripCost = tripCost;
        this.tripStatus = tripStatus;
        this.coachType = coachType;
        this.totalSeat = totalSeat;
    }

    // Getters and Setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getCreatedTime() { return createdTime; }
    public void setCreatedTime(LocalDateTime createdTime) { this.createdTime = createdTime; }

    public String getOrderedSeat() { return orderedSeat; }
    public void setOrderedSeat(String orderedSeat) { this.orderedSeat = orderedSeat; }

    public String getTripId() { return tripId; }
    public void setTripId(String tripId) { this.tripId = tripId; }

    public String getCoachId() { return coachId; }
    public void setCoachId(String coachId) { this.coachId = coachId; }

    public String getStartLocation() { return startLocation; }
    public void setStartLocation(String startLocation) { this.startLocation = startLocation; }

    public String getEndLocation() { return endLocation; }
    public void setEndLocation(String endLocation) { this.endLocation = endLocation; }

    public LocalDateTime getTripStartTime() { return tripStartTime; }
    public void setTripStartTime(LocalDateTime tripStartTime) { this.tripStartTime = tripStartTime; }

    public int getTripCost() { return tripCost; }
    public void setTripCost(int tripCost) { this.tripCost = tripCost; }

    public String getTripStatus() { return tripStatus; }
    public void setTripStatus(String tripStatus) { this.tripStatus = tripStatus; }

    public String getCoachType() { return coachType; }
    public void setCoachType(String coachType) { this.coachType = coachType; }

    public int getTotalSeat() { return totalSeat; }
    public void setTotalSeat(int totalSeat) { this.totalSeat = totalSeat; }
}
