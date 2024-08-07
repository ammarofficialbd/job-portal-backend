import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
//console.log(jobId);
        if(!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false
            }) 
        }
        // check if the user already apply for the job
      
        const existApplication = await Application.findOne({job:jobId , applicant: userId});

        if(existApplication){
            return res.status(400).json({
                message: "Already Applied",
                success: false
            })
        }
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message: "job Not Found",
                success: false
            })
        }

      //  console.log(job);
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)

        await job.save()
        return res.status(201).json({
            message: "job Applied Successfully",
            success: true
        })     
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJob = async(req,res)=>{
    try {
        const userId = req.id;

        const application = await Application.find({applicant: userId}).sort({createdAt : -1}).populate({
            path : 'job',
            options:{sort: {createdAt:-1}},
            populate: {
                path: "company",
                options:{sort: {createdAt:-1}},
            }

        })
    if(!application){
        return res.status(404).json({
            message: "No Application",
            success: false
        })
    }
return res.status(200).json({
    application,
    success: true
})   

    } catch (error) {
        
    }
}

//for admin how many people applied in jobs

export const getApplicants = async(req,res) => {
  try {
    const {id} = req.params;

    const job = await Job.findById(id).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate: {
            path:'applicant',
        }
    })

    if(!job){
        return res.status(404).json({
            message: "Job Not Found",
            success: false
        })
    }

return res.status(200).json({
    job,
    success: true
})   
  } catch (error) {
    console.log(error);
  }

}

export const updateStatus = async(req,res) =>{
    try {
        const {status} =req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is missing",
                success: false
            })
        }
        //find the application by applicant id 

        const application = await Application.findOne({_id : applicationId})
        if(!application){
            return res.status(400).json({
                message: "Application not found",
                success: false
            })
        }

        //update Status 
        application.status = status.toLowerCase();

        await application.save()
        return res.status(200).json({
            message: "Application Update Successfully",
            success: false
        })
    
    } catch (error) {
     console.log(error);   
    }
}