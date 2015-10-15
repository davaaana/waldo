package com.monsource.waldo.model;

import java.util.Date;

/**
 * Created by nasanjargal on 5/31/15.
 */
public class ContactAccount {
    private String username;
    private String name;
    private String phone;
    private String email;
    private Date createdDate;

    private int rate;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
}
