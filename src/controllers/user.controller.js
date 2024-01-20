import UserModel from "../models/user.model.js";
import JobModel from "../models/job.model.js";

export default class UserController{
    getRegister(req, res){
        res.render("register");
    }

    getLogin(req, res){
        res.render("login");
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login');
    }

    postLogin(req, res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
            return res.render("user-not-found");
        }
        req.session.userEmail = email;
        var jobs = JobModel.getAll();
        return res.render('jobs', {jobs: jobs, userEmail: req.session.userEmail});
    }

    logout(req, res){
        // on logout destroy the session
        req.session.destroy((err) => {
            if(err){
                console.log("logout error: ", err);
            }else{
                res.redirect('/');
            }
        });
    }
}