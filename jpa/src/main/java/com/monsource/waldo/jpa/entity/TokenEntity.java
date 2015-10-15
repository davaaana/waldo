package com.monsource.waldo.jpa.entity;

import com.monsource.waldo.jpa.entity.type.Provider;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by nasanjargal on 6/21/15.
 */
@Entity
@Table(name = "token", schema = "public", catalog = "waldo_st")
public class TokenEntity {
    private Integer id;
    private String accessToken;
    private String refreshToken;
    private Date expireDate;
    private Provider provider;
    private String userId;

    @Id
    @SequenceGenerator(name = "token_id_seq", sequenceName = "token_id_seq", schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "token_id_seq")
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "user_id")
    public String getUserId() {
        return userId;
    }

    @Basic
    @Column(name = "access_token")
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Basic
    @Column(name = "refresh_token")
    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Basic
    @Column(name = "expire_date")
    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider type) {
        this.provider = type;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TokenEntity that = (TokenEntity) o;

        if (accessToken != null ? !accessToken.equals(that.accessToken) : that.accessToken != null) return false;
        if (expireDate != null ? !expireDate.equals(that.expireDate) : that.expireDate != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (refreshToken != null ? !refreshToken.equals(that.refreshToken) : that.refreshToken != null) return false;
        if (provider != null ? !provider.equals(that.provider) : that.provider != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = accessToken != null ? accessToken.hashCode() : 0;
        result = 31 * result + (refreshToken != null ? refreshToken.hashCode() : 0);
        result = 31 * result + (expireDate != null ? expireDate.hashCode() : 0);
        result = 31 * result + (provider != null ? provider.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        return result;
    }

    AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }
}
