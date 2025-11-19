package com.btl.java_web.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.btl.java_web.dto.request.TripUpdatesRequest;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.repository.TripRepository;

@Service
public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public PaginationResponse<Trip> getAll(int current, int pageSize) {
        try {
            int page = Math.max(0, current - 1);
            Pageable pageable = PageRequest.of(page, pageSize);

            Page<Trip> tripPage = tripRepository.findAll(pageable);

            PaginationResponse<Trip> response = new PaginationResponse<>(
                    tripPage.getContent(),
                    tripPage.getTotalElements()
            );
            return response;
        } catch (Exception ex) {
            System.err.println("Lỗi khi lấy danh sách Trip: " + ex.getMessage());
            return null;
        }
    }

    public List<Trip> searchTrips(String start, String end,String date) {
        LocalDateTime startTime=LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE_TIME).atStartOfDay();
        LocalDateTime limit = startTime.toLocalDate().plusDays(1).atStartOfDay();
        return tripRepository.findByStartLocationAndEndLocationAndStartTimeGreaterThanEqualAndStartTimeLessThan(start, end,(startTime.isAfter(LocalDateTime.now()))?startTime:LocalDateTime.now(),limit);
    }
    public Trip getTrip(String id) {
        return tripRepository.findById(id).orElse(null);
    }

    public String createTrip(Trip trip) {
        if (getTrip(trip.getTripId())==null){
            List<Trip> searchCoach=tripRepository.findCoach(trip.getCoachId(),trip.getStartTime(),trip.getTimeTravel());
            if(searchCoach!=null && searchCoach.isEmpty())
            {tripRepository.save(trip);
                return "TRIP SAVED";
            }   else return "COACH OVERLAPPED";
        }
        else return "TRIP EXISTEN";
    }

    public Trip updateTrip(String id, TripUpdatesRequest updated) {
        Trip t = tripRepository.findById(id).orElseThrow();
        t.setPrice(updated.getPrice());
        t.setStatus(updated.getStatus());
        t.setStartTime(updated.getStartTime());
        t.setCoachId(updated.getCoachId());
        t.setCoachType(updated.getCoachType());
        t.setTotalSeat(updated.getTotalSeat());
        return tripRepository.save(t);
    }

    // public String deleteTrip(String id) {
    //     if(getTrip(id)!=null){
    //     tripRepository.deleteById(id);
    //     return "TRIP DELETED";}
    //     else return "NO TRIP FOUND";
    // }
    public boolean deleteMany(List<String> ids) {
        try {
            List<String> tripIds = ids.stream()
                    .map(id -> id == null ? null : id.trim())
                    .filter(id -> id != null && !id.isEmpty()) // Loại bỏ các ID không hợp lệ
                    .collect(Collectors.toList());

            if (tripIds.isEmpty()) {
                System.err.println("Không có ID Trip hợp lệ nào để xóa.");
                return false;
            }
            tripRepository.deleteAllById(tripIds);
            return true;
        }catch (Exception ex) {
            System.err.println("Lỗi khi xóa nhiều Trip: " + ex.getMessage());
            return false;
        }
    }
}
