package com.monsource.waldo.jpa.dao;

import com.monsource.waldo.jpa.entity.PostContactEntity;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nasanjargal on 5/31/15.
 */
@Repository
public class PostContactDAO extends DataAccessObject {
    public void save(PostContactEntity postContactEntity) {
        this.getSession().merge(postContactEntity);
        this.getSession().flush();
    }

    public List<PostContactEntity> findByPostId(Long postId) {
        Criteria criteria = this.getSession().createCriteria(PostContactEntity.class);
        criteria.createAlias("post", "post");
        criteria.add(Restrictions.eq("post.id", postId));

        return criteria.list();
    }

    public void save(List<PostContactEntity> postContactEntities) {
        for (PostContactEntity postContactEntity : postContactEntities) {
            this.getSession().merge(postContactEntity);
        }
        this.getSession().flush();
    }

    public PostContactEntity findById(Long id) {
        return (PostContactEntity) this.getSession().get(PostContactEntity.class, id);
    }

    public void delete(PostContactEntity postContactEntity) {
        this.getSession().delete(postContactEntity);
        this.getSession().flush();
    }

    public PostContactEntity findByAccountIdAndPostId(Long accountId, Long postId) {
        Criteria criteria = this.getSession().createCriteria(PostContactEntity.class);
        criteria.add(Restrictions.eq("accountId", accountId));
        criteria.add(Restrictions.eq("postId", postId));

        return (PostContactEntity) criteria.uniqueResult();
    }
}
