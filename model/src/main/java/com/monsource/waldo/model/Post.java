package com.monsource.waldo.model;

import com.monsource.waldo.model.type.*;

import java.util.Date;
import java.util.List;

public class Post implements Model {

	private Long id;
	private int fromCityId;
	private Integer fromDistrictId;
	private int toCityId;
	private Integer toDistrictId;
	private Date when;
	private Date arrive;
	private Integer passanger;
	private String stuff;
	private String animal;
	private PostType type;
	private String contact;
	private String description;
	private Integer transportationId;
    private List<Policy> policies;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getFromCityId() {
		return fromCityId;
	}

	public void setFromCityId(int fromCityId) {
		this.fromCityId = fromCityId;
	}

	public Integer getFromDistrictId() {
		return fromDistrictId;
	}

	public void setFromDistrictId(Integer fromDistrictId) {
		this.fromDistrictId = fromDistrictId;
	}

	public int getToCityId() {
		return toCityId;
	}

	public void setToCityId(int toCityId) {
		this.toCityId = toCityId;
	}

	public Integer getToDistrictId() {
		return toDistrictId;
	}

	public void setToDistrictId(Integer toDistrictId) {
		this.toDistrictId = toDistrictId;
	}

	public Date getWhen() {
		return this.when;
	}

	public void setWhen(Date when) {
		this.when = when;
	}

	public Date getArrive() {
		return this.arrive;
	}

	public void setArrive(Date arrive) {
		this.arrive = arrive;
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

	public PostType getType() {
		return this.type;
	}

	public void setType(PostType type) {
		this.type = type;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getTransportationId() {
		return this.transportationId;
	}

	public void setTransportationId(Integer transportationId) {
		this.transportationId = transportationId;
	}

    public List<Policy> getPolicies() {
        return policies;
    }

    public void setPolicies(List<Policy> policies) {
        this.policies = policies;
    }
}