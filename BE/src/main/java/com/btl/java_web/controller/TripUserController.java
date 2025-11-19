package com.btl.java_web.controller;
import java.util.List;

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
    public List<Trip> search(@RequestParam String from, @RequestParam String to,@RequestParam String date) {
        return tripService.searchTrips(from, to,date);
    }
    public TripResponse search(@RequestParam String from, @RequestParam String to,@RequestParam String startDate,@RequestParam String endDate){
        return new TripResponse(tripService.searchTrips(from,to,startDate),tripService.searchTrips(from,to,endDate));
    }

    @GetMapping("/{id}")
    public Trip getTripDetail(@PathVariable String id) {
        return tripService.getTrip(id);
    }
}
