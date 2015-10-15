package com.monsource.waldo.helper;

import com.monsource.waldo.jpa.entity.TransportationEntity;
import com.monsource.waldo.model.Transportation;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nasanjargal on 5/31/2015.
 */
public class TransportationHelper {
    public static List<Transportation> convert(List<TransportationEntity> transportationEntities) {
        List<Transportation> transportations = new ArrayList<Transportation>();

        for (TransportationEntity transportationEntity : transportationEntities) {
            Transportation transportation = new Transportation();
            transportation.setId(transportationEntity.getId());
            transportation.setName(transportationEntity.getName());
            transportations.add(transportation);
        }

        return transportations;
    }

    public static TransportationEntity convert(Transportation transportation) {

        TransportationEntity transportationEntity = new TransportationEntity();
        transportationEntity.setId(transportation.getId());
        transportationEntity.setName(transportation.getName());

        return transportationEntity;
    }
}
