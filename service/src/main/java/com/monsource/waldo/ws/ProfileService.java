package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.AccountHelper;
import com.monsource.waldo.jpa.dao.AccountDAO;
import com.monsource.waldo.jpa.dao.TokenDao;
import com.monsource.waldo.jpa.entity.AccountEntity;
import com.monsource.waldo.jpa.entity.TokenEntity;
import com.monsource.waldo.jpa.entity.type.Provider;
import com.monsource.waldo.model.Account;
import com.monsource.waldo.model.AccountPassword;
import com.monsource.waldo.security.SecurityHelper;
import com.monsource.waldo.social.SocialSignInAdapter;
import com.monsource.waldo.social.SocialUserConnectionRepository;
import org.apache.commons.io.IOUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionData;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Date;

/**
 * Created by nasanjargal on 5/26/2015.
 */
@RestController
@RequestMapping("/profile")
public class ProfileService {

    @Autowired
    AccountDAO accountDAO;

    @Autowired
    TokenDao tokenDao;

    @Autowired
    SocialSignInAdapter adapter;

    @Autowired
    ServletContext ctx;

    @Autowired
    HttpSession session;


    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @Transactional
    public Result signUp(@RequestBody Account account) {
        AccountEntity accountEntity = accountDAO.findByUsername(account.getUsername());
        if (accountEntity != null) {
            return new Result(false, "Хэрэглэгчийн нэр үүссэн байна!");
        }

        accountEntity = AccountHelper.convert(account);

        accountDAO.save(accountEntity);

        return new Result(true);
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = "application/json")
    @Transactional
    public Result update(@RequestBody Account account) {
        AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

        if (accountEntity == null) {
            return new Result(false, "Хэрэглэгч олдсонгүй");
        }

        AccountHelper.update(accountEntity, account);

        accountDAO.save(accountEntity);

        return new Result(true);
    }

    @RequestMapping(value = "/password", method = RequestMethod.POST, consumes = "application/json")
    @Transactional
    public Result changePassword(@RequestBody AccountPassword accountPassword) {
        AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

        if (accountEntity == null) {
            return new Result(false, "Хэрэглэгч олдсонгүй");
        }

        if (AccountHelper.checkPassword(accountEntity, accountPassword)) {

            AccountHelper.changePassword(accountEntity, accountPassword.getNewPassword());

            accountDAO.save(accountEntity);
            return new Result(true);
        }

        return new Result(false, "Can't change your password. Your passwords is not valid !!!");
    }

    @RequestMapping(method = RequestMethod.GET)
    public Result getProfile() {

        AccountEntity accountEntity = SecurityHelper.getDetails().getAccount();

        Account account = AccountHelper.convert(accountEntity);

        return new Result(true, account);
    }

    @RequestMapping(value = "image/{username}.png", method = RequestMethod.GET)
    public void getImage(@PathVariable String username, HttpServletResponse response) throws IOException {
        File image = new File(ctx.getRealPath("WEB-INF/image/account/" + username + ".png"));
        if (!image.exists()) {
            image = new File(ctx.getRealPath("WEB-INF/image/unknown.png"));
        }

        FileInputStream imageStream = new FileInputStream(image);
        response.setContentType("image/png");
        IOUtils.copy(imageStream, response.getOutputStream());
    }

    @RequestMapping(value = "image", method = RequestMethod.POST)
    public Result setImage(@RequestParam("image") MultipartFile image) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        BufferedImage src = ImageIO.read(image.getInputStream());
        BufferedImage resize = Scalr.resize(src, 100);

        ImageIO.write(resize, "png", new File(ctx.getRealPath("WEB-INF/image/account/" + username + ".png")));

        return new Result(true);
    }


    @RequestMapping(value = "/social/signin")
    public void signIn(HttpServletResponse response) throws IOException {
        response.sendRedirect("/");
    }

    @RequestMapping(value = "/social/signup")
    @Transactional
    public void signUp(HttpServletResponse response) throws IOException {
        Connection<?> connection = (Connection<?>) session.getAttribute(SocialUserConnectionRepository.SOCIAL_CONNECTION_ATTRIBUTE);
        Account account = AccountHelper.convert(connection);
        Result result = this.signUp(account);
        if (result.isSuccess()) {
            try {
                AccountEntity accountEntity = accountDAO.findByUsername(account.getUsername());

                ConnectionData data = connection.createData();
                TokenEntity tokenEntity = new TokenEntity();

                tokenEntity.setAccessToken(data.getAccessToken());
                tokenEntity.setRefreshToken(data.getRefreshToken());
                tokenEntity.setExpireDate(new Date(data.getExpireTime()));
                tokenEntity.setProvider(Provider.valueOf(connection.getKey().getProviderId().toUpperCase()));
                tokenEntity.setAccount(accountEntity);
                tokenEntity.setUserId(data.getProviderUserId());
                tokenDao.save(tokenEntity);
                adapter.signIn(accountEntity.getId() + "", connection, null);
                response.sendRedirect("/");
                return;

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        response.sendError(500, "Холболт үүсгэхэд алдаа гарлаа.");
    }

}
