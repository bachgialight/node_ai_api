const Job = require("../models/job")

module.exports = {
    createJob: async (req,res) => {
        const newJob = new Job(req.body);

        try {
            const saveJob = await newJob.save();
            const {__v,createAt,updateAt,...newJobInfo} = saveJob._doc;
            res.status(200).json(newJobInfo)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateJob: async (req,res)=> {
        try {
            const updateJob = await Job.findByIdAndUpdate(req.params.id,
                {$set: req.body},
                {new:true}
            );
            const {__v,createAt,updateAt,...updateJobInfo} = updateJob._doc;
            res.status(200).json(updateJobInfo);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    deleteJob: async (req,res)=> {
        try {
            await Job.findByIdAndDelete(req.params.id)

            res.status(200).json("Job Successfully Deleted");
        } catch (error) {
            res.status(500).json(error);
            
        }
    },

    getJob: async (req,res)=> {
        try {
            const job= await Job.findById(req.params.id)

            res.status(200).json(job);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },

    getAllJob: async (req,res)=> {
        try {
            const job= await Job.find()

            res.status(200).json(job);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },

    searchJobs: async (req,res)=> {
        try {
            const result = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "appsearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },

}