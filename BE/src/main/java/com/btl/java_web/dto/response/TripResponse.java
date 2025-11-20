package com.btl.java_web.dto.response;

import java.util.List;

import com.btl.java_web.entity.Trip;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripResponse {
    List<Trip> goToTrip;
    List<Trip> backToTrip;
}