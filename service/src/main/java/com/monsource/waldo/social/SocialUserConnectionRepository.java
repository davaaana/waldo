package com.monsource.waldo.social;

import com.monsource.waldo.jpa.dao.TokenDao;
import com.monsource.waldo.jpa.entity.TokenEntity;
import com.monsource.waldo.jpa.entity.type.Provider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionKey;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by nasanjargal on 6/21/15.
 */
@Component
public class SocialUserConnectionRepository implements UsersConnectionRepository {

    public static final String SOCIAL_CONNECTION_ATTRIBUTE = SocialUserConnectionRepository.class.getName();
    @Autowired
    TokenDao tokenDao;

    @Autowired
    ConnectionRepository repository;

    @Autowired
    HttpSession session;

    @Override
    public List<String> findUserIdsWithConnection(Connection<?> connection) {
        ConnectionKey key = connection.getKey();
        List<TokenEntity> tokens = tokenDao.findByUserIdAndProvider(key.getProviderUserId(), Provider.valueOf(key.getProviderId().toUpperCase()));
        List<String> localUserIds = new ArrayList<String>();
        if (tokens.size() == 0) {
            session.setAttribute(SOCIAL_CONNECTION_ATTRIBUTE, connection);
        } else {
            for (TokenEntity token : tokens) {
                localUserIds.add(token.getAccount().getId() + "");
            }
        }
        return localUserIds;
    }

    @Override
    public Set<String> findUserIdsConnectedTo(String providerId, Set<String> providerUserIds) {

        List<TokenEntity> tokens = tokenDao.findByProviderAndUserIds(Provider.valueOf(providerId.toUpperCase()), new ArrayList<String>(providerUserIds));

        Set<String> localUserIds = new HashSet<String>();

        for (TokenEntity token : tokens) {
            localUserIds.add(token.getAccount().getId() + "");
        }

        return localUserIds;
    }

    @Override
    public ConnectionRepository createConnectionRepository(String userId) {
        return repository;
    }
}
