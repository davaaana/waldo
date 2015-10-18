package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.PostContactEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.model.Filter;
import org.hibernate.Criteria;
import org.hibernate.FlushMode;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Repository
public class PostDAO extends DataAccessObject {

    public static final int MAX_POST_RESULTS = 30;

    public List<PostEntity> find(Filter filter) {
        return find(filter, null);
    }

    public PostEntity findById(Long id) {
        Criteria criteria = this.getSession().createCriteria(PostEntity.class);
        criteria.add(Restrictions.eq("id", id));
        return (PostEntity) criteria.uniqueResult();
    }

    public void save(final PostEntity postEntity) {
        this.getSession().merge(postEntity);
        this.getSession().flush();
    }

    public List<PostEntity> find(Filter filter, Long accountId) {
        Criteria criteria = this.getSession().createCriteria(PostEntity.class);

        if (accountId != null) {
            criteria.createAlias("account", "account");
            criteria.add(Restrictions.eq("account.id", accountId));
        }

        if (filter.getText() != null && !filter.getText().equals("")) {
            criteria.add(Restrictions.or(
                    Restrictions.ilike("description", filter.getText())
            ));
        }

        if (filter.getFromCityId() != null) {
            criteria.createAlias("fromCity", "fromCity");
            criteria.add(Restrictions.eq("fromCity.id", filter.getFromCityId()));
        }

        if (filter.getType() != null) {
            criteria.add(Restrictions.eq("type", filter.getType()));
        }

        if (filter.getToCityId() != null) {
            criteria.createAlias("toCity", "toCity");
            criteria.add(Restrictions.eq("toCity.id", filter.getToCityId()));
        }

        if (filter.getFromDistrictId() != null) {
            criteria.createAlias("fromDistrict", "fromDistrict");
            criteria.add(Restrictions.eq("fromDistrict.id", filter.getFromDistrictId()));
        }

        if (filter.getToDistrictId() != null) {
            criteria.createAlias("toDistrict", "toDistrict");
            criteria.add(Restrictions.eq("toDistrict.id", filter.getToDistrictId()));
        }

        if (filter.getFromDate() != null) {
            criteria.add(Restrictions.ge("when", filter.getFromDate()));
        }

        if (filter.getToDate() != null) {
            criteria.add(Restrictions.le("when", filter.getToDate()));
        }

        //todo uncomment amaraaaaaaa!!!!!!!!!!!!
        if (filter.getFromDate() == null) {
            if (accountId == null) {
                criteria.add(Restrictions.ge("when", new Date()));
            }
        }

        if (filter.getPassanger() != null) {
            if (filter.getPassanger()) {
                criteria.add(Restrictions.ge("passanger", 0));
            } else {
                criteria.add(Restrictions.eq("passanger", 0));
            }
        }

        if (filter.getStuff() != null) {
            criteria.add(Restrictions.eq("stuff", filter.getStuff()));
        }

        if (filter.getAnimal() != null) {
            criteria.add(Restrictions.eq("animal", filter.getAnimal()));
        }

        if (filter.getTransportation() != null) {
            criteria.createAlias("transportation", "transportation");
            criteria.add(Restrictions.eq("transportation.id", filter.getTransportation()));
        }

        if (filter.getBestView() != null && filter.getBestView() == true) {
            criteria.addOrder(Order.desc("requestNum"));
            criteria.addOrder(Order.desc("createdDate"));
        } else {
            criteria.addOrder(Order.desc("createdDate"));
        }

        if (filter.getClosed() == null || filter.getClosed() == false) {
            criteria.add(Restrictions.eq("closed", false));
        } else {
            criteria.add(Restrictions.eq("closed", true));
        }

        criteria.setMaxResults(MAX_POST_RESULTS);

        if (filter.getPage() == null || filter.getPage().equals(0)) {
            criteria.setFirstResult(0);
        } else {
            criteria.setFirstResult(MAX_POST_RESULTS * filter.getPage());
        }

        return criteria.list();
    }

    public List<PostEntity> findByContactAccountId(Long accountId,Filter filter) {
        Criteria criteria = this.getSession().createCriteria(PostEntity.class);

        criteria.createAlias("postContacts", "postContacts");
        criteria.createAlias("postContacts.account", "pa");

        if (filter.getText() != null && !filter.getText().equals("")) {
            criteria.add(Restrictions.or(
                    Restrictions.ilike("description", filter.getText())
            ));
        }

        if (filter.getFromCityId() != null) {
            criteria.createAlias("fromCity", "fromCity");
            criteria.add(Restrictions.eq("fromCity.id", filter.getFromCityId()));
        }

        if (filter.getType() != null) {
            criteria.add(Restrictions.eq("type", filter.getType()));
        }

        if (filter.getToCityId() != null) {
            criteria.createAlias("toCity", "toCity");
            criteria.add(Restrictions.eq("toCity.id", filter.getToCityId()));
        }

        if (filter.getFromDistrictId() != null) {
            criteria.createAlias("fromDistrict", "fromDistrict");
            criteria.add(Restrictions.eq("fromDistrict.id", filter.getFromDistrictId()));
        }

        if (filter.getToDistrictId() != null) {
            criteria.createAlias("toDistrict", "toDistrict");
            criteria.add(Restrictions.eq("toDistrict.id", filter.getToDistrictId()));
        }

        if (filter.getFromDate() != null) {
            criteria.add(Restrictions.ge("when", filter.getFromDate()));
        }

        if (filter.getToDate() != null) {
            criteria.add(Restrictions.le("when", filter.getToDate()));
        }

        //todo uncomment amaraaaaaaa!!!!!!!!!!!!
        if (filter.getFromDate() == null) {
            if (accountId == null) {
                criteria.add(Restrictions.ge("when", new Date()));
            }
        }

        if (filter.getPassanger() != null) {
            if (filter.getPassanger()) {
                criteria.add(Restrictions.ge("passanger", 0));
            } else {
                criteria.add(Restrictions.eq("passanger", 0));
            }
        }

        if (filter.getStuff() != null) {
            criteria.add(Restrictions.eq("stuff", filter.getStuff()));
        }

        if (filter.getAnimal() != null) {
            criteria.add(Restrictions.eq("animal", filter.getAnimal()));
        }

        if (filter.getTransportation() != null) {
            criteria.createAlias("transportation", "transportation");
            criteria.add(Restrictions.eq("transportation.id", filter.getTransportation()));
        }

        if (filter.getBestView() != null && filter.getBestView() == true) {
            criteria.addOrder(Order.desc("requestNum"));
            criteria.addOrder(Order.desc("createdDate"));
        } else {
            criteria.addOrder(Order.desc("createdDate"));
        }

        if (filter.getClosed() == null || filter.getClosed() == false) {
            criteria.add(Restrictions.eq("closed", false));
        } else {
            criteria.add(Restrictions.eq("closed", true));
        }

        criteria.setMaxResults(MAX_POST_RESULTS);

        if (filter.getPage() == null || filter.getPage().equals(0)) {
            criteria.setFirstResult(0);
        } else {
            criteria.setFirstResult(MAX_POST_RESULTS * filter.getPage());
        }

        criteria.add(Restrictions.eq("pa.id", accountId));
        return criteria.list();
    }

    public void delete(PostEntity entity) {
        Session session = this.getSession();
        session.delete(entity);
        session.flush();
    }

    public PostEntity get(Long postId) {
        return (PostEntity) this.getSession().get(PostEntity.class, postId);
    }
}
