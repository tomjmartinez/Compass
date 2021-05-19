package com.example.Project2.models;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GeoCacheRepo extends MongoRepository<GeoCache, ObjectId> {
}
