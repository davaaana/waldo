package com.monsource.waldo.security;

import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.entity.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Service
public class AuthService implements UserDetailsService {

    @Autowired
    AccountDAO accountDAO;

    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountEntity account = accountDAO.findByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("user not found : " + username);
        }
        return new AccountDetails(account);
    }
}
