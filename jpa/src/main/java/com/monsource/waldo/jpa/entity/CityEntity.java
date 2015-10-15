package com.monsource.waldo.jpa.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by nasanjargal on 5/10/2015.
 */
@Entity
@Table(name = "city", schema = "public")
public class CityEntity {
    private Integer id;
    private String name;
    private List<DistrictEntity> districts;

    public CityEntity() {
    }

    public CityEntity(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CityEntity that = (CityEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "city")
    public List<DistrictEntity> getDistricts() {
        return districts;
    }

    public void setDistricts(List<DistrictEntity> districts) {
        this.districts = districts;
    }
}
