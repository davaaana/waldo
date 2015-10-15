package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.AccountEntity;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Repository
public class AccountDAO extends DataAccessObject {
    public AccountEntity findByUsername(String username) {
        Criteria criteria = this.getSession().createCriteria(AccountEntity.class);

        criteria.add(Restrictions.eq("username", username));

        return (AccountEntity) criteria.uniqueResult();
    }

    public void save(AccountEntity accountEntity) {
        this.getSession().merge(accountEntity);
        this.getSession().flush();
    }

    public AccountEntity findById(Long id) {
        return (AccountEntity) this.getSession().get(AccountEntity.class, id);
    }
}
