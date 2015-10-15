package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.AccountHelper;
import com.monsource.waldo.helper.PostContactHelper;
import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.dao.PostContactDAO;
import com.monsource.waldo.jpa.dao.PostDAO;
import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.jpa.entity.PostContactEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.model.ContactAccount;
import com.monsource.waldo.model.PostContact;
import com.monsource.waldo.security.SecurityHelper;
import org.hibernate.exception.ConstraintViolationException;
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
@RequestMapping("/contact")
public class PostContactService {

    @Autowired
    PostContactDAO postContactDAO;

    @Autowired
    PostDAO postDAO;

    @Autowired
    AccountDAO accountDAO;

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public Result exchange(@RequestBody PostContact postContact) {
        try {
            AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

            PostContactEntity postContactEntity = PostContactHelper.convert(postContact);
            postContactEntity.setAccount(accountEntity);

            postContactDAO.save(postContactEntity);

            PostEntity postEntity = postDAO.findById(postContact.getId());
            accountEntity = postEntity.getAccount();

            ContactAccount contactAccount = AccountHelper.convertContact(accountEntity);
            return new Result(true, contactAccount);
        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "{postId}", method = RequestMethod.GET)
    @Transactional
    public Result get(@PathVariable("postId") Long postId) {
        List<PostContactEntity> postContactEntities = postContactDAO.findByPostId(postId);

        List<PostContact> postContacts = PostContactHelper.convert(postContactEntities);

        for (PostContactEntity postContactEntity : postContactEntities) {
            postContactEntity.setViewed(true);
        }

        postContactDAO.save(postContactEntities);

        return new Result(true, postContacts);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @Transactional
    public Result delete(@RequestBody PostContact postContact) {

        AccountEntity accountEntity = accountDAO.findByUsername(postContact.getUsername());

        PostContactEntity postContactEntity = postContactDAO.findByAccountIdAndPostId(accountEntity.getId(), postContact.getId());

        postContactDAO.delete(postContactEntity);

        return new Result(true);
    }

    @RequestMapping(value = "hide/{contactId}", method = RequestMethod.POST)
    @Transactional
    public Result delete(@PathVariable("contactId") Long contactId) {

        PostContactEntity postContactEntity = postContactDAO.findById(contactId);
        if (postContactEntity != null) {
            PostEntity postEntity = postContactEntity.getPost();
            if (postEntity.getAccount().getId().equals(SecurityHelper.getDetails().getAccount().getId())) {

                postContactEntity.setHide(!postContactEntity.getHide());
                postContactDAO.save(postContactEntity);

                return new Result(true);
            }
        }

        return new Result(false);
    }
}
