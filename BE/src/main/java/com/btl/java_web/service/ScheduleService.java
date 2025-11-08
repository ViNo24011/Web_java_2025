package com.btl.java_web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.btl.java_web.entity.Schedule;
import com.btl.java_web.repository.ScheduleRepository;

@Service
public class ScheduleService {
    private final ScheduleRepository repo;

    public ScheduleService(ScheduleRepository repo) { this.repo = repo; }

    public Schedule create(Schedule s) { return repo.save(s); }

    public Schedule update(String id, Schedule s) {
        s.setTripId(id);
        return repo.save(s);
    }

    public void delete(String id) { repo.deleteById(id); }

    public Optional<Schedule> findById(String id) { return repo.findById(id); }

    public List<Schedule> findAll() { return repo.findAll(); }
}