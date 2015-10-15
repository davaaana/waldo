package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.PolicyEntity;
import com.monsource.waldo.model.Policy;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 7/5/15.
 */
public class PolicyHelper {

    public static List<Policy> convertToModel(List<PolicyEntity> policyEntities) {

        List<Policy> policies = new ArrayList<Policy>();

        if (policyEntities != null) {
            for (PolicyEntity policyEntity : policyEntities) {
                Policy policy = new Policy();
                policy.setId(policyEntity.getId());
                policy.setPolicy(policyEntity.getPolicy());
                policies.add(policy);
            }
        }

        return policies;
    }

    public static List<PolicyEntity> convertToEntity(List<Policy> policies) {
        List<PolicyEntity> policyEntities = new ArrayList<PolicyEntity>();

        for (Policy policy : policies) {
            System.out.println("policy = " + policy.getId());
            PolicyEntity policyEntity = new PolicyEntity();
            policyEntity.setId(policy.getId());
            policyEntities.add(policyEntity);
        }

        return policyEntities;

    }
}
