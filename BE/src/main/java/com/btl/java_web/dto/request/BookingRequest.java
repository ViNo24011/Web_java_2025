package com.btl.java_web.dto.request;

public class BookingRequest {
    private String accountId;
    private String tripId;
    private String coachId;
    private String name;
    private String phone;
    private String address;
    private Double price;
    private String ticketType;
    private String startLocation;
    private String endLocation;
    private String orderedSeat; // single seat identifier

    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }

    public String getTripId() { return tripId; }
    public void setTripId(String tripId) { this.tripId = tripId; }

    public String getCoachId() { return coachId; }
    public void setCoachId(String coachId) { this.coachId = coachId; }

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

    public String getStartLocation() { return startLocation; }
    public void setStartLocation(String startLocation) { this.startLocation = startLocation; }

    public String getEndLocation() { return endLocation; }
    public void setEndLocation(String endLocation) { this.endLocation = endLocation; }

    public String getOrderedSeat() { return orderedSeat; }
    public void setOrderedSeat(String orderedSeat) { this.orderedSeat = orderedSeat; }
}
