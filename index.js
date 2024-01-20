import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import JobsController from './src/controllers/jobs.controller.js';
import UserController from './src/controllers/user.controller.js';
import { auth } from './src/middlewares/auth.middleware.js';

const app = express();
const jobsController = new JobsController();
const userController = new UserController();


// global middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

// jobs controller
app.get('/jobs', jobsController.getJobs);
app.get('/', jobsController.getHome);
app.get('/post-new-job', auth, jobsController.getPostNewJob);
app.get('/job/:id', jobsController.getJobDetails);
app.post('/apply', jobsController.postApply);
app.post('/postJob', jobsController.postNewJob);
app.get('/job/update/:id', jobsController.getJobUpdate);
app.post('/updateJob/:id', jobsController.postUpdateJob);
app.get('/job/delete/:id', jobsController.deleteJob);

// user controller
app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

app.listen(3100, ()=> {
    console.log("app is listening on port 3100");
});