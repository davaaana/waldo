package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.PostContactEntity;
import com.monsource.waldo.jpa.entity.PostEntity;
import com.monsource.waldo.model.PostContact;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by nasanjargal on 5/31/15.
 */
public class PostContactHelper {
    public static PostContactEntity convert(PostContact postContact) {

        PostContactEntity postContactEntity = new PostContactEntity();

        PostEntity postEntity = new PostEntity();
        postEntity.setId(postContact.getId());

        postContactEntity.setPost(postEntity);
        postContactEntity.setCall(postContact.getCall());
        postContactEntity.setSms(postContact.getSms());
        postContactEntity.setNote(postContact.getNote());
        postContactEntity.setViewed(false);
        postContactEntity.setCreatedDate(new Timestamp(System.currentTimeMillis()));

        return postContactEntity;
    }

    public static List<PostContact> convert(List<PostContactEntity> postContactEntities) {

        ArrayList<PostContact> postContacts = new ArrayList<PostContact>();

        for (PostContactEntity postContactEntity : postContactEntities) {

            if (postContactEntity.getHide() != null && postContactEntity.getHide() == true) {
                continue;
            }

            PostContact postContact = new PostContact();

            postContact.setId(postContactEntity.getId());
            postContact.setUsername(postContactEntity.getAccount().getUsername());
            postContact.setCall(postContactEntity.getCall());
            postContact.setSms(postContactEntity.getSms());

            postContact.setPhone(postContactEntity.getAccount().getPhone());
            postContact.setEmail(postContactEntity.getAccount().getEmail());

            postContact.setNote(postContactEntity.getNote());
            postContact.setCreatedDate(new Date(postContactEntity.getCreatedDate().getTime()));

            postContacts.add(postContact);
        }

        return postContacts;
    }
}
