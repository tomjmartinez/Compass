package com.example.Project2.controllers;
/**
 * Represents the GeoController Class
 * @author Kevin Altieri
 */
import org.springframework.web.bind.annotation.*;
import com.example.Project2.models.*;
import com.example.Project2.repos.GeoCacheRepo;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.json.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.*;

import java.net.*;
import java.util.*;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerAdd {
    private final Logger log = LoggerFactory.getLogger(GeoCacheControllerAdd.class);

    /**
     * @param geoCacheRepo The GeoCacheRepo being used
     */
    public GeoCacheControllerAdd(GeoCacheRepo geoCacheRepo){
        this.geoCacheRepo = geoCacheRepo;
    }

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;

    /**
     * @param json The input string.  Contains a description, a double array of 2 coordinates, a long time limit and a gifter object id in the form of a string
     * @return The new GeoCache
     * @throws URISyntaxException
     * @throws JsonProcessingException
     * @throws JSONException
     */

    @PostMapping(value="/newGeoCache")
    public GeoCache createGeoCache(@RequestBody String json) throws URISyntaxException, JsonProcessingException, JSONException {
        log.info("Creating a new geocache with: " + json);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(json, HashMap.class);

        List<Double> coords = new ArrayList<>((ArrayList<Double>)(map.get("coordinates")));
        GeoJson test = new GeoJsonPoint(coords.get(1), coords.get(0));

        GeoCache newCache = new GeoCache();
        newCache.setLocation(test);
        newCache.setDescription(map.get("description").toString());
        newCache.setTimeLimit(Long.parseLong(map.get("timeLimit").toString()));
        newCache.setGifter(map.get("gifter").toString());

        GeoCache result = geoCacheRepo.save(newCache);
        return result;
    }
}