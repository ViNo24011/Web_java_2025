package com.btl.java_web.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.btl.java_web.dto.response.BookingResponse;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.entity.Ticket;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.repository.TicketRepository;
import com.btl.java_web.repository.TripRepository;

@Service
public class TicketService {
    private final TicketRepository repo;
    private final TripRepository tripRepo;

    public TicketService(TicketRepository repo, TripRepository tripRepo) {
        this.repo = repo;
        this.tripRepo = tripRepo;
    }

    // Basic CRUD
    public Ticket create(Ticket t) {
        // persist ticket
        Ticket saved = repo.save(t);
        // update trip's ordered seats if possible
        if (t.getTripId() != null && t.getOrderedSeat() != null) {
            Trip trip = tripRepo.findById(t.getTripId()).orElse(null);
            if (trip != null) {
                List<String> seats = trip.getOrderedSeat();
                if (seats == null) seats = new ArrayList<>();
                // avoid duplicates
                if (!seats.contains(t.getOrderedSeat())) {
                    // t.getOrderedSeat() is a single String representing seat(s)
                    seats.add(t.getOrderedSeat());
                }
                trip.setOrderedSeat(seats);
                tripRepo.save(trip);
            }
        }
        return saved;
    }

    public Ticket update(String id, Ticket t) {
        t.setTicketId(id);
        return repo.save(t);
    }

    public void delete(String id) { repo.deleteById(id); }

    public Optional<Ticket> findById(String id) { return repo.findById(id); }

    public List<Ticket> findAll() { return repo.findAll(); }

    // Booking-specific methods
    public List<Ticket> getBookingsByAccount(String accountId) {
        return repo.findByAccountIdOrderByCreatedTimeDesc(accountId);
    }

    public List<Ticket> getBookingsByTrip(String tripId) {
        return repo.findByTripId(tripId);
    }

    public List<Ticket> getAllBookings() { return repo.findAll(); }

    public Optional<Ticket> findByTicketIdAndAccountId(String ticketId, String accountId) {
        return repo.findByTicketIdAndAccountId(ticketId, accountId);
    }

    /**
     * Cancel a booking: mark paymentStatus as CANCELLED and remove booked seat from trip.
     * Returns the updated ticket or empty if not found / not allowed.
     */
    public Optional<Ticket> cancelBooking(String ticketId, String accountId) {
        Optional<Ticket> ot = repo.findById(ticketId);
        if (ot.isEmpty()) return Optional.empty();
        Ticket t = ot.get();
        // if accountId provided, ensure it matches
        if (accountId != null && !accountId.equals(t.getAccountId())) return Optional.empty();

        t.setPaymentStatus("CANCELLED");
        Ticket saved = repo.save(t);

        // remove seat from trip orderedSeat
        if (t.getTripId() != null && t.getOrderedSeat() != null) {
            Trip trip = tripRepo.findById(t.getTripId()).orElse(null);
            if (trip != null && trip.getOrderedSeat() != null) {
                List<String> seats = new ArrayList<>(trip.getOrderedSeat());
                seats.remove(t.getOrderedSeat());
                trip.setOrderedSeat(seats);
                tripRepo.save(trip);
            }
        }

        return Optional.of(saved);
    }

    /**
     * Helper method: Convert Ticket to BookingResponse with Trip info
     */
    private BookingResponse ticketToBookingResponse(Ticket ticket) {
        Trip trip = tripRepo.findById(ticket.getTripId()).orElse(null);
        
        BookingResponse response = new BookingResponse();
        response.setTicketId(ticket.getTicketId());
        response.setAccountId(ticket.getAccountId());
        response.setName(ticket.getName());
        response.setPhone(ticket.getPhone());
        response.setAddress(ticket.getAddress());
        response.setPrice(ticket.getPrice());
        response.setTicketType(ticket.getTicketType());
        response.setPaymentStatus(ticket.getPaymentStatus());
        response.setCreatedTime(ticket.getCreatedTime());
        response.setOrderedSeat(ticket.getOrderedSeat());
        response.setTripId(ticket.getTripId());
        response.setCoachId(ticket.getCoachId());
        response.setStartLocation(ticket.getStartLocation());
        response.setEndLocation(ticket.getEndLocation());
        
        if (trip != null) {
            response.setTripStartTime(trip.getStartTime());
            response.setTripCost(trip.getCost());
            response.setTripStatus(trip.getStatus());
            response.setCoachType(trip.getCoachType());
            response.setTotalSeat(trip.getTotalSeat());
        }
        
        return response;
    }

    /**
     * Get booking history with trip details for a specific account
     */
    public List<BookingResponse> getBookingsByAccountWithDetails(String accountId) {
        return repo.findByAccountIdOrderByCreatedTimeDesc(accountId)
                .stream()
                .map(this::ticketToBookingResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all bookings with trip details
     */
    // public List<BookingResponse> getAllBookingsWithDetails() {
    //     return repo.findAll()
    //             .stream()
    //             .map(this::ticketToBookingResponse)
    //             .collect(Collectors.toList());
    // }
    public PaginationResponse<BookingResponse> getAllBookingsWithDetails(int current, int pageSize) {
        try {
            int page = Math.max(0, current - 1);
            Pageable pageable = PageRequest.of(page, pageSize);

            Page<Ticket> ticketPage = repo.findAll(pageable);

            Page<BookingResponse> list = ticketPage.map(i -> ticketToBookingResponse(i));
            PaginationResponse<BookingResponse> response = new PaginationResponse<>(
                    list.getContent(),
                    list.getTotalElements()
            );
            return response;
        } catch (Exception ex) {
            System.err.println("Lỗi khi lấy danh sách Ticket: " + ex.getMessage());
            return null;
        }
    }

    /**
     * Get bookings for a specific trip with passenger details
     */
    public List<BookingResponse> getPassengersByTripWithDetails(String tripId) {
        return repo.findByTripId(tripId)
                .stream()
                .map(this::ticketToBookingResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get single booking with trip details
     */
    public Optional<BookingResponse> getBookingWithDetails(String ticketId) {
        return repo.findById(ticketId).map(this::ticketToBookingResponse);
    }
}