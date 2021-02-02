module.exports = app => {
    const jobs = require("../controller/job.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Job
    router.post("/", jobs.create);
  
    // Retrieve all trending Jobs
    router.get("/trending", jobs.findAllTrending);

    // Retrieve a single Job with id
    router.get("/:id", jobs.findOne);
  
    // Delete a Job with id
    router.delete("/:id", jobs.delete);

    app.use('/api/jobs', router);
  };
