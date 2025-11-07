package com.btl.java_web.controller;


import com.btl.java_web.dto.request.AccountCreationRequest;
import com.btl.java_web.dto.request.AccountUpdateRequest;
import com.btl.java_web.entity.Account;
import com.btl.java_web.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping
    Account createAccount(@RequestBody AccountCreationRequest request){
       return accountService.createAccount(request);
    }

    @GetMapping
    List<Account> getAccounts(){
        return accountService.getAccounts();
    }

    @GetMapping ("/{account_id}")
    Account getAccount(@PathVariable String account_id){
        return accountService.getAccount(account_id);
    }

    @PutMapping ("/{account_id}")
    Account updateAccount(@PathVariable String account_id, @RequestBody AccountUpdateRequest request){
        return accountService.updateAccount(account_id, request);
    }

    @DeleteMapping ("/{account_id}")
    String deleteAccount (@PathVariable String account_id){
        accountService.deleteAccount(account_id);
        return "User have been deleted";
    }
}
