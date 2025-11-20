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
    Account currentUser = getCurrentUser();

    // 1. Validate Outbound (Chiều đi bắt buộc phải có)
    if (req.getOutbound() == null || req.getOutbound().getTripId() == null) {
        return ResponseEntity.badRequest().body("Thông tin chuyến đi (Outbound) là bắt buộc");
    }

    // 2. Xác định Account ID
    String accountId = (currentUser != null) ? currentUser.getAccount_id() : 
                       ((req.getAccountId() != null) ? req.getAccountId() : "GUEST");

    // ==========================================
    // 3. TẠO VÉ CHIỀU ĐI (Lấy từ req.getOutbound())
    // ==========================================
    Ticket t1 = new Ticket();
    t1.setAccountId(accountId);
    t1.setName(req.getName());
    t1.setPhone(req.getPhone());
    t1.setAddress(req.getAddress());
    t1.setTicketType(req.getTicketType());
    t1.setStartLocation(req.getStartLocation());
    t1.setEndLocation(req.getEndLocation());
    t1.setPaymentStatus("pending");

    // Lấy dữ liệu từ object outbound
    BookingRequest.TripInput out = req.getOutbound();
    t1.setTripId(out.getTripId());
    t1.setCoachId(out.getCoachId());
    t1.setPrice(out.getPrice());
    
    // List -> String
    if (out.getOrderedSeat() != null && !out.getOrderedSeat().isEmpty()) {
        t1.setOrderedSeat(String.join(",", out.getOrderedSeat()));
    } else {
        t1.setOrderedSeat("");
    }

    Ticket savedOutbound = ticketService.create(t1);
    
    // Tạo response ban đầu
    BookingResponse response = ticketService.ticketToBookingResponse(savedOutbound);

    // ==========================================
    // 4. TẠO VÉ CHIỀU VỀ (Lấy từ req.getReturnTrip())
    // ==========================================
    if (req.getReturnTrip() != null && req.getReturnTrip().getTripId() != null) {
        Ticket t2 = new Ticket();
        t2.setAccountId(accountId);
        t2.setName(req.getName());
        t2.setPhone(req.getPhone());
        t2.setAddress(req.getAddress());
        t2.setTicketType(req.getTicketType());
        t2.setPaymentStatus("pending");
        
        // Đảo ngược địa điểm
        t2.setStartLocation(req.getEndLocation());
        t2.setEndLocation(req.getStartLocation());

        // Lấy dữ liệu từ object returnTrip
        BookingRequest.TripInput ret = req.getReturnTrip();
        t2.setTripId(ret.getTripId());
        t2.setCoachId(ret.getCoachId());
        t2.setPrice(ret.getPrice());

        // List -> String
        if (ret.getOrderedSeat() != null && !ret.getOrderedSeat().isEmpty()) {
            t2.setOrderedSeat(String.join(",", ret.getOrderedSeat()));
        } else {
            t2.setOrderedSeat("");
        }

        Ticket savedReturn = ticketService.create(t2);
        
        // Gộp vào response
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
