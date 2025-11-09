package com.btl.java_web.service;
import java.util.List;
import java.util.stream.Collectors;

import com.btl.java_web.entity.Vehicle;
import com.btl.java_web.dto.request.VehicleRequest;
import com.btl.java_web.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<VehicleRequest> getAll() {
        List<Vehicle> list = vehicleRepository.findAll();
        return list.stream().collect(Collectors.toList());
    }
}
