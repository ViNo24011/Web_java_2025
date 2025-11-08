package com.btl.java_web.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.btl.java_web.dto.request.AccountCreationRequest;
import com.btl.java_web.dto.request.AccountUpdateRequest;
import com.btl.java_web.dto.request.ProfileUpdateRequest;
import com.btl.java_web.entity.Account;
import com.btl.java_web.repository.AccountRepository;

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

    /**
     * Hàm này CHỈ cập nhật các trường profile cho user,
     * sử dụng DTO 'ProfileUpdateRequest' an toàn.
     * Nó không cho phép cập nhật 'role' hoặc 'orderHistory'.
     */
    public Account updateMyProfile(String accountId, ProfileUpdateRequest request) {

        // 1. Lấy Account hiện tại từ CSDL (dùng lại hàm getAccount(id) đã có)
        Account account = getAccount(accountId);

        // 2. Cập nhật các trường được phép
        account.setName(request.getName());
        account.setPhone(request.getPhone());
        account.setAddress(request.getAddress());
        account.setNote(request.getNote());

        // 3. Cập nhật mật khẩu CHỈ KHI người dùng cung cấp mật khẩu mới
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 4. Lưu lại vào CSDL
        return accountRepository.save(account);
    }
}