package com.btl.java_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor // Cần thêm NoArgsConstructor nếu bạn sử dụng JPA
@AllArgsConstructor
@Table(name = "tickets")
public class Ticket {

    @Id
    @Column(name = "ticket_id", nullable = false, updatable = false)
    private String ticketId = UUID.randomUUID().toString(); // Tự động tạo UUID

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "note") // Thêm trường note
    private String note;

    @Column(name = "total_price") // Đổi price thành total_price
    private Double totalPrice;

    @Column(name = "ticket_type")
    private String ticketType;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "created_time")
    private LocalDateTime createdTime = LocalDateTime.now(); // Tự động tạo thời gian

    @Column(name = "start_location")
    private String startLocation;

    @Column(name = "end_location")
    private String endLocation;


    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingDetail> bookingDetails;

}