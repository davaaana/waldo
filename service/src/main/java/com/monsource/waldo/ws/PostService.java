package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.PostHelper;
import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.dao.PostDAO;
import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.jpa.entity.PostContactEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.model.Filter;
import com.monsource.waldo.model.Post;
import com.monsource.waldo.model.SimplePost;
import com.monsource.waldo.security.AccountDetails;
import com.monsource.waldo.security.SecurityHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@RestController
@RequestMapping("/post")
public class PostService {

    @Autowired
    PostDAO postDAO;
    @Autowired
    AccountDAO accountDAO;

    @RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json")
    public Result find(@ModelAttribute Filter filter) {
        try {

            List<PostEntity> postEntities = postDAO.find(filter);
            List<SimplePost> simplePosts = PostHelper.convertToSimplePost(postEntities);

            return new Result(true, simplePosts);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "{postId}", method = RequestMethod.GET, headers = "Accept=application/json")
    @Transactional
    public Result getPost(@PathVariable("postId") Long postId) {
        try {
            PostEntity postEntity = postDAO.get(postId);
            SimplePost simplePost = PostHelper.convertToSimplePost(postEntity);

            AccountDetails details = SecurityHelper.getDetails();
            if (details != null) {
                for (PostContactEntity postContactEntity : postEntity.getPostContacts()) {
                    if (postContactEntity.getAccount().getId().equals(details.getAccount().getId())) {
                        simplePost.setAlreadyExchange(true);
                        break;
                    }
                }
            }

            if (!simplePost.getAlreadyExchange()) {
                Integer requestNum = postEntity.getRequestNum() == null ? 0 : postEntity.getRequestNum();
                requestNum += 1;
                postEntity.setRequestNum(requestNum);
                postDAO.save(postEntity);
            }


            return new Result(true, simplePost);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "/get/{postId}", method = RequestMethod.GET, headers = "Accept=application/json")
    public Result get(@PathVariable("postId") Long postId) {
        try {
            PostEntity postEntity = postDAO.findById(postId);

            Post post = PostHelper.convert(postEntity);
            return new Result(true, post);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "/getActivateCountPost", method = RequestMethod.GET, headers = "Accept=application/json")
    public Result getActivateCount() {
        try {
             return new Result(true,postDAO.activateTotalCount());
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,0);
        }
    }


    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    @Transactional
    public Result save(@RequestBody Post post) {
        try {

            AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

            PostEntity postEntity = PostHelper.convert(post);
            postEntity.setClosed(false);

            PostEntity oldPostEntity = postDAO.findById(post.getId());
            if (oldPostEntity != null) {
                postEntity.setRequestNum(oldPostEntity.getRequestNum());
                postEntity.setCreatedDate(oldPostEntity.getCreatedDate());
                postEntity.setRates(oldPostEntity.getRates());
            }

            if (post.getId() == null || post.getId() == 0) {
                postEntity.setRequestNum(0);
                postEntity.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            }
            postEntity.setModifiedDate(new Timestamp(System.currentTimeMillis()));

            postEntity.setAccount(accountEntity);

            postDAO.save(postEntity);

            return new Result(true);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "/own", method = RequestMethod.GET)
    public Result getOwnPosts(@ModelAttribute Filter filter) {
        try {

            AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

            List<PostEntity> postEntities = postDAO.find(filter, accountEntity.getId());
            List<SimplePost> simplePosts = PostHelper.convertToSimplePost(postEntities);

            return new Result(true, simplePosts);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    @RequestMapping(value = "/contacted", method = RequestMethod.GET)
    public Result getContactedPosts(@ModelAttribute Filter filter) {
        try {

            if (filter.getPage() == null) {
                filter.setPage(0);
            }

            AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

            List<PostEntity> postEntities = postDAO.findByContactAccountId(accountEntity.getId(), filter);
            List<SimplePost> simplePosts = PostHelper.convertToSimplePost(postEntities, true);

            return new Result(true, simplePosts);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false);
        }
    }

    /*@RequestMapping(value = "{postId}", method = RequestMethod.DELETE)
    @Transactional
    public Result deletePost(@PathVariable("postId") long postId) {
        try {
            PostEntity postEntity = postDAO.findById(postId);
            if (postEntity != null) {
                if (postEntity.getAccount().getId() == SecurityHelper.getDetails().getAccount().getId()) {
                    postDAO.delete(postEntity);
                    return new Result(true);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Result(false);
    }*/

    @RequestMapping(value = "close/{postId}", method = RequestMethod.POST)
    @Transactional
    public Result hidePost(@PathVariable("postId") long postId) {
        try {
            PostEntity postEntity = postDAO.findById(postId);
            if (postEntity != null) {
                if (postEntity.getAccount().getId().equals(SecurityHelper.getDetails().getAccount().getId())) {
                    postEntity.setClosed(!postEntity.getClosed());
                    postDAO.save(postEntity);
                    return new Result(true);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Result(false);
    }
}
