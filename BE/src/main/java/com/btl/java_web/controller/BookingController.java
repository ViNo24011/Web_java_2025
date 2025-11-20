package com.btl.java_web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.dto.request.BookingRequest;
import com.btl.java_web.dto.request.DeleteSelectedRequest;
import com.btl.java_web.dto.response.BookingResponse;
import com.btl.java_web.entity.Account;
import com.btl.java_web.entity.Ticket;
import com.btl.java_web.service.TicketService;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final TicketService ticketService;

    public BookingController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * Helper: Get current authenticated user's Account
     */
    private Account getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Account) {
            return (Account) auth.getPrincipal();
        }
        return null;
    }

    /**
     * POST /bookings
     * Cho phép cả User đã đăng nhập và Khách vãng lai đặt vé
     */
    @PostMapping("")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req) {
        // Thử lấy thông tin người dùng hiện tại (nếu có token)
        Account currentUser = getCurrentUser();

        // 1. Validate cơ bản
        if (req.getTripId() == null || req.getTripId().isBlank()) {
            return ResponseEntity.badRequest().body("tripId is required");
        }

        // 2. Xác định Account ID
        String accountId = (currentUser != null) ? currentUser.getAccount_id() : 
                           ((req.getAccountId() != null) ? req.getAccountId() : "GUEST");

        // 3. TẠO VÉ CHIỀU ĐI (Outbound Ticket)
        Ticket t1 = new Ticket();
        t1.setAccountId(accountId);
        t1.setTripId(req.getTripId());
        t1.setCoachId(req.getCoachId());
        t1.setName(req.getName());
        t1.setPhone(req.getPhone());
        t1.setAddress(req.getAddress());
        t1.setPrice(req.getPrice());
        t1.setTicketType(req.getTicketType()); // "oneWay" hoặc "roundTrip"
        t1.setStartLocation(req.getStartLocation());
        t1.setEndLocation(req.getEndLocation());
        if (req.getOrderedSeat() != null && !req.getOrderedSeat().isEmpty()) {
            // Chuyển ["A1", "A2"] thành "A1,A2" để lưu xuống DB
            String seatString = String.join(",", req.getOrderedSeat());
            t1.setOrderedSeat(seatString);
        } else {
            t1.setOrderedSeat("");
        }
        t1.setPaymentStatus("pending");

        Ticket savedOutbound = ticketService.create(t1);
        
        // Tạo response ban đầu từ vé đi
        BookingResponse response = ticketService.ticketToBookingResponse(savedOutbound);

        // 4. TẠO VÉ CHIỀU VỀ (Return Ticket) - Nếu có
        if (req.getReturnTripId() != null && !req.getReturnTripId().isBlank()) {
            Ticket t2 = new Ticket();
            t2.setAccountId(accountId);
            t2.setTripId(req.getReturnTripId());
            t2.setCoachId(req.getReturnCoachId());
            
            // Thông tin cá nhân giống chiều đi
            t2.setName(req.getName());
            t2.setPhone(req.getPhone());
            t2.setAddress(req.getAddress());
            
            t2.setPrice(req.getReturnPrice());
            t2.setTicketType(req.getTicketType());
            
            // Đảo ngược địa điểm cho đúng logic lưu db (hoặc client gửi đúng thì gán thẳng)
            t2.setStartLocation(req.getEndLocation());
            t2.setEndLocation(req.getStartLocation());
            
            // ⚠️ XỬ LÝ LIST -> STRING CHO CHIỀU VỀ
            if (req.getReturnOrderedSeat() != null && !req.getReturnOrderedSeat().isEmpty()) {
                String returnSeatString = String.join(",", req.getReturnOrderedSeat());
                t2.setOrderedSeat(returnSeatString);
            } else {
                t2.setOrderedSeat("");
            }
            t2.setPaymentStatus("pending");

            Ticket savedReturn = ticketService.create(t2);

            // Gộp thông tin vé về vào response
            response = ticketService.addReturnTripToResponse(response, savedReturn);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * GET /bookings/my-history
     * Get booking history for the current user with trip details
     */
    @GetMapping("/my-history")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> myHistory() {
        Account currentUser = getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: User not found");
        }

        List<BookingResponse> bookings = ticketService.getBookingsByAccountWithDetails(currentUser.getAccount_id());
        return ResponseEntity.ok(bookings);
    }

    /**
     * DELETE /bookings/{ticketId}
     * Cancel a booking (only the owner or ADMIN can cancel)
     */
    @DeleteMapping("/delete-selected")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> cancelSelectedBookings(@RequestBody DeleteSelectedRequest req) {
        Account currentUser = getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: User not found");
        }

        List<String> ids = req.getIds();
        List<BookingResponse> cancelledBookings = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (String ticketId : ids) {
            Ticket ticket = ticketService.findById(ticketId).orElse(null);
            if (ticket == null) {
                errors.add("Ticket " + ticketId + " not found");
                continue;
            }

            // Allow if owner or ADMIN
            if (!ticket.getAccountId().equals(currentUser.getAccount_id()) && 
                !currentUser.getRole().equals("ADMIN")) {
                errors.add("Forbidden: You can only cancel your own bookings for " + ticketId);
                continue;
            }

            var result = ticketService.cancelBooking(ticketId, ticket.getAccountId());
            if (result.isEmpty()) {
                errors.add("Failed to cancel booking " + ticketId);
            } else {
                BookingResponse response = ticketService.getBookingWithDetails(ticketId).orElse(null);
                if (response != null) {
                    cancelledBookings.add(response);
                }
            }
        }

        if (!errors.isEmpty()) {
            return ResponseEntity.status(400).body("Errors: " + String.join(", ", errors) + ". Cancelled: " + cancelledBookings.size() + " bookings");
        }

        return ResponseEntity.ok(cancelledBookings);
    }
}
