package com.monsource.waldo.model;

import com.monsource.waldo.model.type.PostType;

import java.util.Date;

public class SimplePost implements Model {

    private Long id;
    private String username;
    private String from;
    private String to;
    private Date when;
    private Date arrive;
    private PostType type;
    private String transportation;
    private int requestNum;
    private String description;
    private Integer passanger;
    private String stuff;
    private String animal;
    private Date createdDate;
    private boolean alreadyExchange;
    private PostInfo postInfo;
    private String policy;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFrom() {
        return this.from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return this.to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Date getWhen() {
        return this.when;
    }

    public void setWhen(Date when) {
        this.when = when;
    }

    public Date getArrive() {
        return arrive;
    }

    public void setArrive(Date arrive) {
        this.arrive = arrive;
    }

    public PostType getType() {
        return this.type;
    }

    public void setType(PostType type) {
        this.type = type;
    }

    public String getTransportation() {
        return this.transportation;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }

    public int getRequestNum() {
        return this.requestNum;
    }

    public void setRequestNum(int requestNum) {
        this.requestNum = requestNum;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPassanger() {
        return this.passanger;
    }

    public void setPassanger(Integer passanger) {
        this.passanger = passanger;
    }

    public String getStuff() {
        return this.stuff;
    }

    public void setStuff(String stuff) {
        this.stuff = stuff;
    }

    public String getAnimal() {
        return this.animal;
    }

    public void setAnimal(String animal) {
        this.animal = animal;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public boolean getAlreadyExchange() {
        return alreadyExchange;
    }

    public void setAlreadyExchange(boolean alreadyExchange) {
        this.alreadyExchange = alreadyExchange;
    }

    public PostInfo getPostInfo() {
        return postInfo;
    }

    public void setPostInfo(PostInfo postInfo) {
        this.postInfo = postInfo;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }
}