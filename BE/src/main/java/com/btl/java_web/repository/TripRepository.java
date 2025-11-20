package com.btl.java_web.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.btl.java_web.entity.Trip;
public interface TripRepository extends JpaRepository<Trip, String> {
    List<Trip> findByStartLocationAndEndLocation(String start, String end);
    @Query("select u from Trip u where u.coachId=?1 and(u.endTime>?2 and u.startTime<?3)")
    List<Trip> findCoach(Long coachId,LocalDateTime startTime,LocalDateTime endTime);
    List<Trip> findByStartLocationAndEndLocationAndStartTimeGreaterThanEqualAndStartTimeLessThan(String startLocation, String endLocation, LocalDateTime startTime,LocalDateTime limit);
}
