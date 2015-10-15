package com.monsource.waldo.ws;

import com.monsource.waldo.helper.LocationHelper;
import com.monsource.waldo.jpa.dao.CityDAO;
import com.monsource.waldo.jpa.dao.DistrictDAO;
import com.monsource.waldo.model.City;
import com.monsource.waldo.model.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 5/10/2015.
 */
@RestController
public class LocationService {

    @Autowired
    CityDAO cityDAO;

    @Autowired
    DistrictDAO districtDAO;

    @RequestMapping(value = "/location/city",headers="Accept=application/json")
    public List<City> getCities() {
        List<City> cities = LocationHelper.converterCity(cityDAO.findAll());
        return cities;
    }

    @RequestMapping(value = "/location/district/{id}",headers="Accept=application/json")
    public List<District> getDistrict(@PathVariable("id") int cityId) {
        List<District> districts = LocationHelper.converterDistrict(districtDAO.findByCityId(cityId));
        return districts;
    }
}
