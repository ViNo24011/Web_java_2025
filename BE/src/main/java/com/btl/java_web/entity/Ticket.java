package com.btl.java_web.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@Entity
@AllArgsConstructor
@Table(name = "tickets")
public class Ticket {
    @Id
    @Column(name = "ticket_id", nullable = false, updatable = false)
    private String ticketId;

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "price")
    private Double price;

    @Column(name = "ticket_type")
    private String ticketType;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "trip_id")
    private String tripId;

    @Column(name = "coach_id")
    private String coachId;

    @Column(name = "start_location")
    private String startLocation;

    @Column(name = "end_location")
    private String endLocation;

    @Column(name = "ordered_seat")
    private String orderedSeat;

    public Ticket() {
        this.ticketId = UUID.randomUUID().toString();
        this.createdTime = LocalDateTime.now();
    }
}