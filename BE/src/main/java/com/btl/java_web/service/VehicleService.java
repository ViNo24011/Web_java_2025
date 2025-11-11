package com.btl.java_web.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btl.java_web.entity.Vehicle;
import com.btl.java_web.repository.VehicleRepository;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAll() {
        List<Vehicle> list = vehicleRepository.findAll();
        return list.stream().collect(Collectors.toList());
    }
}
