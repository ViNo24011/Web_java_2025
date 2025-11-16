package com.btl.java_web.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coach_id")
    private Long coachId;

    @Column(name="coach_name", nullable = false)
    private String coachName;

    @Column(name = "coach_type", nullable = false)
    private String coachType;

    @Column(name="total_seat", nullable = false)
    private int totalSeat;

    @Column(name="status", nullable = false)
    private String status;
}
