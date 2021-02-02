# retailoJobListing

## Description
This repository contains a job listing api. This application uses: Docker, Nodejs, MongoDB, NGINX. The application has the following functionalities:
* POST - used to post new job entries based on the example JSON format provided
* GET (trending) - returns trending=true job listings sorted by post date, batchwise
* GET (one by id) - requires id as an input and returns a single job entry
* DELETE (one by id) - requires id as an input and deletes a single job entry
Provided in the repository is a docker-compose and dockerfile to recreate this application on any system

## Execution
Shell commands to run:

    docker-compose build --no-cache
    docker-compose up -d

To scale services by changing number of web instances use:

    docker-compose scale web=3

To verify the integrity of the list of running services use:

    docker ps

To check status of “cluster_network”:

    docker network ls

To shutdown all running services:

    docker-compose down

## Routes
NGINX publishes to port 8080 and listens on 4000, allowing it to manage connections to multiple versions of the app that are spun up through the "docker-compose scale" command.
Included routes: 
* Uri for POST: http://localhost:4000/api/jobs
* Uri for GET trending: http://localhost:4000/api/jobs/trending
* Uri for GET one: http://localhost:4000/api/jobs/:id
* Uri for DELETE: http://localhost:4000/api/jobs/:id

Sample API POST request on Windows:

    Invoke-RestMethod 'http://localhost:4000/api/jobs/' -Method POST -Body '{"id": "123", "job_title": "Mechanical Systems Engineer", "company": "Plambee", "location": "New York", "post_date": "9/29/2020", "apply_email": "lcotton0@alibaba.com", "leave_type": "Monthly", "trending": "true"}' -ContentType 'application/json'

## k6 Testing
The scripts used for k6 load testing are provided in the repository. Two types of tests were performed: POST and GET.
Load testing for POST requests randomly generates the “id” and uses the information provided in the example to complete the remaining fields:
    File name: k6_load_testing_post.js
Load testing for GET requests:
    File name: k6_load_testing_get.js
The scripts contain adjustable variables such as: the number of virtual users (or VUs), the rate of requests, and the duration of the test.

## Notes
Rate limiting was implemented in the nginx.conf but requires further debugging.
