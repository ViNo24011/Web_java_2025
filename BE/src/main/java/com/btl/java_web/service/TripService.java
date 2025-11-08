package com.btl.java_web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.btl.java_web.entity.Trip;
import com.btl.java_web.repository.TripRepository;

@Service
public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public List<Trip> searchTrips(String start, String end) {
        return tripRepository.findByStartLocationAndEndLocation(start, end);
    }

    public Trip getTrip(String id) {
        return tripRepository.findById(id).orElse(null);
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Trip updateTrip(String id, Trip updated) {
        Trip t = tripRepository.findById(id).orElseThrow();
        t.setCost(updated.getCost());
        t.setStatus(updated.getStatus());
        t.setStartTime(updated.getStartTime());
        t.setCoachId(updated.getCoachId());
        t.setCoachType(updated.getCoachType());
        return tripRepository.save(t);
    }

    public void deleteTrip(String id) {
        tripRepository.deleteById(id);
    }
}
