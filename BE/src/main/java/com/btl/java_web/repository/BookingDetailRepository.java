package com.btl.java_web.repository;

import com.btl.java_web.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, String> {
    List<BookingDetail> findByTicketTicketId(String ticketId);
    List<BookingDetail> findByTripId(String tripId);
}

