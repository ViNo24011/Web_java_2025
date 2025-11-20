package com.btl.java_web.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "booking_details")
public class BookingDetail {

    @Id
    @Column(name = "detail_id", nullable = false, updatable = false)
    private String detailId = UUID.randomUUID().toString();

    // Liên kết với Ticket (Mối quan hệ Many-to-One)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    // Loại chuyến (OUTBOUND/RETURN) - Giúp phân biệt chiều đi/về
    @Column(name = "segment_type")
    private String segmentType;

    // Các trường chi tiết chuyến đi

    @Column(name = "trip_id")
    private String tripId; // trip_id

    @Column(name = "coach_id")
    private Integer coachId; // coach_id

    @Column(name = "price")
    private Double price; // price

    @Column(name = "ordered_seat")
    private String orderedSeat; // ordered_seat (Nên lưu dưới dạng String nếu là list ghế)

    @Column(name = "start_time")
    private LocalDateTime startTime; // start_time

    @Column(name = "coach_type")
    private String coachType; // coach_type

    // Constructors và methods khác...

}