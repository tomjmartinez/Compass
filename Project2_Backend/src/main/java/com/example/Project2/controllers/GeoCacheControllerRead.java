package com.example.Project2.controllers;

import com.example.Project2.Project2BackendApplication;
import com.example.Project2.models.GeoCache;
import com.example.Project2.models.User;
import com.example.Project2.repos.GeoCacheRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.json.JSONObject;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author: Tomas TJ Martinez
 * Class represents all the endpoints that the application listens to
 * in order to serve incoming http geocache requests
 */
@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class GeoCacheControllerRead {
    public static final Logger log = LogManager.getLogger(GeoCacheControllerRead.class.getName());

    public GeoCacheControllerRead(GeoCacheRepo geoCacheRepo){
        this.geoCacheRepo = geoCacheRepo;
    }

    @Autowired
    private GeoCacheRepo geoCacheRepo;// = null;

    /**
     * serves all geocaches created by passed in user in database
     * @param gifter represents creator of geocaches
     * @return List of all geocaches created by user
     */
    @RequestMapping(value = "/my-geocaches/{gifter}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readMyGeoCaches(@PathVariable String gifter){
        List<GeoCache> results = geoCacheRepo.findAllByGifter(gifter);
        log.info("reading all geocaches for gifter" + gifter); //get session or current user
        return results;
    }

    /**
     * serves a single geocache by passed id in database
     * @param id represents a single geocache id
     * @return List of all geocaches created by user
     */
    @RequestMapping(value = "/geocache/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public GeoCache getGeoCache(@PathVariable String id){
        System.out.println(id);
        GeoCache result = geoCacheRepo.findById(new ObjectId(id)).orElse(null);
        log.debug("got a single geocache: " + result); //get session or current user
        return result;
    }

    /**
     * function serves all geocaches in database
     * @return Map represenation of geocache and their id
     */
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
        log.info("read all geocaches in database");
        Project2BackendApplication.rootLogger.info("read all geos");
        return listPack;
    }

    /**
     * function serves all geocaches available in database
     * @return Map representation: list of available geocaches and list of their ids strings
     */
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

    /**
     * serves a list of all geocaches near passed longitude and latitude points
     * @param obj Map contains longitude and latitude points
     * @return All geocaches in db in order from nearest to furthest
     */
    @RequestMapping(method = RequestMethod.POST,value = "/near-geocaches",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GeoCache> readNearGeoCaches(@RequestBody Map obj){
        System.out.println(obj.toString());
        double lon = (double) obj.get("lon");
        double lat = (double) obj.get("lat");
        List<GeoCache> nearGeos = geoCacheRepo.findNear(lon, lat);

        System.out.println(nearGeos);
        log.debug("populating nearby geocaches from " + lon + " " + lat);
        return nearGeos;
    }

    /**
     * checks-out a geocache for a user and replaces
     * @param obj Map: string id of geocache checking out and
     * string username of user checking it out
     * @return String false if couldn't update geocache or String with id of geocache
     * updated in the database
     */
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
