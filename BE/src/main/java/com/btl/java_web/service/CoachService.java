package com.btl.java_web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.btl.java_web.entity.Coach;
import com.btl.java_web.repository.CoachRepository;

@Service
public class CoachService {
    private final CoachRepository repo;

    public CoachService(CoachRepository repo) { this.repo = repo; }

    public Coach create(Coach c) { return repo.save(c); }

    public Coach update(String id, Coach c) {
        c.setCoachId(id);
        return repo.save(c);
    }

    public void delete(String id) { repo.deleteById(id); }

    public Optional<Coach> findById(String id) { return repo.findById(id); }

    public List<Coach> findAll() { return repo.findAll(); }
}