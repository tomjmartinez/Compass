package com.example.Project2.controllersTest;

import com.example.Project2.controllers.*;
import com.example.Project2.models.GeoCache;
import com.example.Project2.repos.GeoCacheRepo;
import org.bson.types.ObjectId;
import org.json.*;
import org.junit.*;

import org.junit.Test;
import org.mockito.*;
import org.mockito.stubbing.*;
import org.springframework.data.mongodb.core.geo.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class GeoCacheControllerAddTests {

    private GeoCacheRepo geoCacheRepo = mock(GeoCacheRepo.class);

    private GeoCacheControllerAdd geoController = new GeoCacheControllerAdd(geoCacheRepo);

    @Test
    public void testAddGeoCache() throws Exception {
        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e9");
        geo1.setId(geoid1);
        JSONObject input = new JSONObject();
        List<Double> coords = new ArrayList<>();
        coords.add(40.94);
        coords.add(40.57);
        input.put("coordinates", coords);
        input.put("description", "testing");
        input.put("timeLimit", 60);
        input.put("gifter", "Kevin");

        GeoCache cache = new GeoCache();
        cache.setDescription("testing");
        cache.setLocation(new GeoJsonPoint(coords.get(1), coords.get(0)));
        cache.setTimeLimit(60);
        cache.setGifter("Kevin");

        when(geoCacheRepo.save(any(GeoCache.class))).thenReturn(cache);

        GeoCache test = geoController.createGeoCache(input.toString());
        Assert.assertEquals(test.getLocation(), cache.getLocation());
        Assert.assertEquals(test.getDescription(), cache.getDescription());
        Assert.assertEquals(test.getId(), cache.getId());
        Assert.assertEquals(test.getTimeLimit(), cache.getTimeLimit());
    }
}
