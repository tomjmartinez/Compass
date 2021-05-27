package com.example.Project2.controllersTest;

import com.example.Project2.models.GeoCache;
import com.example.Project2.repos.GeoCacheRepo;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@WebMvcTest(value= GeoCacheControllerRead.class)
@ContextConfiguration(classes = GeoCacheControllerRead.class)
public class GeoCacheControllerReadTests {
    //Mockito mocks = new Mockito();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GeoCacheControllerRead geoController;

    @MockBean
    private GeoCacheRepo geoCacheRepo;

    @Before
    public void createMocks() {
        GeoCache geo1 = new GeoCache();
        GeoCache geo2 = new GeoCache();
        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);
        mockGeoList.add(geo2);

        ArrayList geoids = new ArrayList<String>();
        geoids.add("geo1");
        geoids.add("geo2");

        Map geoData = new HashMap<>();
        geoData.put("geocaches",mockGeoList);
        geoData.put("geoids", geoids);
    }

    @Test
    public void testingReadGeos() throws Exception {
        GeoCache geo1 = new GeoCache();
        GeoCache geo2 = new GeoCache();
        ArrayList<GeoCache> mockGeoList = new ArrayList<GeoCache>();
        mockGeoList.add(geo1);
        mockGeoList.add(geo2);

        ArrayList geoids = new ArrayList<String>();
        geoids.add("geo1");
        geoids.add("geo2");

        Map geoData = new HashMap<>();
        geoData.put("geocaches",mockGeoList);
        geoData.put("geoids", geoids);

        Mockito.when(
                geoCacheRepo.findAll()).thenReturn(mockGeoList);

        Mockito.when(
                geoController.readAllGeoCaches()).thenReturn(geoData);

        RequestBuilder rb = MockMvcRequestBuilders.get(
                "/my-app/api/all-geocaches").accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(rb).andReturn();

        System.out.println("tj's response reads:" + result.getResponse().getContentAsString());
        String expected1 = "";

        JSONAssert.assertEquals(expected1, result.getResponse().getContentAsString(), false);

    }
}
