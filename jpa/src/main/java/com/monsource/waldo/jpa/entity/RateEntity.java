package com.monsource.waldo.jpa.entity;

import javax.persistence.*;

/**
 * Created by nasanjargal on 5/31/15.
 */
@Entity
@Table(name = "rate", schema = "public", catalog = "waldo_st")
public class RateEntity {
    private Integer id;
    private Long accountId;
    private Long postId;
    private Long rateAccountId;
    private Integer rate;
    private String comment;

    @Id
    @SequenceGenerator(name = "rate_id_seq", sequenceName = "rate_id_seq", schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rate_id_seq")
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "account_id")
    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    @Basic
    @Column(name = "post_id")
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    @Basic
    @Column(name = "rate_account_id")
    public Long getRateAccountId() {
        return rateAccountId;
    }

    public void setRateAccountId(Long rateAccountId) {
        this.rateAccountId = rateAccountId;
    }

    @Basic
    @Column(name = "rate")
    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    @Basic
    @Column(name = "comment")
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RateEntity that = (RateEntity) o;

        if (accountId != null ? !accountId.equals(that.accountId) : that.accountId != null) return false;
        if (comment != null ? !comment.equals(that.comment) : that.comment != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (postId != null ? !postId.equals(that.postId) : that.postId != null) return false;
        if (rate != null ? !rate.equals(that.rate) : that.rate != null) return false;
        if (rateAccountId != null ? !rateAccountId.equals(that.rateAccountId) : that.rateAccountId != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (accountId != null ? accountId.hashCode() : 0);
        result = 31 * result + (postId != null ? postId.hashCode() : 0);
        result = 31 * result + (rateAccountId != null ? rateAccountId.hashCode() : 0);
        result = 31 * result + (rate != null ? rate.hashCode() : 0);
        result = 31 * result + (comment != null ? comment.hashCode() : 0);
        return result;
    }

    AccountEntity rateAccount;

    @ManyToOne()
    @JoinColumn(name = "rate_account_id", referencedColumnName = "id", insertable = false, updatable = false)
    public AccountEntity getRateAccount() {
        return rateAccount;
    }

    public void setRateAccount(AccountEntity account) {
        this.rateAccount = account;
    }
}
