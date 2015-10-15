package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.jpa.entity.RateEntity;
import com.monsource.waldo.model.Rate;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 5/31/15.
 */
public class RateHelper {
    public static RateEntity convert(Rate rate, AccountEntity accountEntity, PostEntity postEntity) {
        RateEntity rateEntity = new RateEntity();
        rateEntity.setRate(rate.getRate());
        rateEntity.setPostId(rate.getPostId());
        rateEntity.setComment(rate.getComment());

        rateEntity.setAccountId(postEntity.getAccount().getId());
        rateEntity.setRateAccountId(accountEntity.getId());

        return rateEntity;
    }

    public static List<Rate> convert(List<RateEntity> rateEntities) {
        List<Rate> rates = new ArrayList<Rate>();

        for (RateEntity rateEntity : rateEntities) {
            AccountEntity rateAccount = rateEntity.getRateAccount();

            Rate rate = new Rate();
            rate.setPostId(rateEntity.getPostId());
            rate.setRate(rateEntity.getRate());
            rate.setComment(rateEntity.getComment());
            rate.setRateAccountName(rateAccount.getLastName() + " " + rateAccount.getFirstName());
            rates.add(rate);
        }

        return rates;
    }
}
