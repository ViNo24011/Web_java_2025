package com.btl.java_web.entity;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
