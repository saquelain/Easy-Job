import JobModel from "../models/job.model.js";
import nodemailer from 'nodemailer';

export default class JobsController{

    getHome(req, res, next){
        res.render("home", {userEmail: req.session.userEmail});
    }

    getJobs(req, res, next){
        var jobs = JobModel.getAll();
        res.render("jobs", {jobs: jobs, userEmail: req.session.userEmail});
    }

    getJobDetails(req, res) {
        const jobId = req.params.id;
        const job = JobModel.getById(jobId);
        if(job){
            res.render("jobDetails", {job: job, userEmail: req.session.userEmail});
        }else{
            return res.render("home");
        }
    }

    getPostNewJob(req, res){
        res.render("post-new-job", {userEmail: req.session.userEmail});
    }

    getJobUpdate(req, res){
        const id = req.params.id;
        res.render("job-update", {jobId: id, userEmail: req.session.userEmail});
    }

    postUpdateJob(req, res){
        const id = req.params.id;
        const {companyName, jobCategory, jobDesignation, jobLocation, salary, totalOpenings, skills, applyBy} = req.body;
        var postTime = new Date().toUTCString();
        const updatedJob = new JobModel(
            id,
            companyName,
            jobCategory,
            jobDesignation,
            jobLocation,
            salary, 
            totalOpenings, 
            skills, 
            applyBy, 
            postTime
        );
        try{
            JobModel.update(updatedJob);
            console.log("job updated successfully");
        }catch(err){
            console.log("error updating job: ", err);
        }
        res.redirect('/jobs');
    }

    deleteJob(req, res){
        const id = req.params.id;
        JobModel.delete(id);
        res.redirect('/jobs');
    }

    postNewJob(req, res){
        const {companyName, jobCategory, jobDesignation, jobLocation, salary, totalOpenings, skills, applyBy} = req.body;
        var postTime = new Date().toUTCString();
        JobModel.add(companyName, jobCategory, jobDesignation, jobLocation, salary, totalOpenings, skills, applyBy, postTime);

        const jobs = JobModel.getAll();
        res.render('jobs', {jobs: jobs, userEmail: req.session.userEmail});
    }

    async postApply(req, res) {
        const {name, email, phone} = req.body;
        // nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'saquelain1502@gmail.com',
                pass: 'nilw opgr cbqq ders',
            }
        });
        const mailOptions = {
            from: 'saquelain1502@gmaill.com',
            to: email,
            subject: 'Applied Successfully',
            text: `${name}! You have successfully applied for the job.\nYour mobile number is ${phone}`
        };
        try{
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        }catch(err){
            console.log("Email not sent! Failed!", err);
        }
        res.redirect('/jobs');
    }
}