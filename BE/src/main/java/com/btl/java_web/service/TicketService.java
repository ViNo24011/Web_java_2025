package com.btl.java_web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.btl.java_web.entity.Ticket;
import com.btl.java_web.repository.TicketRepository;

@Service
public class TicketService {
    private final TicketRepository repo;

    public TicketService(TicketRepository repo) { this.repo = repo; }

    public Ticket create(Ticket t) { return repo.save(t); }

    public Ticket update(String id, Ticket t) {
        t.setTicketId(id);
        return repo.save(t);
    }

    public void delete(String id) { repo.deleteById(id); }

    public Optional<Ticket> findById(String id) { return repo.findById(id); }

    public List<Ticket> findAll() { return repo.findAll(); }
}