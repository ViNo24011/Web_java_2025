package com.btl.java_web.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.btl.java_web.entity.Trip;
public interface TripRepository extends JpaRepository<Trip, String> {
    List<Trip> findByStartLocationAndEndLocation(String start, String end);
    @Query("select u from trip u where u.coach_id=?1 and(u.start_time+u.time_travel<?2 or u.start_time>?2 +?3)")
    List<Trip> findCoach(Long coachId,LocalDateTime startTime,Integer timeTravel);
    List<Trip> findByStartLocationAndEndLocationAndStartTimeGreaterThanEqualAndStartTimeLessThan(String startLocation, String endLocation, LocalDateTime startTime,LocalDateTime limit);
}
