package com.btl.java_web.repository;

import com.btl.java_web.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
}
