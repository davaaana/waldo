package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.CityEntity;
import com.monsource.waldo.jpa.entity.DistrictEntity;
import com.monsource.waldo.model.City;
import com.monsource.waldo.model.District;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 5/10/2015.
 */
public class LocationHelper {

    public static List<City> converterCity(List<CityEntity> cityEntities) {
        ArrayList<City> cities = new ArrayList<City>();

        for (CityEntity cityEntity : cityEntities) {
            City city = new City();
            city.setId(cityEntity.getId());
            city.setName(cityEntity.getName());
//            city.setDistricts(converterDistrict(cityEntity.getDistricts()));
            cities.add(city);
        }

        return cities;
    }

    public static List<District> converterDistrict(List<DistrictEntity> districtEntities) {
        ArrayList<District> districts = new ArrayList<District>();
        for (DistrictEntity districtEntity : districtEntities) {
            District district = new District();
            district.setId(districtEntity.getId());
            district.setName(districtEntity.getName());
            districts.add(district);
        }

        return districts;
    }

}
