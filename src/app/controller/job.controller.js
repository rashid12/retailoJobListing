const db = require("../models");
const Job = db.jobs;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Job
    const j = new Job({
      id: req.body.id,
      job_title: req.body.job_title,
      company: req.body.company,
      location: req.body.location,
      post_date: req.body.post_date,
      apply_email: req.body.apply_email,
      leave_type: req.body.leave_type,
      trending: req.body.trending ? req.body.trending : false
    });
  
    // Save Job in the database
    j
      .save(j)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Job."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Job.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Job with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Job with id=" + id });
      });
};

exports.findAllTrending = (req, res) => {
    
      // allow access to resources
      Job.find({ trending: true })
      .batchSize(100)
      .then(data => {
        sorted = data.sort((a,b)=>a['post_date'].getTime()-b['post_date'].getTime());
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobs."
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Job.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
          });
        } else {
          res.send({
            message: "Job was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Job with id=" + id
        });
      });
};
