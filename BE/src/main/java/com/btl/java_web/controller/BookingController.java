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
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req) {
        // 1. Thử lấy thông tin người dùng hiện tại (nếu có token)
        Account currentUser = getCurrentUser();

        // 2. Validate cơ bản (Tên và SĐT là bắt buộc với bất kỳ ai)
        if (req.getTripId() == null || req.getTripId().isBlank()) {
            return ResponseEntity.badRequest().body("tripId is required");
        }
        if (req.getName() == null || req.getName().isBlank()) {
            return ResponseEntity.badRequest().body("Họ tên hành khách là bắt buộc");
        }
        if (req.getPhone() == null || req.getPhone().isBlank()) {
            return ResponseEntity.badRequest().body("Số điện thoại là bắt buộc");
        }

        Ticket t = new Ticket();
        // 3. Xử lý Account ID (QUAN TRỌNG)
        if (currentUser != null) {
            // Trường hợp 1: Đã đăng nhập -> Gán vé này cho tài khoản đó
            t.setAccountId(currentUser.getAccount_id());
        } else {
            // Trường hợp 2: Khách vãng lai (Guest)
            // Nếu request có gửi accountId (ví dụ frontend tự sinh ID tạm) thì dùng,
            // nếu không thì để null hoặc gán chuỗi "GUEST" để dễ quản lý.
            String guestId = (req.getAccountId() != null) ? req.getAccountId() : "GUEST";
            t.setAccountId(guestId);
        }
        // 4. Các thông tin khác lấy từ Request gửi lên
        t.setTripId(req.getTripId());
        t.setCoachId(req.getCoachId());
        t.setName(req.getName());
        t.setPhone(req.getPhone());
        t.setAddress(req.getAddress());
        t.setPrice(req.getPrice());
        t.setTicketType(req.getTicketType());
        t.setStartLocation(req.getStartLocation());
        t.setEndLocation(req.getEndLocation());
        t.setOrderedSeat(req.getOrderedSeat());
        t.setPaymentStatus("pending");

        Ticket saved = ticketService.create(t);
        BookingResponse response = ticketService.getBookingWithDetails(saved.getTicketId()).orElse(null);
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
