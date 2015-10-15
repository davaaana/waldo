package com.monsource.waldo.model;

import com.monsource.waldo.model.type.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Filter implements Model {

    private String text;
    private PostType type;
    private Integer fromCityId;
    private Integer fromDistrictId;
    private Integer toCityId;
    private Integer toDistrictId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fromDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date toDate;
    private Boolean passanger;
    private Boolean stuff;
    private Boolean animal;
    private Integer transportation;
    private Boolean bestView;

    private Integer page;

    private Boolean closed = false;

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public PostType getType() {
        return this.type;
    }

    public void setType(PostType type) {
        this.type = type;
    }

    public Integer getFromCityId() {
        return this.fromCityId;
    }

    public void setFromCityId(Integer fromCityId) {
        this.fromCityId = fromCityId;
    }

    public Integer getFromDistrictId() {
        return this.fromDistrictId;
    }

    public void setFromDistrictId(Integer fromDistrictId) {
        this.fromDistrictId = fromDistrictId;
    }

    public Integer getToCityId() {
        return this.toCityId;
    }

    public void setToCityId(Integer toCityId) {
        this.toCityId = toCityId;
    }

    public Integer getToDistrictId() {
        return this.toDistrictId;
    }

    public void setToDistrictId(Integer toDistrictId) {
        this.toDistrictId = toDistrictId;
    }

    public Date getFromDate() {
        return this.fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return this.toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Boolean getPassanger() {
        return this.passanger;
    }

    public void setPassanger(Boolean passanger) {
        this.passanger = passanger;
    }

    public Boolean getStuff() {
        return this.stuff;
    }

    public void setStuff(Boolean stuff) {
        this.stuff = stuff;
    }

    public Boolean getAnimal() {
        return this.animal;
    }

    public void setAnimal(Boolean animal) {
        this.animal = animal;
    }

    public Integer getTransportation() {
        return this.transportation;
    }

    public void setTransportation(Integer transportation) {
        this.transportation = transportation;
    }

    public Boolean getBestView() {
        return bestView;
    }

    public void setBestView(Boolean bestView) {
        this.bestView = bestView;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }
}