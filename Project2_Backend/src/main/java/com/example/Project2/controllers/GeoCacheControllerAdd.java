package com.example.Project2.controllers;

import com.example.Project2.models.*;
import com.example.Project2.repos.GeoCacheRepo;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.*;
import java.util.List;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerAdd {
    private final Logger log = LoggerFactory.getLogger(GeoCacheControllerAdd.class);

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;



    @PostMapping(value="/newGeoCache")
    ResponseEntity<GeoCache> createGeoCache(@RequestBody String json) throws URISyntaxException, JsonProcessingException {
        System.out.println(json);
        ObjectMapper objectMapper = new ObjectMapper();
        GeoCache newCache = objectMapper.readValue(json, GeoCache.class);
        GeoCache result = geoCacheRepo.save(newCache);
        System.out.println(result);
        return ResponseEntity.created(new URI("api/geoCache" + result.getId().toString()))
                .body(result);
    }
}
