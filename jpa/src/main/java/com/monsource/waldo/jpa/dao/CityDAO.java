package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.CityEntity;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 5/10/2015.
 */
@Repository
public class CityDAO extends DataAccessObject {

    public List<CityEntity> findAll() {
        Criteria criteria = this.getSession().createCriteria(CityEntity.class);
        return criteria.list();
    }

}
