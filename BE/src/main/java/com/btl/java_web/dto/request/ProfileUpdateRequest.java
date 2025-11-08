package com.btl.java_web.dto.request;

public class ProfileUpdateRequest {

    private String name;
    private String password; // Cho phép đổi mật khẩu
    private String phone;
    private String address;
    private String note;

    // --- KHÔNG CÓ CÁC TRƯỜNG SAU ---
    // private String role;           (Không cho phép tự đổi role)
    // private List<String> orderHistory; (Không cho phép tự sửa lịch sử)


    // --- Getters and Setters ---

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}