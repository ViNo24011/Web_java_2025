package com.btl.java_web.dto.request;

// Bạn có thể dùng @Data của Lombok nếu muốn
public class LoginRequest {
    private String username;
    private String password;

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
}