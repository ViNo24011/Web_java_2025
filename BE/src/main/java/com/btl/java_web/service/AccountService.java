package com.btl.java_web.service;


import com.btl.java_web.dto.request.AccountCreationRequest;
import com.btl.java_web.dto.request.AccountUpdateRequest;
import com.btl.java_web.entity.Account;
import com.btl.java_web.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Account createAccount(AccountCreationRequest request){


        if (accountRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }


        Account account = new Account();

        account.setName(request.getName());
        account.setUsername(request.getUsername());


        account.setPassword(passwordEncoder.encode(request.getPassword()));

        account.setRole(request.getRole());
        account.setPhone(request.getPhone());
        account.setAddress(request.getAddress());
        account.setNote(request.getNote());
        account.setOrderHistory(request.getOrderHistory());

        return accountRepository.save(account);

    }

    public Account updateAccount(String account_id, AccountUpdateRequest request){
        Account account = getAccount(account_id);

        account.setName(request.getName());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        account.setRole(request.getRole());
        account.setPhone(request.getPhone());
        account.setAddress(request.getAddress());
        account.setNote(request.getNote());
        account.setOrderHistory(request.getOrderHistory());

        return accountRepository.save(account);
    }

    public void deleteAccount(String account_id){
        accountRepository.deleteById(account_id);
    }

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccount (String id){
        return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<Account> getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }
}