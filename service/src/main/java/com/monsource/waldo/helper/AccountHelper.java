package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.model.Account;
import com.monsource.waldo.model.AccountPassword;
import com.monsource.waldo.model.ContactAccount;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;

/**
 * Created by nasanjargal on 5/26/2015.
 */
public class AccountHelper {
    public static AccountEntity convert(Account account) {
        AccountEntity accountEntity = new AccountEntity();

        accountEntity.setUsername(account.getUsername());
        accountEntity.setPassword(account.getPassword());
        accountEntity.setFirstName(account.getFirstname());
        accountEntity.setLastName(account.getLastname());
        accountEntity.setEmail(account.getEmail());
        accountEntity.setPhone(account.getPhone());
        accountEntity.setEnabled(true);
        accountEntity.setRate(0d);

        accountEntity.setSalt(RandomStringUtils.random(32, true, true));

        return accountEntity;
    }

    public static Account convert(AccountEntity accountEntity) {
        Account account = new Account();

        account.setUsername(accountEntity.getUsername());
        account.setFirstname(accountEntity.getFirstName());
        account.setLastname(accountEntity.getLastName());
        account.setEmail(accountEntity.getEmail());
        account.setPhone(accountEntity.getPhone());

        return account;
    }

    public static void update(AccountEntity accountEntity, Account account) {
        accountEntity.setUsername(account.getUsername());
        if (account.getPassword() != null) {
            accountEntity.setPassword(account.getPassword());
        }
        accountEntity.setFirstName(account.getFirstname());
        accountEntity.setLastName(account.getLastname());
        accountEntity.setEmail(account.getEmail());
        accountEntity.setPhone(account.getPhone());
    }

    public static boolean checkPassword(AccountEntity accountEntity, AccountPassword accountPassword) {
        //todo check password with salt and md5
        return true;
    }

    public static void changePassword(AccountEntity accountEntity, String newPassword) {
        //todo change password with salt and md5
        accountEntity.setPassword(newPassword);
    }

    public static ContactAccount convertContact(AccountEntity accountEntity) {
        ContactAccount contactAccount = new ContactAccount();

        contactAccount.setUsername(accountEntity.getUsername());
        contactAccount.setName(String.format("%s %s", accountEntity.getLastName(), accountEntity.getFirstName().toUpperCase()));
        contactAccount.setPhone(accountEntity.getPhone());
        contactAccount.setEmail(accountEntity.getEmail());
        contactAccount.setRate(accountEntity.getRate().intValue());

        return contactAccount;
    }

    public static Account convert(Connection<?> connection) {
        Account account = new Account();

        if (connection.getApi() instanceof Facebook) {
            Facebook facebook = (Facebook) connection.getApi();
            User profile = facebook.userOperations().getUserProfile();
            account.setUsername(profile.getEmail());
            account.setPassword(RandomStringUtils.random(12, true, true));
            account.setFirstname(profile.getFirstName());
            account.setLastname(profile.getLastName());
            account.setPhone("тодорхойгүй");
            account.setEmail(profile.getEmail());
        }

        return account;
    }
}
