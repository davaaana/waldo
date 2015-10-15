package com.monsource.waldo.jpa.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by nasanjargal on 7/5/15.
 */
@Entity
@Table(name = "policy", schema = "public", catalog = "waldo_st")
public class PolicyEntity {
    private Long id;
    private String policy;
    private List<PostEntity> posts;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "policy")
    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PolicyEntity that = (PolicyEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (policy != null ? !policy.equals(that.policy) : that.policy != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (policy != null ? policy.hashCode() : 0);
        return result;
    }

    @ManyToMany(mappedBy = "policies")
    public List<PostEntity> getPosts() {
        return posts;
    }

    public void setPosts(List<PostEntity> posts) {
        this.posts = posts;
    }
}
