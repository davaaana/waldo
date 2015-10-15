package com.monsource.waldo.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by nasanjargal on 6/7/15.
 */
public class SecurityHelper {
    public static AccountDetails getDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (AccountDetails) auth.getPrincipal();
    }
}
