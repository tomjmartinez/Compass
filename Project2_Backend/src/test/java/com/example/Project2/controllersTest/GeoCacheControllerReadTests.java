package com.example.Project2.controllersTest;

import com.example.Project2.models.GeoCache;
import com.example.Project2.repos.GeoCacheRepo;
import org.bson.types.ObjectId;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
//import static org.mockito.Mockito.*;

import com.example.Project2.controllers.GeoCacheControllerRead;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GeoCacheControllerReadTests {

    private GeoCacheRepo geoCacheRepo = Mockito.mock(GeoCacheRepo.class);

    private GeoCacheControllerRead geoController = new GeoCacheControllerRead(geoCacheRepo);

    @Test
    public void testAllGeos() {
        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e9");
        geo1.setId(geoid1);

        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);

        Mockito.when(
                geoCacheRepo.findAll()).thenReturn(mockGeoList);
        Map expected = new HashMap();

        Map mapFound = geoController.readAllGeoCaches();

        ArrayList<String> resu = new ArrayList<String>();
        resu.add("60aaba9c761ccc0d2edc42e9");

        expected.put("geocaches", mockGeoList);
        expected.put("geoids", resu);

        Assert.assertEquals("not valid", expected.toString(), mapFound.toString());
    }

    @Test
    public void readMyGeoCachesTest(){
        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e9");
        geo1.setId(geoid1);

        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);

        Mockito.when(
                geoCacheRepo.findAllByGifter(geo1.getId())).thenReturn(mockGeoList);

        List expected = new ArrayList<>();
        expected.add(geo1);

        List listFound = geoController.readMyGeoCaches("60aaba9c761ccc0d2edc42e9");

        Assert.assertEquals("not valid", expected.toString(), listFound.toString());
    }

    @Test
    public void availGeoCachesTest(){
        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e9");
        geo1.setId(geoid1);

        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);

        Mockito.when(
                geoCacheRepo.findAvail()).thenReturn(mockGeoList);
        Map expected = new HashMap();

        Map mapFound = geoController.readAvailableGeoCaches();

        ArrayList<String> resu = new ArrayList<String>();
        resu.add("60aaba9c761ccc0d2edc42e9");

        expected.put("geocaches", mockGeoList);
        expected.put("geoids", resu);

        Assert.assertEquals("not valid", expected.toString(), mapFound.toString());
    }

    @Test
    public void readNearGeoCachesTest(){
        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e9");
        geo1.setId(geoid1);

        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);

        Mockito.when(
                geoCacheRepo.findNear(1, 1)).thenReturn(mockGeoList);

        List expected = new ArrayList<>();
        expected.add(geo1);


        Map coords = new HashMap();
        coords.put("lon",1d);
        coords.put("lat", 1d);

        List<GeoCache> mapFound = geoController.readNearGeoCaches(coords);

        Assert.assertEquals("not valid", expected.toString(), mapFound.toString());
    }

    @Test
    public void updateGeoCachesTest(){
        Map obj = new HashMap();
        obj.put("checkingOut", "60aaba9c761ccc0d2edc42e9");
        obj.put("currentUser", "user");

        GeoCache geo1 = new GeoCache();
        ObjectId geoid1 = new ObjectId("60aaba9c761ccc0d2edc42e4");


        Mockito.when(
                geoCacheRepo.findByFinder("user")).thenReturn(null);

        Mockito.when(
                geoCacheRepo.findById("60aaba9c761ccc0d2edc42e9")).thenReturn(geo1);

        String result = geoController.updateGeoCaches(obj);

        String expected = "60aaba9c761ccc0d2edc42e9";

        Assert.assertEquals("failed test", expected, result);

    }
}