package com.monsource.waldo.social;

import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.security.AccountDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.NativeWebRequest;

/**
 * Created by nasanjargal on 6/21/15.
 */
@Component
public class SocialSignInAdapter implements SignInAdapter {

    private static final String RESULT_SUCCESS = "/profile/social/signin";

    @Autowired
    AccountDAO accountDAO;

    @Override
    public String signIn(String localUserId, Connection<?> connection, NativeWebRequest request) {

        AccountEntity account = accountDAO.findById(Long.valueOf(localUserId));
        AccountDetails details = new AccountDetails(account);

        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities()));

        return RESULT_SUCCESS;
    }
}
