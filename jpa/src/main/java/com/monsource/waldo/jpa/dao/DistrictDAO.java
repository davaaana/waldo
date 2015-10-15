package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.DistrictEntity;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 5/13/2015.
 */
@Repository
public class DistrictDAO extends DataAccessObject {

    public List<DistrictEntity> findByCityId(int cityId) {
        Criteria criteria = this.getSession().createCriteria(DistrictEntity.class);
        criteria.createAlias("city", "city");
        criteria.add(Restrictions.eq("city.id", cityId));

        return criteria.list();
    }
}
