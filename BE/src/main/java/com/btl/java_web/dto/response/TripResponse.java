package com.btl.java_web.dto.response;

import java.util.List;

import com.btl.java_web.entity.Trip;


public class TripResponse {
    List<Trip> goToTrip;
    List<Trip> backToTrip;
    public TripResponse(List<Trip>goToTrip,List<Trip> backToTrip){
        this.goToTrip=goToTrip;
        this.backToTrip=backToTrip;
    }
}