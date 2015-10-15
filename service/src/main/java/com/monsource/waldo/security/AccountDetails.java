package com.monsource.waldo.security;

import com.monsource.waldo.jpa.entity.AccountEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

/**
 * Created by nasanjargal on 5/24/2015.
 */
public class AccountDetails implements UserDetails {

    AccountEntity account;

    public AccountDetails(AccountEntity account) {
        this.account = account;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new GrantedAuthority() {
            public String getAuthority() {
                return "ROLE_USER";
            }
        });
    }

    public String getPassword() {
        return account.getPassword();
    }

    public String getUsername() {
        return account.getUsername();
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return account.isEnabled();
    }

    public String getSalt() {
        return account.getSalt();
    }
}
