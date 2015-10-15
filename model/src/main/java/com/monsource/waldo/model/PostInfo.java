package com.monsource.waldo.model;

import com.sun.org.apache.xpath.internal.operations.Mod;

import java.util.List;

/**
 * Created by nasanjargal on 6/21/15.
 */
public class PostInfo implements Model {
    private String phone;
    private String email;
    private boolean alreadyRated;
    private Integer rate;
    private List<Rate> rates;

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

    public boolean getAlreadyRated() {
        return alreadyRated;
    }

    public void setAlreadyRated(boolean alreadyRated) {
        this.alreadyRated = alreadyRated;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public List<Rate> getRates() {
        return rates;
    }

    public void setRates(List<Rate> rates) {
        this.rates = rates;
    }
}
