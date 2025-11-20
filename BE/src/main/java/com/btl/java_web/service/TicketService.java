package com.btl.java_web.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.btl.java_web.dto.request.BookingRequest;
import com.btl.java_web.dto.response.BookingResponse;
import com.btl.java_web.dto.response.BookingResponse.Outbound;
import com.btl.java_web.dto.response.BookingResponse.ReturnTrip;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.entity.BookingDetail;
import com.btl.java_web.entity.Ticket;
import com.btl.java_web.entity.Trip;
import com.btl.java_web.repository.BookingDetailRepository;
import com.btl.java_web.repository.TicketRepository;
import com.btl.java_web.repository.TripRepository;
import java.util.Arrays;

@Service
public class TicketService {
    private final TicketRepository repo;
    private final TripRepository tripRepo;
    private final BookingDetailRepository detailRepo;

    public TicketService(TicketRepository repo, TripRepository tripRepo, BookingDetailRepository detailRepo) {
        this.repo = repo;
        this.tripRepo = tripRepo;
        this.detailRepo = detailRepo;
    }

    // Basic CRUD
    public Ticket create(Ticket t) {
        // persist ticket
        Ticket saved = repo.save(t);
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
        // ✅ Query qua BookingDetail thay vì Ticket
        List<BookingDetail> details = detailRepo.findByTripId(tripId);
        return details.stream()
                .map(BookingDetail::getTicket)
                .distinct()
                .collect(Collectors.toList());
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

        // ✅ Remove seats from trip via BookingDetail
        List<BookingDetail> details = detailRepo.findByTicketTicketId(ticketId);
        for (BookingDetail detail : details) {
            if (detail.getTripId() != null && detail.getOrderedSeat() != null) {
                Trip trip = tripRepo.findById(detail.getTripId()).orElse(null);
                if (trip != null && trip.getOrderedSeat() != null) {
                    List<String> currentSeats = new ArrayList<>(trip.getOrderedSeat());
                    // Remove all seats from this booking
                    String[] seatsToRemove = detail.getOrderedSeat().split(",");
                    for (String seat : seatsToRemove) {
                        currentSeats.remove(seat.trim());
                    }
                    trip.setOrderedSeat(currentSeats);
                    tripRepo.save(trip);
                }
            }
        }

        return Optional.of(saved);
    }

    /**
     * Helper method: Convert Ticket to BookingResponse with BookingDetails
     */
    public BookingResponse ticketToBookingResponse(Ticket ticket) {
        BookingResponse response = new BookingResponse();

        // Thông tin chung từ Ticket
        response.setTicketId(ticket.getTicketId());
        response.setAccountId(ticket.getAccountId());
        response.setName(ticket.getName());
        response.setPhone(ticket.getPhone());
        response.setAddress(ticket.getAddress());
        response.setNote(ticket.getNote());
        response.setTicketType(ticket.getTicketType());
        response.setTotalPrice(ticket.getTotalPrice());
        response.setPaymentStatus(ticket.getPaymentStatus());
        response.setCreatedTime(ticket.getCreatedTime());
        response.setStartLocation(ticket.getStartLocation());
        response.setEndLocation(ticket.getEndLocation());

        // ✅ Lấy BookingDetails
        List<BookingDetail> details = detailRepo.findByTicketTicketId(ticket.getTicketId());
        
        for (BookingDetail detail : details) {
            if ("OUTBOUND".equals(detail.getSegmentType())) {
                Outbound outbound = new Outbound();
                outbound.setTripId(detail.getTripId());
                outbound.setStartTime(detail.getStartTime());
                outbound.setCoachType(detail.getCoachType());
                outbound.setCoachId(detail.getCoachId());
                outbound.setPrice(detail.getPrice());
                
                if (detail.getOrderedSeat() != null && !detail.getOrderedSeat().isEmpty()) {
                    outbound.setOrderedSeat(Arrays.asList(detail.getOrderedSeat().split(",")));
                }
                
                response.setOutbound(outbound);
                
            } else if ("RETURN".equals(detail.getSegmentType())) {
                ReturnTrip returnTrip = new ReturnTrip();
                returnTrip.setTripId(detail.getTripId());
                returnTrip.setStartTime(detail.getStartTime());
                returnTrip.setCoachType(detail.getCoachType());
                returnTrip.setCoachId(detail.getCoachId());
                returnTrip.setPrice(detail.getPrice());
                
                if (detail.getOrderedSeat() != null && !detail.getOrderedSeat().isEmpty()) {
                    returnTrip.setOrderedSeat(Arrays.asList(detail.getOrderedSeat().split(",")));
                }
                
                response.setReturnTrip(returnTrip);
            }
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
        List<BookingDetail> details = detailRepo.findByTripId(tripId);
        return details.stream()
                .map(BookingDetail::getTicket)
                .distinct()
                .map(this::ticketToBookingResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get single booking with trip details
     */
    public Optional<BookingResponse> getBookingWithDetails(String ticketId) {
        return repo.findById(ticketId).map(this::ticketToBookingResponse);
    }

    /**
     * ✅ METHOD MỚI: Tạo Ticket + BookingDetails từ BookingRequest
     */
    public BookingResponse createBookingWithDetails(String accountId, BookingRequest req) {
        // 1. Tạo Ticket (thông tin chung)
        Ticket ticket = new Ticket();
        ticket.setAccountId(accountId);
        ticket.setName(req.getName());
        ticket.setPhone(req.getPhone());
        ticket.setAddress(req.getAddress());
        ticket.setNote(req.getNote());
        ticket.setTicketType(req.getTicketType());
        ticket.setStartLocation(req.getStartLocation());
        ticket.setEndLocation(req.getEndLocation());
        ticket.setPaymentStatus("pending");
        ticket.setCreatedTime(LocalDateTime.now());
        
        // Tính tổng giá
        Double totalPrice = req.getOutbound().getPrice();
        if (req.getReturnTrip() != null && req.getReturnTrip().getPrice() != null) {
            totalPrice += req.getReturnTrip().getPrice();
        }
        ticket.setTotalPrice(totalPrice);
        
        // Save ticket
        Ticket savedTicket = repo.save(ticket);
        
        // 2. Tạo BookingDetail cho Outbound (chiều đi)
        BookingDetail outboundDetail = createBookingDetail(savedTicket, req.getOutbound(), "OUTBOUND");
        detailRepo.save(outboundDetail);
        
        // Update trip's ordered seats
        updateTripSeats(req.getOutbound().getTripId(), req.getOutbound().getOrderedSeat());
        
        // 3. Tạo BookingDetail cho ReturnTrip (chiều về) nếu có
        BookingDetail returnDetail = null;
        if (req.getReturnTrip() != null && req.getReturnTrip().getTripId() != null) {
            returnDetail = createBookingDetail(savedTicket, req.getReturnTrip(), "RETURN");
            detailRepo.save(returnDetail);
            updateTripSeats(req.getReturnTrip().getTripId(), req.getReturnTrip().getOrderedSeat());
        }
        
        // 4. Map sang BookingResponse
        return mapToBookingResponse(savedTicket, outboundDetail, returnDetail);
    }
    
    /**
     * Helper: Tạo BookingDetail từ TripInput
     */
    private BookingDetail createBookingDetail(Ticket ticket, BookingRequest.TripInput tripInput, String segmentType) {
        BookingDetail detail = new BookingDetail();
        detail.setTicket(ticket);
        detail.setSegmentType(segmentType);
        detail.setTripId(tripInput.getTripId());
        
        // ✅ Parse coachId từ String sang Integer
        try {
            if (tripInput.getCoachId() != null && !tripInput.getCoachId().trim().isEmpty()) {
                detail.setCoachId(Integer.parseInt(tripInput.getCoachId()));
            }
        } catch (NumberFormatException e) {
            detail.setCoachId(null);
        }
        
        detail.setPrice(tripInput.getPrice());
        detail.setCoachType(tripInput.getCoachType());
        
        // Parse startTime nếu có
        if (tripInput.getStartTime() != null) {
            try {
                detail.setStartTime(LocalDateTime.parse(tripInput.getStartTime()));
            } catch (Exception e) {
                // Nếu parse lỗi, lấy từ Trip
                Trip trip = tripRepo.findById(tripInput.getTripId()).orElse(null);
                if (trip != null) {
                    detail.setStartTime(trip.getStartTime());
                }
            }
        }
        
        // Convert List<String> -> String
        if (tripInput.getOrderedSeat() != null && !tripInput.getOrderedSeat().isEmpty()) {
            detail.setOrderedSeat(String.join(",", tripInput.getOrderedSeat()));
        }
        
        return detail;
    }
    
    /**
     * Helper: Update ordered seats của Trip
     */
    private void updateTripSeats(String tripId, List<String> newSeats) {
        if (tripId == null || newSeats == null || newSeats.isEmpty()) return;
        
        Trip trip = tripRepo.findById(tripId).orElse(null);
        if (trip != null) {
            List<String> currentSeats = trip.getOrderedSeat();
            if (currentSeats == null) {
                currentSeats = new ArrayList<>();
            }
            currentSeats.addAll(newSeats);
            trip.setOrderedSeat(currentSeats);
            tripRepo.save(trip);
        }
    }
    
    /**
     * Helper: Map Ticket + BookingDetails sang BookingResponse
     */
    private BookingResponse mapToBookingResponse(Ticket ticket, BookingDetail outbound, BookingDetail returnTrip) {
        BookingResponse response = new BookingResponse();
        
        // Thông tin chung
        response.setTicketId(ticket.getTicketId());
        response.setAccountId(ticket.getAccountId());
        response.setName(ticket.getName());
        response.setPhone(ticket.getPhone());
        response.setAddress(ticket.getAddress());
        response.setNote(ticket.getNote());
        response.setTicketType(ticket.getTicketType());
        response.setTotalPrice(ticket.getTotalPrice());
        response.setPaymentStatus(ticket.getPaymentStatus());
        response.setCreatedTime(ticket.getCreatedTime());
        response.setStartLocation(ticket.getStartLocation());
        response.setEndLocation(ticket.getEndLocation());
        
        // Outbound details
        if (outbound != null) {
            Outbound outboundObj = new Outbound();
            outboundObj.setTripId(outbound.getTripId());
            outboundObj.setStartTime(outbound.getStartTime());
            outboundObj.setCoachType(outbound.getCoachType());
            outboundObj.setCoachId(outbound.getCoachId());
            outboundObj.setPrice(outbound.getPrice());
            
            // Convert String -> List
            if (outbound.getOrderedSeat() != null && !outbound.getOrderedSeat().isEmpty()) {
                outboundObj.setOrderedSeat(Arrays.asList(outbound.getOrderedSeat().split(",")));
            }
            
            response.setOutbound(outboundObj);
        }
        
        // ReturnTrip details
        if (returnTrip != null) {
            ReturnTrip returnObj = new ReturnTrip();
            returnObj.setTripId(returnTrip.getTripId());
            returnObj.setStartTime(returnTrip.getStartTime());
            returnObj.setCoachType(returnTrip.getCoachType());
            returnObj.setCoachId(returnTrip.getCoachId());
            returnObj.setPrice(returnTrip.getPrice());
            
            // Convert String -> List
            if (returnTrip.getOrderedSeat() != null && !returnTrip.getOrderedSeat().isEmpty()) {
                returnObj.setOrderedSeat(Arrays.asList(returnTrip.getOrderedSeat().split(",")));
            }
            
            response.setReturnTrip(returnObj);
        }
        
        return response;
    }
}