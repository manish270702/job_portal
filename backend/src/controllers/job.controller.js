const jobModel = require("../models/job.model")
exports.createjob =async (req,res)=>{
    const {title,location,company,salary,jobtype} = req.body

    const user = req.user
    // console.log(user); 

    if(user.role=="student"){
        return res.status(401).json({
            message:"UnAuthorised user"
        })
    }

    const jobAlreadyCreated = await jobModel.findOne({title, company})

    if(jobAlreadyCreated){
        return res.status(409).json({
            message:"Job already posted"
        })
    }
    const newJob = await jobModel.create({
        title,location,company,salary,jobtype,recruiterId:user._id
    }) 

    res.status(201).json({
        message:"job created successfully",
        newJob
    })



    // console.log(title,location,company,salary,user._id,jobtype)
}

exports.showjobs = async (req,res)=>{
    const page = req.query.page
    const limit = req.query.limit

    const skipIndex = (page-1)*limit
    // console.log(page)

    const [data, totalJobs] = await Promise.all([
            jobModel.find().sort({ title: -1 }).skip(skipIndex).limit(limit),
            jobModel.countDocuments()
        ]);

    const totalPages = Math.ceil(totalJobs / limit);
    res.status(200).json({
        message:"jobs fetched",
        data,
        pagination:{
            length:totalJobs,
            pages:totalPages,
            currentPage:page,
            limit
        }
    })
}
