package com.example.Project2.controllers;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.GeoCacheRepo;
import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerRead {
    private final Logger log = LoggerFactory.getLogger(GeoCacheControllerRead.class);

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;


    @RequestMapping(value = "/my-geocaches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readMyGeoCaches(){
        List<GeoCache> results = geoCacheRepo.findAll();
        System.out.println(results);
        log.debug("reading all geocaches for"); //get session or current user
        return results;
    }
}
