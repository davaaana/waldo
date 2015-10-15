package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.TransportationEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 5/31/2015.
 */
@Repository
public class TransportationDAO extends DataAccessObject {

    public List<TransportationEntity> findAll() {
        return this.getSession().createCriteria(TransportationEntity.class).list();
    }

    public void save(TransportationEntity transportationEntity) {
        this.getSession().merge(transportationEntity);
        this.getSession().flush();
    }
}
