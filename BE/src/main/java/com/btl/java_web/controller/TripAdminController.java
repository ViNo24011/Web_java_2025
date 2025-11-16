package com.btl.java_web.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.dto.request.TripUpdatesRequest;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.service.TripService;

@RestController
@RequestMapping("/trips")
@PreAuthorize("hasRole('ADMIN')") // Tất cả endpoints yêu cầu ADMIN
public class TripAdminController {
    private final TripService tripService;

    public TripAdminController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<Trip> getAll() {
        return tripService.getAllTrips();
    }

    @PostMapping("/create")
    public String create(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }

    @PutMapping("/edit/{id}")
    public Trip update(@PathVariable String id, @RequestBody TripUpdatesRequest trip) {
        return tripService.updateTrip(id, trip);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        return tripService.deleteTrip(id);
    }
}