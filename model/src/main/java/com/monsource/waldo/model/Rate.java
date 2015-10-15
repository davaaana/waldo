package com.monsource.waldo.model;

/**
 * Created by nasanjargal on 5/31/15.
 */
public class Rate {
    private Long postId;
    private int rate;
    private String comment;
    private Long accountId;
    private String rateAccountName;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getRateAccountName() {
        return rateAccountName;
    }

    public void setRateAccountName(String rateAccountName) {
        this.rateAccountName = rateAccountName;
    }
}
