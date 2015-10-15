package com.monsource.waldo.ws;

import com.monsource.waldo.dto.Result;
import com.monsource.waldo.helper.TransportationHelper;
import com.monsource.waldo.jpa.dao.TransportationDAO;
import com.monsource.waldo.jpa.entity.TransportationEntity;
import com.monsource.waldo.model.Transportation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 5/31/2015.
 */
@RestController
@RequestMapping("/transportations")
public class TransportationService {

    @Autowired
    TransportationDAO transportationDAO;

    @RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json")
    public Result get() {
        List<TransportationEntity> transportationEntities = transportationDAO.findAll();
        List<Transportation> transportations = TransportationHelper.convert(transportationEntities);

        return new Result(true, transportations);
    }

    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    @Transactional
    public Result add(@RequestBody Transportation transportation) {

        TransportationEntity transportationEntity = TransportationHelper.convert(transportation);

        transportationDAO.save(transportationEntity);

        return new Result(true);
    }

}
