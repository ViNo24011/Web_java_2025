package com.btl.java_web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.java_web.dto.response.BookingResponse;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.service.TicketService;

@RestController
@RequestMapping("/admin/bookings")
public class AdminBookingController {
    private final TicketService ticketService;

    public AdminBookingController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * GET /admin/bookings
     * Get all bookings with trip details (Admin only)
     */
    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    // public ResponseEntity<List<BookingResponse>> allBookings() {
    //     List<BookingResponse> bookings = ticketService.getAllBookingsWithDetails();
    //     return ResponseEntity.ok(bookings);
    // }
    public ResponseEntity<?> getAllBookings(@RequestParam(defaultValue = "1") int current, @RequestParam(defaultValue =
            "5") int pageSize) {
        PaginationResponse<BookingResponse> response = ticketService.getAllBookingsWithDetails(current, pageSize);
        if(response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * GET /admin/bookings/trip/{tripId}/passengers
     * Get all passengers (bookings) for a specific trip with details (Admin only)
     */
    @GetMapping("/trip/{tripId}/passengers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> passengersByTrip(@PathVariable String tripId) {
        List<BookingResponse> passengers = ticketService.getPassengersByTripWithDetails(tripId);
        return ResponseEntity.ok(passengers);
    }
}
