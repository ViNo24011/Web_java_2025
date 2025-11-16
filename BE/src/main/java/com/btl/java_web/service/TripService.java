package com.btl.java_web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.btl.java_web.dto.request.TripUpdatesRequest;
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

    public String createTrip(Trip trip) {
        if (getTrip(trip.getTripId())==null){
            tripRepository.save(trip);
            return "TRIP SAVED";
        }
        else return "TRIP EXISTEN";
    }

    public Trip updateTrip(String id, TripUpdatesRequest updated) {
        Trip t = tripRepository.findById(id).orElseThrow();
        t.setCost(updated.getCost());
        t.setStatus(updated.getStatus());
        t.setStartTime(updated.getStartTime());
        t.setCoachId(updated.getCoachId());
        t.setCoachType(updated.getCoachType());
        t.setTotalSeat(updated.getTotalSeat());
        return tripRepository.save(t);
    }

    public String deleteTrip(String id) {
        if(getTrip(id)!=null){
        tripRepository.deleteById(id);
        return "TRIP DELETED";}
        else return "NO TRIP FOUND";
    }
}
