package com.btl.java_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btl.java_web.entity.Trip;
public interface TripRepository extends JpaRepository<Trip, String> {
    List<Trip> findByStartLocationAndEndLocation(String start, String end);
}
