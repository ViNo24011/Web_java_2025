package com.btl.java_web.entity;

import com.fasterxml.jackson.databind.annotation.EnumNaming;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "coaches")
public class Coach {
    @Id
    @Column(name = "coach_id", nullable = false, updatable = false)
    private String coachId;

    @Enumerated(EnumType.STRING)
    @Column(name = "coach_type")
    private coachType coach_type;

    public enum coachType {
        MINIBUS,
        LIMOUSINE_CABIN,
        LIMOUSINE
    }

    @Column(name = "total_seat")
    private Integer totalSeat;

    @Column(name="price")
    private Integer price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    public enum Status {
        INACTIVE,
        MAINTENANCE,
        RUNNING
    } // inactive, maintenance, running

    public Coach() {}

    public String getCoachId() { return coachId; }
    public void setCoachId(String coachId) { this.coachId = coachId; }

    public String getCoachType() { return coachType; }
    public void setCoachType(String coachType) { this.coachType = coachType; }

    public Integer getTotalSeat() { return totalSeat; }
    public void setTotalSeat(Integer totalSeat) { this.totalSeat = totalSeat; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}