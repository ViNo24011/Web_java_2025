package com.btl.java_web.controller;


import com.btl.java_web.dto.request.AccountCreationRequest;
import com.btl.java_web.dto.request.AccountUpdateRequest;
import com.btl.java_web.dto.request.DeleteSelectedRequest;
import com.btl.java_web.dto.response.PaginationResponse;
import com.btl.java_web.dto.response.VehicleResponse;
import com.btl.java_web.entity.Account;
import com.btl.java_web.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping
    ResponseEntity<?> createAccount(@RequestBody AccountCreationRequest request){
        if(!accountService.createAccount(request)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body("Create account successfully");
    }

    @GetMapping
    ResponseEntity<?> getAccounts(@RequestParam(defaultValue = "1") int current, @RequestParam(defaultValue =
            "5") int pageSize){
        PaginationResponse<?> response = accountService.getAccounts(current, pageSize);
        if(response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping ("/{account_id}")
    ResponseEntity<?> getAccount(@PathVariable String account_id){
        Account response = accountService.getAccount(account_id);
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping ("/{account_id}")
    ResponseEntity<?> updateAccount(@PathVariable String account_id, @RequestBody AccountUpdateRequest request){
        System.out.println("request account update" + request);
        if(!accountService.updateAccount(account_id, request)){
            return ResponseEntity.badRequest().build();
        };
        return ResponseEntity.ok("Update account successfully");
    }

    @DeleteMapping ("/delete-selected")
    ResponseEntity<?> deleteAccount (@RequestBody DeleteSelectedRequest request){
        accountService.deleteAccount(request.getIds());
        return ResponseEntity.ok("Delete account successfully");
    }
}
