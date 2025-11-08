package com.btl.java_web.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.entity.Trip;
import com.btl.java_web.service.TripService;

@RestController
@RequestMapping("/trips")
public class TripUserController {
    private final TripService tripService;

    public TripUserController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/search")
    public List<Trip> search(@RequestParam String from, @RequestParam String to) {
        return tripService.searchTrips(from, to);
    }

    @GetMapping("/{id}")
    public Trip getTripDetail(@PathVariable String id) {
        return tripService.getTrip(id);
    }
}
