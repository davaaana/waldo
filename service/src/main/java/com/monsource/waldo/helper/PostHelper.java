package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.*;
import com.monsource.waldo.model.Post;
import com.monsource.waldo.model.PostInfo;
import com.monsource.waldo.model.Rate;
import com.monsource.waldo.model.SimplePost;
import com.monsource.waldo.security.SecurityHelper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by nasanjargal on 5/24/2015.
 */
public class PostHelper {
    public static List<SimplePost> convertToSimplePost(List<PostEntity> postEntities) {
        return convertToSimplePost(postEntities, false);
    }

    public static List<SimplePost> convertToSimplePost(List<PostEntity> postEntities, boolean contacted) {
        List<SimplePost> simplePosts = new ArrayList<SimplePost>();

        for (PostEntity postEntity : postEntities) {
            SimplePost simplePost = convertToSimplePost(postEntity);
            simplePosts.add(simplePost);
            if (contacted) {
                Long accountId = SecurityHelper.getDetails().getAccount().getId();

                PostInfo postInfo = new PostInfo();
                postInfo.setAlreadyRated(false);

                postInfo.setPhone(postEntity.getAccount().getPhone());
                postInfo.setEmail(postEntity.getAccount().getEmail());

                List<RateEntity> rateEntities = postEntity.getRates();
                if (rateEntities.size() > 0) {

                    postInfo.setRates(new ArrayList<Rate>());
                    int avgRate = 0;
                    for (RateEntity rateEntity : rateEntities) {

                        if (rateEntity.getRateAccount().getId().equals(accountId)) {
                            postInfo.setAlreadyRated(true);
                        }

                        Rate rate = new Rate();
                        rate.setPostId(postEntity.getId());
                        rate.setComment(rateEntity.getComment());
                        rate.setRate(rateEntity.getRate());
                        rate.setAccountId(rateEntity.getRateAccountId());
                        rate.setRateAccountName(rateEntity.getRateAccount().getUsername());
                        postInfo.getRates().add(rate);

                        avgRate += rate.getRate();
                    }

                    avgRate = avgRate / rateEntities.size();
                    postInfo.setRate(avgRate);
                }
                simplePost.setPostInfo(postInfo);
            }
        }

        return simplePosts;
    }

    private static String convertLocation(CityEntity city, DistrictEntity district) {
        String location = city.getName();

        if (district != null) {
            location += ", " + district.getName();
        }

        return location;
    }

    public static PostEntity convert(Post post) {
        PostEntity postEntity = new PostEntity();
        postEntity.setId(post.getId());
        postEntity.setFromCity(new CityEntity(post.getFromCityId()));
        postEntity.setToCity(new CityEntity(post.getToCityId()));

        if (post.getFromDistrictId() != null) {
            postEntity.setFromDistrict(new DistrictEntity(post.getFromDistrictId()));
        }

        if (post.getToDistrictId() != null) {
            postEntity.setToDistrict(new DistrictEntity(post.getToDistrictId()));
        }

        if (post.getWhen() != null) {
            postEntity.setWhen(new Timestamp(post.getWhen().getTime()));
        }
        postEntity.setArrive(new Timestamp(post.getArrive().getTime()));

        postEntity.setPassanger(post.getPassanger());
        postEntity.setStuff(post.getStuff());
        postEntity.setAnimal(post.getAnimal());
        postEntity.setType(post.getType());
        postEntity.setContact(post.getContact());
        postEntity.setDescription(post.getDescription());

        if (post.getTransportationId() != null) {
            postEntity.setTransportation(new TransportationEntity(post.getTransportationId()));
        }

        if (post.getPolicies() != null && post.getPolicies().size() > 0) {
            postEntity.setPolicies(PolicyHelper.convertToEntity(post.getPolicies()));
        }

        return postEntity;
    }

    public static Post convert(PostEntity postEntity) {
        Post post = new Post();

        post.setId(postEntity.getId());
        post.setFromCityId(postEntity.getFromCity().getId());
        post.setToCityId(postEntity.getToCity().getId());
        post.setFromDistrictId(postEntity.getFromDistrict() != null ? postEntity.getFromDistrict().getId() : null);
        post.setToDistrictId(postEntity.getToDistrict() != null ? postEntity.getToDistrict().getId() : null);
        post.setWhen(postEntity.getWhen() != null ? new Date(postEntity.getWhen().getTime()) : null);
        post.setArrive(new Date(postEntity.getArrive().getTime()));
        post.setPassanger(postEntity.getPassanger());
        post.setStuff(postEntity.getStuff());
        post.setAnimal(postEntity.getAnimal());
        post.setType(postEntity.getType());
        post.setContact(postEntity.getContact());
        post.setDescription(postEntity.getDescription());
        post.setTransportationId(postEntity.getTransportation() != null ? postEntity.getTransportation().getId() : null);

        post.setPolicies(PolicyHelper.convertToModel(postEntity.getPolicies()));

        return post;
    }

    public static SimplePost convertToSimplePost(PostEntity postEntity) {
        SimplePost simplePost = new SimplePost();

        simplePost.setId(postEntity.getId());
        simplePost.setUsername(postEntity.getAccount().getUsername());
        simplePost.setWhen(postEntity.getWhen());
        simplePost.setArrive(postEntity.getArrive());
        simplePost.setType(postEntity.getType());
        simplePost.setTransportation(postEntity.getTransportation() != null ? postEntity.getTransportation().getName() : null);
        simplePost.setDescription(postEntity.getDescription());
        simplePost.setPassanger(postEntity.getPassanger());
        simplePost.setStuff(postEntity.getStuff());
        simplePost.setAnimal(postEntity.getAnimal());
        simplePost.setRequestNum(postEntity.getRequestNum() == null ? 0 : postEntity.getRequestNum());

        simplePost.setFrom(convertLocation(postEntity.getFromCity(), postEntity.getFromDistrict()));
        simplePost.setTo(convertLocation(postEntity.getToCity(), postEntity.getToDistrict()));

        simplePost.setCreatedDate(new Date(postEntity.getCreatedDate().getTime()));

        simplePost.setPolicy(postEntity.getPolicies().size() == 0 ? null : postEntity.getPolicies().get(0).getPolicy());

        simplePost.setAlreadyExchange(false);

        return simplePost;
    }
}
