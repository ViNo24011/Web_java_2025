package com.btl.java_web.repository;

import com.btl.java_web.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
	List<Ticket> findByAccountIdOrderByCreatedTimeDesc(String accountId);

	List<Ticket> findByTripId(String tripId);

	Optional<Ticket> findByTicketIdAndAccountId(String ticketId, String accountId);
}
