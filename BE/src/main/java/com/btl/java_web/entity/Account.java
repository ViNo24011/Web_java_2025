package com.btl.java_web.entity;

import jakarta.persistence.*;

import java.util.*;

import org.apache.catalina.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class Account implements UserDetails {
    @Id
    @GeneratedValue (strategy = GenerationType.UUID) //random khong lap lai id
    private String account_id;
    private String name;
    private String username;
    private String password;
    private String role;
    private String phone;
    private String address;
    private String note;
    @ElementCollection // Đánh dấu đây là một tập hợp các phần tử
    @CollectionTable(
            name = "account_order_history", // Tên của bảng phụ sẽ được tạo ra
            joinColumns = @JoinColumn(name = "account_id") // Tên cột khóa ngoại liên kết về bảng Account
    )
    @Column(name = "order_item") // Tên của cột chứa các giá trị String (ví dụ: "order_123", "order_456")
    private List<String> orderHistory;


    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAccount_id() {
        return account_id;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getOrderHistory() {
        return orderHistory;
    }

    public void setOrderHistory(List<String> orderHistory) {
        this.orderHistory = orderHistory;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Lấy vai trò (role) và chuyển nó thành GrantedAuthority
        // Thêm "ROLE_" vào trước role nếu SecurityConfig yêu cầu (ví dụ: "ROLE_USER")
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + this.role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Mặc định là true (tài khoản không hết hạn)
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Mặc định là true (tài khoản không bị khóa)
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Mặc định là true (thông tin đăng nhập không hết hạn)
    }

    @Override
    public boolean isEnabled() {
        return true; // Mặc định là true (tài khoản được kích hoạt)
    }
}
