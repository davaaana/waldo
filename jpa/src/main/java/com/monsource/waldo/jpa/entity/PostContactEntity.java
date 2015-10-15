package com.monsource.waldo.jpa.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by nasanjargal on 5/31/15.
 */
@Entity
@Table(name = "post_contact", schema = "public", catalog = "waldo_st")
public class PostContactEntity {
    private Long id;
    private Boolean call;
    private Boolean sms;
    private String note;
    private Boolean viewed;
    private Timestamp createdDate;
    private Boolean hide;

    @Id
    @SequenceGenerator(name = "post_contact_id_seq", sequenceName = "post_contact_id_seq", schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_contact_id_seq")
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "call")
    public Boolean getCall() {
        return call;
    }

    public void setCall(Boolean call) {
        this.call = call;
    }

    @Basic
    @Column(name = "sms")
    public Boolean getSms() {
        return sms;
    }

    public void setSms(Boolean sms) {
        this.sms = sms;
    }

    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Basic
    @Column(name = "viewed")
    public Boolean getViewed() {
        return viewed;
    }

    public void setViewed(Boolean viewed) {
        this.viewed = viewed;
    }

    @Basic
    @Column(name = "created_date")
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    @Basic
    @Column(name = "hide")
    public Boolean getHide() {
        return hide;
    }

    public void setHide(Boolean hide) {
        this.hide = hide;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PostContactEntity that = (PostContactEntity) o;

        if (call != null ? !call.equals(that.call) : that.call != null) return false;
        if (createdDate != null ? !createdDate.equals(that.createdDate) : that.createdDate != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (note != null ? !note.equals(that.note) : that.note != null) return false;
        if (sms != null ? !sms.equals(that.sms) : that.sms != null) return false;
        if (viewed != null ? !viewed.equals(that.viewed) : that.viewed != null) return false;
        if (hide != null ? !hide.equals(that.hide) : that.hide != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (call != null ? call.hashCode() : 0);
        result = 31 * result + (sms != null ? sms.hashCode() : 0);
        result = 31 * result + (note != null ? note.hashCode() : 0);
        result = 31 * result + (viewed != null ? viewed.hashCode() : 0);
        result = 31 * result + (createdDate != null ? createdDate.hashCode() : 0);
        result = 31 * result + (hide != null ? hide.hashCode() : 0);
        return result;
    }

    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    private PostEntity post;

    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    public PostEntity getPost() {
        return post;
    }

    public void setPost(PostEntity post) {
        this.post = post;
    }
}
