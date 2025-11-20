package com.btl.java_web.controller;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.entity.Trip;
import com.btl.java_web.service.TripService;

import com.btl.java_web.dto.response.TripResponse;

@RestController
@RequestMapping("/trips")
public class TripUserController {
    private final TripService tripService;

    public TripUserController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String start_location, @RequestParam String end_location, @RequestParam String start_date, @RequestParam(required = false) String end_date) {
        Map<String, List<Trip>> response = tripService.searchTrips(start_location, end_location,start_date, end_date);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public Trip getTripDetail(@PathVariable String id) {
        return tripService.getTrip(id);
    }
}
