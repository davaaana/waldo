package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.RateEntity;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 5/31/15.
 */
@Repository
public class RateDAO extends DataAccessObject {
    public void save(RateEntity rateEntity) {
        this.getSession().save(rateEntity);
        this.getSession().flush();
    }

    public double getRateAverageByAccountId(Long accountId) {
        Criteria criteria = this.getSession().createCriteria(RateEntity.class);

        criteria.add(Restrictions.eq("accountId", accountId));

        criteria.setProjection(Projections.avg("rate"));

        double averageRate = (Double) criteria.uniqueResult();

        return averageRate;
    }

    public List<RateEntity> findByPostId(long postId) {
        Criteria criteria = this.getSession().createCriteria(RateEntity.class);
        criteria.add(Restrictions.eq("postId", postId));

        return criteria.list();
    }

    public List<RateEntity> findByAccountId(long accountId) {
        Criteria criteria = this.getSession().createCriteria(RateEntity.class);
        criteria.add(Restrictions.eq("accountId", accountId));

        return criteria.list();
    }
}
