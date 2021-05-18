# Compass
> Revature Team Web Project #2

## Table of contents
* [General info](#general-info)
* [User Stories](#user-stories)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
GeoCaching app allows gifters to hide gifts and seekers to retrieve them in GPS locations.

## User Stories
gifter:
([ ]) user can create account
([ ]) user can choose a place on map and start a geocache
([ ]) can set your own custom rules 
([ ]) custom rule: amt of seeker given an opporunity to seek it (optional)
([ ]) mystery or text description (picture) option

seeker:
([ ]) can look up available caches and select one at time
([ ]) updates found cache
([ ]) can post picture of item found

admin-reviewer:
([ ]) approve/deny caches if they are safely located.


## To-do list:
> List of features ready and TODOs for future development
## Features
>How it works
* creates queue system where one person can choose a geomap that they find on the map.  The cache will be available for finder for only a certain amount of time. if they can't find it, it opens opportunity for other users
* roles: gifter, seeker, (admin-reviewer).
* query for nearby geocaches in mongodb
* point system, rating system (if it takes some time to find, you get more points)
* (enough distance between each cache)
* (certain locations not allowed)

## Views
* LoginPage: Login + Logout (usertype based) button.
* omepage: view checked out geocache.  find new geocache near me. check my published geocashes.
* Checked-Out View:
* Find-GeoCaches-Near:
* My-Published-GeoCaches:
* New-Geocache:
* AdminReview:

## Technologies
* Java 8
* Google Maps API
* Spring MVC / VertX
* ReactJS
* MongoDB (geospatial queries)

## Screenshots
![Example screenshot](./img/screenshot.png)

## Setup
(Describe how to install / setup your local environement / add link to demo version.)

## Code Examples
Show examples of usage:
`put-your-code-here`

## Status
_Work In Progress_

## Inspiration
Credits to Codecademy for clearly explaining the differences of CSS positioning rules..

## Contacts/Collaborators
Created by:
Tomas "TJ" Martinez[@tomjmartinez](https://www.github.com/tomjmartinez)
Kevin Altieri[@KAltieri](https://www.github.com/tomjmartinez/KAltieri)
Emmanuel Garcia[@basic-sombrero](https://www.github.com/tomjmartinez/basic-sombrero)