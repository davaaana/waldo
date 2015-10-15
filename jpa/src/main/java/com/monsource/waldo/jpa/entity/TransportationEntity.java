package com.monsource.waldo.jpa.entity;

import javax.persistence.*;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Entity
@Table(name = "transportation", schema = "public")
public class TransportationEntity {
    private Integer id;
    private String name;

    public TransportationEntity() {
    }

    public TransportationEntity(Integer id) {
        this.id = id;
    }

    @Id
    @SequenceGenerator(name = "transportation_id_seq", sequenceName = "transportation_id_seq", schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transportation_id_seq")
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

        TransportationEntity that = (TransportationEntity) o;

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
}
