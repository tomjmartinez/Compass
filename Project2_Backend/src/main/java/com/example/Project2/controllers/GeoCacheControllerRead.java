package com.example.Project2.controllers;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.User;
import com.example.Project2.repos.GeoCacheRepo;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map readAllGeoCaches(){
        ArrayList<GeoCache> results = (ArrayList<GeoCache>) geoCacheRepo.findAll();

        ArrayList<String> resultIds = new ArrayList<String>();
        for(int i = 0; i < results.size(); i++){
            resultIds.add(results.get(i).getId().toString());
        }

        Map listPack = new HashMap();
        listPack.put("geocaches", results);
        listPack.put("geoids", resultIds);

        log.debug("reading all geocaches."); //get session or current user
        return listPack;
    }

    @RequestMapping(value = "/avail-geocaches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map readAvailableGeoCaches(){
        List<GeoCache> avail = geoCacheRepo.findAvail();

        ArrayList<String> resultIds = new ArrayList<String>();
        for(int i = 0; i < avail.size(); i++){
            resultIds.add(avail.get(i).getId().toString());
        }

        Map listPack = new HashMap();
        listPack.put("geocaches", avail);
        listPack.put("geoids", resultIds);
        log.debug("reading all available geocaches."); //get session or current user
        return listPack;
    }

    @RequestMapping(method = RequestMethod.POST,value = "/near-geocaches",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readNearGeoCaches(@RequestBody Map obj){
        double lon = (double) obj.get("lon");
        double lat = (double) obj.get("lat");
        List<GeoCache> nearGeos = geoCacheRepo.findNear(lon, lat);

        log.debug("populating nearby geocaches from " + lon + " " + lat);
        return nearGeos;
    }

    @RequestMapping(method = RequestMethod.POST,value = "/checkout-geocache", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateGeoCaches(@RequestBody Map obj){
        String success = "false";

        String checkingOut = (String) obj.get("checkingOut");
        String currentUser = (String) obj.get("currentUser");

        try {
            GeoCache geo2RemoveFinder = geoCacheRepo.findByFinder(currentUser);
            if(geo2RemoveFinder != null) {
                geo2RemoveFinder.setFinder(null);
                geoCacheRepo.save(geo2RemoveFinder);
            }
        }catch(Exception e){
            e.printStackTrace();
        }

            GeoCache geo2Update = geoCacheRepo.findById(checkingOut);
            geo2Update.setFinder(currentUser);
            geoCacheRepo.save(geo2Update);


        if(geo2Update != null) {
            success = checkingOut;
            log.debug("updated geocache " + checkingOut + " checkout to " + currentUser);
        } else {
            success = "false";
            log.debug("failed to update geocache " + checkingOut + " checkout to " + currentUser);
        }

        return success;
    }
}
