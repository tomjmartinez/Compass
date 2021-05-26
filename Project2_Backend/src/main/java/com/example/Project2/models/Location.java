package com.example.Project2.models;

import lombok.*;

@Data
public class Location {

    private String type = "point";
    private double[] coordinates;

    Location () {}

    Location (double lat, double lng) {
        coordinates = new double[]{lat, lng};
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
    }
}
