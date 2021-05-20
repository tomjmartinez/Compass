package com.example.Project2.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection="geocaches")
public class GeoCache {
    @Id
    private ObjectId id;
    private float[] coordinates = new float[2];
    private String description;
    private String gifter; //Should this be of ObjectId type?
    private String reviewer; //Should this be of ObjectId type?
    private boolean approved;
    private String finder; //Should this be of ObjectId type?
    private boolean found;
    private long timeLimit;

    public GeoCache() {

    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public float[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(float[] coordinates) {
        this.coordinates = coordinates;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGifter() {
        return gifter;
    }

    public void setGifter(String gifter) {
        this.gifter = gifter;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getFinder() {
        return finder;
    }

    public void setFinder(String finder) {
        this.finder = finder;
    }

    public boolean isFound() {
        return found;
    }

    public void setFound(boolean found) {
        this.found = found;
    }

    public long getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(long timeLimit) {
        this.timeLimit = timeLimit;
    }

    @Override
    public String toString() {
        return "GeoCache{" +
                "id=" + id +
                ", coordinates=" + Arrays.toString(coordinates) +
                ", description='" + description + '\'' +
                ", gifter='" + gifter + '\'' +
                ", reviewer='" + reviewer + '\'' +
                ", approved=" + approved +
                ", finder='" + finder + '\'' +
                ", found=" + found +
                ", timeLimit=" + timeLimit +
                '}';
    }
}
