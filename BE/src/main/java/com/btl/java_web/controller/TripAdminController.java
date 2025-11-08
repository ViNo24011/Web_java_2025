package com.btl.java_web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.entity.Trip;
import com.btl.java_web.service.TripService;

@RestController
@RequestMapping("/trips")
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
    public Trip create(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }

    @PutMapping("/edit/{id}")
    public Trip update(@PathVariable String id, @RequestBody Trip trip) {
        return tripService.updateTrip(id, trip);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        tripService.deleteTrip(id);
    }
}
