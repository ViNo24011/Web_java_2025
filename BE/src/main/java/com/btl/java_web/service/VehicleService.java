package com.btl.java_web.service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.dto.response.VehicleResponse;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.entity.Vehicle;
import com.btl.java_web.dto.request.VehicleRequest;
import com.btl.java_web.repository.TripRepository;
import com.btl.java_web.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private TripRepository tripRepository;

    private VehicleResponse convertToResponse(Vehicle vehicle) {
        VehicleResponse response = new VehicleResponse();
        if (vehicle.getCoachId() != null) {
            response.setCoachId(vehicle.getCoachId());
        }

        response.setCoachName(vehicle.getCoachName());
        response.setCoachType(vehicle.getCoachType());
        response.setTotalSeat(vehicle.getTotalSeat());
        response.setStatus(vehicle.getStatus());

        return response;
    }

    public boolean create(VehicleRequest request) {
        try {
            Vehicle vehicle = new Vehicle();

            vehicle.setCoachName(request.getCoachName());
            vehicle.setCoachType(request.getCoachType());
            vehicle.setTotalSeat(request.getTotalSeat());
            vehicle.setStatus(request.getStatus());

            vehicleRepository.save(vehicle);
            return true;
        } catch (Exception ex) {
            System.err.println("Lỗi khi tạo Vehicle: " + ex.getMessage());
            return false;
        }
    };

    public PaginationResponse<VehicleResponse> getAll(int current, int pageSize) {
        try {
            int page = Math.max(0, current - 1);
            Pageable pageable = PageRequest.of(page, pageSize);

            Page<Vehicle> vehiclePage = vehicleRepository.findAll(pageable);
            List<Vehicle> vehicles = vehiclePage.getContent();
            
            // ✅ Cập nhật status dựa trên lịch trình
            LocalDateTime now = LocalDateTime.now();
            List<Vehicle> vehiclesToUpdate = new ArrayList<>();
            
            for (Vehicle vehicle : vehicles) {
                if (updateVehicleStatusBasedOnTrips(vehicle, now)) {
                    vehiclesToUpdate.add(vehicle);
                }
            }
            
            // Lưu các thay đổi vào DB
            if (!vehiclesToUpdate.isEmpty()) {
                vehicleRepository.saveAll(vehiclesToUpdate);
            }

            Page<VehicleResponse> list = vehiclePage.map(i -> convertToResponse(i));
            PaginationResponse<VehicleResponse> response = new PaginationResponse<>(
                    list.getContent(),
                    list.getTotalElements()
            );
            return response;
        } catch (Exception ex) {
            System.err.println("Lỗi khi lấy danh sách vehicles: " + ex.getMessage());
            return null;
        }
    }

    public boolean update(String id, VehicleRequest request) {
        try {
            Long vehicleId = Long.parseLong(id);
            Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
            if(vehicle.isPresent()) {
                Vehicle vehicleToUpdate = vehicle.get();

                vehicleToUpdate.setCoachName(request.getCoachName());
                vehicleToUpdate.setCoachType(request.getCoachType());
                vehicleToUpdate.setTotalSeat(request.getTotalSeat());
                vehicleToUpdate.setStatus(request.getStatus());

                vehicleRepository.save(vehicleToUpdate);
                return true;
            } else {
                System.err.println("Không tìm thấy Vehicle với ID: " + vehicleId);
                return false;
            }

        } catch (Exception ex) {
            System.err.println("Lỗi khi cập nhật thông tin Vehicle" + ex.getMessage());
            return false;
        }
    }

    public boolean deleteMany(List<String> ids) {
        try {
            List<Long> vehicleIds = ids.stream().map(id -> {
                        try {
                            return Long.parseLong(id);
                        } catch (NumberFormatException e) {
                            System.err.println("ID không hợp lệ: " + id);
                            return null; // Bỏ qua ID không hợp lệ
                        }
                    })
                    .filter(id -> id != null) // Loại bỏ các ID không hợp lệ
                    .collect(Collectors.toList());

            if (vehicleIds.isEmpty()) {
                System.err.println("Không có ID Vehicle hợp lệ nào để xóa.");
                return false;
            }

            vehicleRepository.deleteAllById(vehicleIds);
            return true;
        }catch (Exception ex) {
            System.err.println("Lỗi khi xóa nhiều Vehicle: " + ex.getMessage());
            return false;
        }
    }
    
    /**
     * Helper method: Cập nhật status của vehicle dựa trên lịch trình
     * @param vehicle Vehicle cần check
     * @param now Thời gian hiện tại
     * @return
     */
    private boolean updateVehicleStatusBasedOnTrips(Vehicle vehicle, LocalDateTime now) {
        if (vehicle.getCoachId() == null) {
            return false;
        }
        
        try {
            LocalDateTime threeHoursAgo = now.minusHours(3);
            
            List<Trip> activeTrips = tripRepository.findActiveTripsForCoach(
                vehicle.getCoachId(), 
                now, 
                threeHoursAgo
            );
            
            // Filter thêm để chỉ lấy trips trong khoảng 3 giờ từ startTime
            activeTrips = activeTrips.stream()
                    .filter(trip -> {
                        LocalDateTime tripStart = trip.getStartTime();
                        LocalDateTime tripEndWindow = tripStart.plusHours(3);
                        return now.isBefore(tripEndWindow);
                    })
                    .collect(Collectors.toList());
            
            String oldStatus = vehicle.getStatus();
            String newStatus;
            
            if (!activeTrips.isEmpty()) {
                // Có lịch trình đang chạy → status = "running"
                newStatus = "running";
            }  else {
                newStatus = oldStatus; // Giữ nguyên status khác
                
            }
            
            // Chỉ update nếu status thay đổi
            if (!newStatus.equals(oldStatus)) {
                vehicle.setStatus(newStatus);
                return true; // Có thay đổi, cần save
            }
            
            return false;
            
        } catch (Exception e) {
            System.err.println("Lỗi khi check status cho vehicle " + vehicle.getCoachId() + ": " + e.getMessage());
            return false;
        }
    }
}
