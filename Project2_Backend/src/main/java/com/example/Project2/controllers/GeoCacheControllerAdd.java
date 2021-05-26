package com.example.Project2.controllers;

import com.example.Project2.models.*;
import com.example.Project2.repos.GeoCacheRepo;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.google.gson.*;
import com.mongodb.client.model.geojson.*;
import org.json.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.*;
import java.util.*;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerAdd {
    private final Logger log = LoggerFactory.getLogger(GeoCacheControllerAdd.class);

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;

    @PostMapping(value="/newGeoCache")
    public ResponseEntity<String> createGeoCache(@RequestBody String json) throws URISyntaxException, JsonProcessingException, JSONException {
        System.out.println(json);
        Gson gson = new Gson();
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
        System.out.println(result);
        return ResponseEntity.created(new URI("api/geoCache" + result.getId().toString()))
                .body(result.getId().toString());
    }
}