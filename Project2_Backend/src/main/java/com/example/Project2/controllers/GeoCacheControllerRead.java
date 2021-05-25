package com.example.Project2.controllers;

import com.example.Project2.models.GeoCache;
import com.example.Project2.repos.GeoCacheRepo;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerRead {
    private final Logger log = LoggerFactory.getLogger(GeoCacheControllerRead.class);

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;

    @RequestMapping(value = "/my-geocaches/{gifter}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readMyGeoCaches(@PathVariable String gifter){
        ObjectId gifterID = new ObjectId(gifter);
        List<GeoCache> results = geoCacheRepo.findAllByGifter(gifterID);
        log.debug("reading all geocaches for gifter" + gifter); //get session or current user
        return results;
    }

    @RequestMapping(value = "/all-geocaches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readAllGeoCaches(){
        List<GeoCache> results = geoCacheRepo.findAll();
        log.debug("reading all geocaches."); //get session or current user
        return results;
    }
}
