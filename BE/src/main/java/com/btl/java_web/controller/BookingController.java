package com.btl.java_web.controller;

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
     * Create a new booking for the current user
     */
    @PostMapping("")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req) {
        Account currentUser = getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: User not found");
        }

        Ticket t = new Ticket();
        t.setAccountId(currentUser.getAccount_id()); // Use authenticated user's ID
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
        t.setPaymentStatus("PAID");

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
    @DeleteMapping("/{ticketId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> cancelBooking(@PathVariable String ticketId) {
        Account currentUser = getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: User not found");
        }

        // Check if ticket exists and belongs to current user (unless ADMIN)
        Ticket ticket = ticketService.findById(ticketId).orElse(null);
        if (ticket == null) {
            return ResponseEntity.status(404).body("Ticket not found");
        }

        // Allow if owner or ADMIN
        if (!ticket.getAccountId().equals(currentUser.getAccount_id()) && 
            !currentUser.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Forbidden: You can only cancel your own bookings");
        }

        var result = ticketService.cancelBooking(ticketId, ticket.getAccountId());
        if (result.isEmpty()) {
            return ResponseEntity.status(400).body("Failed to cancel booking");
        }

        BookingResponse response = ticketService.getBookingWithDetails(ticketId).orElse(null);
        return ResponseEntity.ok(response);
    }
}
