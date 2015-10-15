package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.RateHelper;
import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.dao.PostDAO;
import com.monsource.waldo.jpa.dao.RateDAO;
import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.jpa.entity.RateEntity;
import com.monsource.waldo.model.Rate;
import com.monsource.waldo.security.SecurityHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by nasanjargal on 5/31/15.
 */
@RestController
@RequestMapping("/rate")
public class RateService {

    @Autowired
    RateDAO rateDAO;

    @Autowired
    PostDAO postDAO;

    @Autowired
    AccountDAO accountDAO;

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public Result rate(@RequestBody Rate rate) {

        AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();
        PostEntity postEntity = postDAO.findById(rate.getPostId());
        RateEntity rateEntity = RateHelper.convert(rate, accountEntity, postEntity);
        rateDAO.save(rateEntity);

        AccountEntity postAccountEntity = postEntity.getAccount();
        double averageRate = rateDAO.getRateAverageByAccountId(postAccountEntity.getId());

        postAccountEntity.setRate(averageRate);
        accountDAO.save(postAccountEntity);

        return new Result(true);

    }

    @RequestMapping(value = "/post/{postId}", method = RequestMethod.GET)
    public Result getRate(@PathVariable("postId") long postId) {

        List<RateEntity> rateEntities = rateDAO.findByPostId(postId);

        List<Rate> rates = RateHelper.convert(rateEntities);

        return new Result(true, rates);
    }

    @RequestMapping(value = "/account/{username}/data", method = RequestMethod.GET)
    public Result getRate(@PathVariable("username") String username) {

        AccountEntity accountEntity = accountDAO.findByUsername(username);
        if (accountEntity != null) {
            List<RateEntity> rateEntities = rateDAO.findByAccountId(accountEntity.getId());
            List<Rate> rates = RateHelper.convert(rateEntities);
            return new Result(true, rates);
        }
        return new Result(false);
    }

}
