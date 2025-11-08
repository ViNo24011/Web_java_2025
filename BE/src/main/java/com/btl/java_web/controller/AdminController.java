package com.btl.java_web.controller;

import com.btl.java_web.entity.Account;
import com.btl.java_web.entity.Coach;
import com.btl.java_web.entity.Schedule;
import com.btl.java_web.entity.Ticket;
import com.btl.java_web.service.AccountService;
import com.btl.java_web.service.CoachService;
import com.btl.java_web.service.ScheduleService;
import com.btl.java_web.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AccountService accountService;
    private final CoachService coachService;
    private final ScheduleService scheduleService;
    private final TicketService ticketService;

    public AdminController(AccountService accountService,
                           CoachService coachService,
                           ScheduleService scheduleService,
                           TicketService ticketService) {
        this.accountService = accountService;
        this.coachService = coachService;
        this.scheduleService = scheduleService;
        this.ticketService = ticketService;
    }

    // Accounts
    @PostMapping("/accounts")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) { return ResponseEntity.ok(accountService.createAccount(account)); }

    @PatchMapping("/accounts/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id, @RequestBody Account account) { return ResponseEntity.ok(accountService.update(id, account)); }

    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String id) { accountService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> listAccounts() { return ResponseEntity.ok(accountService.findAll()); }

    // Coaches
    @PostMapping("/vehicles")
    public ResponseEntity<Coach> createCoach(@RequestBody Coach c) { return ResponseEntity.ok(coachService.create(c)); }

    @PatchMapping("/vehicles/{id}")
    public ResponseEntity<Coach> updateCoach(@PathVariable String id, @RequestBody Coach c) { return ResponseEntity.ok(coachService.update(id, c)); }

    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable String id) { coachService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/vehicles")
    public ResponseEntity<List<Coach>> listCoaches() { return ResponseEntity.ok(coachService.findAll()); }

    // Schedules
    @PostMapping("/schedules")
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule s) { return ResponseEntity.ok(scheduleService.create(s)); }

    @PatchMapping("/schedules/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable String id, @RequestBody Schedule s) { return ResponseEntity.ok(scheduleService.update(id, s)); }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable String id) { scheduleService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/schedules")
    public ResponseEntity<List<Schedule>> listSchedules() { return ResponseEntity.ok(scheduleService.findAll()); }

    // Tickets
    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket t) { return ResponseEntity.ok(ticketService.create(t)); }

    @PatchMapping("/tickets/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable String id, @RequestBody Ticket t) { return ResponseEntity.ok(ticketService.update(id, t)); }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable String id) { ticketService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> listTickets() { return ResponseEntity.ok(ticketService.findAll()); }
}