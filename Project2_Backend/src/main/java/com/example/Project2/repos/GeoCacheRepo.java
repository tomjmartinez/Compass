package com.example.Project2.repos;

import com.example.Project2.models.GeoCache;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GeoCacheRepo extends MongoRepository<GeoCache, ObjectId> {
    List<GeoCache> findAllByGifter(ObjectId gifter);
}
