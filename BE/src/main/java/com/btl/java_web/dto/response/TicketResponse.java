package com.btl.java_web.dto.response;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class TicketResponse {

    private String ticketId;


    private String accountId;


    private String name;


    private String phone;


    private String address;


    private Double price;


    private String ticketType;


    private String paymentStatus;


    private LocalDateTime createdTime;


    private String tripId;


    private String coachId;

    private String startLocation;

    private String endLocation;
    private String orderedSeat;
}