package com.example.Project2.repos;

import com.example.Project2.models.GeoCache;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GeoCacheRepo extends MongoRepository<GeoCache, ObjectId> {
    List<GeoCache> findAllByGifter(ObjectId gifter);
    List<GeoCache> findAllByGifter(String gifter);

    GeoCache findById(String id);

    @Query("{$or: [{'finder': null}, {'finder': ''}, {'finder': {$exists: false}}]}")
    List<GeoCache> findAvail();

    @Query("{location : {$near: {$geometry: {type: 'Point', coordinates: [?0, ?1] } }}}")
    List<GeoCache> findNear(double lon, double lat);

    @Query("{finder: {$eq: ?0}}")
    GeoCache findByFinder(String currentUser);
}
