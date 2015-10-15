package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.PolicyHelper;
import com.monsource.waldo.jpa.dao.PolicyDAO;
import com.monsource.waldo.jpa.entity.PolicyEntity;
import com.monsource.waldo.model.Policy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by nasanjargal on 7/5/15.
 */
@RestController
@RequestMapping("/policy")
public class PolicyService {

    @Autowired
    PolicyDAO policyDAO;

    @RequestMapping(method = RequestMethod.GET)
    public Result get() {
        List<PolicyEntity> policyEntities = policyDAO.findAll();
        List<Policy> policies = PolicyHelper.convertToModel(policyEntities);
        return new Result(true, policies);
    }

}
