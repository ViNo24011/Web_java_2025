package com.btl.java_web.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.btl.java_web.dto.request.TripUpdatesRequest;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.entity.Ticket;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.repository.TripRepository;

@Service
public class TripService {
    private final TripRepository tripRepository;
    private final TicketService ticketService;

    public TripService(TripRepository tripRepository,TicketService ticketService) {
        this.tripRepository = tripRepository;
        this.ticketService=ticketService;
    }

    public PaginationResponse<Trip> getAll(int current, int pageSize) {
        try {
            int page = Math.max(0, current - 1);
            Pageable pageable = PageRequest.of(page, pageSize);

            // 1. Lấy dữ liệu từ DB
            Page<Trip> tripPage = tripRepository.findAll(pageable);
            List<Trip> trips = tripPage.getContent();

            // 2. Cập nhật trạng thái (Chỉ xử lý các chuyến trong trang hiện tại)
            LocalDateTime now = LocalDateTime.now();
            List<Trip> tripsToUpdate = new ArrayList<>();

            for (Trip trip : trips) {
                // Gọi hàm kiểm tra, nếu có thay đổi thì thêm vào danh sách cần lưu
                if (checkAndUpdateStatus(trip, now)) {
                    tripsToUpdate.add(trip);
                }
            }

            // 3. Lưu thay đổi xuống DB (nếu có)
            if (!tripsToUpdate.isEmpty()) {
                tripRepository.saveAll(tripsToUpdate);
            }

            // 4. Trả về kết quả
            return new PaginationResponse<>(
                    trips,
                    tripPage.getTotalElements()
            );

        } catch (Exception ex) {
            System.err.println("Lỗi khi lấy danh sách Trip: " + ex.getMessage());
            return null;
        }
    }

    public Map<String, List<Trip>> searchTrips(String from, String to, String startDate, String endDate) {
        Map<String, List<Trip>> response = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();

        List<Trip> startTrips = queryTripsOnDate(from, to, startDate, now);
        response.put("startDateTrips", startTrips);

        if (endDate != null && !endDate.isEmpty()) {
            List<Trip> endTrips = queryTripsOnDate(to, from, endDate, now);
            response.put("endDateTrips", endTrips);
        } else {
            response.put("endDateTrips", new ArrayList<>());
        }

        return response;
    }

    private List<Trip> queryTripsOnDate(String from, String to, String dateStr, LocalDateTime now) {
        // Parse ngày search (00:00:00 của ngày đó)
        LocalDateTime startDayZero = LocalDate.parse(dateStr.substring(0, 10)).atStartOfDay();
        // Cuối ngày (00:00:00 ngày hôm sau)
        LocalDateTime limit = startDayZero.plusDays(1);
        
        // ✅ KIỂM TRA: Nếu toàn bộ ngày search đã qua (so sánh cả ngày tháng năm)
        // Ví dụ: Hôm nay 26/11 15:00, search 25/11 → limit = 26/11 00:00 < now → không trả về
        if (limit.isBefore(now) || limit.isEqual(now)) {
            return new ArrayList<>(); // Ngày đã qua hoàn toàn, không có trip nào
        }
        
        // ✅ XÁC ĐỊNH thời điểm bắt đầu query (so sánh cả ngày và giờ)
        LocalDateTime queryStartTime;
        if (startDayZero.isAfter(now)) {
            // Ngày tương lai: lấy từ 00:00 của ngày đó
            // Ví dụ: Hôm nay 26/11 15:00, search 27/11 → query từ 27/11 00:00
            queryStartTime = startDayZero;
        } else {
            // Ngày hôm nay: chỉ lấy trips từ giờ hiện tại trở đi
            // Ví dụ: Hôm nay 26/11 15:00, search 26/11 → query từ 26/11 15:00
            queryStartTime = now;
        }
        
        // Double check: nếu queryStartTime vượt quá limit (không còn khoảng thời gian nào)
        if (queryStartTime.isAfter(limit) || queryStartTime.isEqual(limit)) {
            return new ArrayList<>();
        }

        // Query trips trong khoảng thời gian hợp lệ
        List<Trip> result = tripRepository.findByStartLocationAndEndLocationAndStartTimeGreaterThanEqualAndStartTimeLessThan(
                from, to, queryStartTime, limit
        );

        // Cập nhật status cho các trip
        List<Trip> tripsToUpdate = new ArrayList<>();
        for (Trip trip : result) {
            if (checkAndUpdateStatus(trip, now)) {
                tripsToUpdate.add(trip);
            }
        }

        if (!tripsToUpdate.isEmpty()) {
            tripRepository.saveAll(tripsToUpdate);
        }

        return result;
    }

    private boolean checkAndUpdateStatus(Trip trip, LocalDateTime now) {
        // ✅ QUAN TRỌNG: Kiểm tra null để tránh NullPointerException
        // Trong database có thể có Trip với start_time = NULL
        LocalDateTime timeStart = trip.getStartTime();
        if (timeStart == null) {
            return false; // Không cập nhật status nếu không có startTime
        }

        String oldStatus = trip.getStatus();
        String newStatus;

        if (timeStart.isBefore(now)) {
            newStatus = "ended";      // Chuyến đã qua (quá khứ)
        } else if (timeStart.isAfter(now)) {
            newStatus = "waiting";    // Chuyến chưa đến (tương lai)
        } else {
            newStatus = "running";    // Chuyến đang chạy (hiện tại)
        }

        if (!newStatus.equals(oldStatus)) {
            trip.setStatus(newStatus);
            return true;
        }
        return false;
    }

    public Trip getTrip(String id) {
        return tripRepository.findById(id).orElse(null);
    }

    public Boolean createTrip(Trip trip) {
        try {

            if (trip.getTripId() == null || trip.getTripId().trim().isEmpty()) {
                trip.setTripId(UUID.randomUUID().toString());
            } else if (tripRepository.existsById(trip.getTripId())) {
                throw new RuntimeException("Trip ID already exists");
            }

            if (trip.getStartTime() == null) {
                throw new RuntimeException("Start time is required");
            }

            if (trip.getEndTime() == null) {
                trip.setEndTime(trip.getStartTime().plusHours(2));
            }

            if (trip.getCoachId() != null && trip.getCoachId() > 0) {
                List<Trip> conflictingTrips = tripRepository.findCoach(
                        trip.getCoachId(),
                        trip.getStartTime(),
                        trip.getEndTime()
                );

                if (!conflictingTrips.isEmpty()) {
                    throw new RuntimeException("Coach is already booked in this time range");
                }
            }

            tripRepository.save(trip);
            return true;
            
        } catch (Exception ex) {
            System.err.println("Lỗi khi tạo chuyến: " + ex.getMessage());
            ex.printStackTrace();
            return false;
        }
    }

    public Trip updateTrip(String id, TripUpdatesRequest updated) {
        Trip t = tripRepository.findById(id).orElseThrow();
        
        // ✅ Update tất cả các fields từ request (nếu không null)
        if (updated.getStartLocation() != null) {
            t.setStartLocation(updated.getStartLocation());
        }
        if (updated.getEndLocation() != null) {
            t.setEndLocation(updated.getEndLocation());
        }
        if (updated.getStartTime() != null) {
            t.setStartTime(updated.getStartTime());
        }
        if (updated.getEndTime() != null) {
            t.setEndTime(updated.getEndTime());
        }
        if (updated.getPrice() != null) {
            t.setPrice(updated.getPrice());
        }
        if (updated.getStatus() != null) {
            t.setStatus(updated.getStatus());
        }
        if (updated.getCoachType() != null) {
            t.setCoachType(updated.getCoachType());
        }
        if (updated.getCoachId() != null) {
            t.setCoachId(updated.getCoachId());
        }
        if (updated.getTotalSeat() != null) {
            t.setTotalSeat(updated.getTotalSeat());
        }
        if (updated.getOrderedSeat() != null) {
            t.setOrderedSeat(updated.getOrderedSeat());
        }
        
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
            for(String id :tripIds){
                List<Ticket> bookings= ticketService.getBookingsByTrip(id);
                for (Ticket booking : bookings){
                    ticketService.cancelBooking(booking.getTicketId(), booking.getAccountId());
                }
            }
            // xoa ticket truoc khi xoa trip
            tripRepository.deleteAllById(tripIds);
            return true;
        }catch (Exception ex) {
            System.err.println("Lỗi khi xóa nhiều Trip: " + ex.getMessage());
            return false;
        }
    }
}
