package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.PolicyEntity;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 7/5/15.
 */
@Repository
public class PolicyDAO extends DataAccessObject {

    public List<PolicyEntity> findAll() {
        Criteria criteria = this.getSession().createCriteria(PolicyEntity.class);
        return criteria.list();
    }

}
