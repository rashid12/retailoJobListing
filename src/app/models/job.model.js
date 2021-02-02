// job.model.js
module.exports = mongoose => {
    const Job = mongoose.model(
      "job",
      mongoose.Schema(
        {
            id: String,
            job_title: String,
            company: String,
            location: String,
            post_date: Date,
            apply_email: String,
            leave_type: String,
            trending: Boolean
        },
        { timestamps: true }
      )
    );
    
    return Job;
  };