package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.TokenEntity;
import com.monsource.waldo.jpa.entity.type.Provider;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 6/21/15.
 */
@Repository
public class TokenDao extends DataAccessObject {

    public List<TokenEntity> findByUserIdAndProvider(String userId, Provider provider) {
        Criteria criteria = this.getSession().createCriteria(TokenEntity.class);

        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("provider", provider));

        return criteria.list();

    }

    public List<TokenEntity> findByProviderAndUserIds(Provider provider, List<String> userIds) {
        Criteria criteria = this.getSession().createCriteria(TokenEntity.class);

        criteria.add(Restrictions.eq("provider", provider));
        criteria.add(Restrictions.in("userId", userIds));

        return criteria.list();
    }

    public void save(TokenEntity tokenEntity) {
        this.getSession().merge(tokenEntity);
        this.getSession().flush();
    }
}
