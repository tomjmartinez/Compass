package com.example.Project2.repos;

import com.example.Project2.models.GeoCache;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GeoCacheRepo extends MongoRepository<GeoCache, ObjectId> {
    List<GeoCache> findAllByGifter(ObjectId gifter);

    @Query("{$or: [{'finder': null}, {'finder': ''}, {'finder': {$exists: false}}]}")
    List<GeoCache> findAvail();
}
