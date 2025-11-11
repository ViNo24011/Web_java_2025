package com.btl.java_web.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
}