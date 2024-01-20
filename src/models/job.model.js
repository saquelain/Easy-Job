export default class JobModel {
    constructor(id, companyName, jobCategory, jobDesignation, jobLocation, salary, totalOpenings, skills, applyBy, postTime="2023-08-23") {
      this.id = id;
      this.companyName = companyName;
      this.jobCategory = jobCategory;
      this.jobDesignation = jobDesignation;
      this.jobLocation = jobLocation;
      this.salary = salary;
      this.totalOpenings = totalOpenings;
      this.skills = skills;
      this.applyBy = applyBy;
      this.postTime = postTime;
    }
  
    static getAll() {
      return jobs;
    }
  
    static update(jobObj) {
      const index = jobs.findIndex(
        (p) => p.id == jobObj.id
      );
      jobs[index] = jobObj;
    }
  
    static delete(id) {
      const index = jobs.findIndex(
        (p) => p.id == id
      );
      jobs.splice(index, 1);
    }
  
    static add(companyName, jobCategory, jobDesignation, jobLocation, salary, totalOpenings, skills, applyBy, postTime) {
      let newJob = new JobModel(
        jobs.length + 1,
        companyName,
        jobCategory,
        jobDesignation,
        jobLocation,
        salary,
        totalOpenings,
        skills,
        applyBy,
        postTime,
      );
      jobs.push(newJob);
    }
  
    static getById(id) {
      return jobs.find((p) => p.id == id);
    }
  }

var jobs = [
    new JobModel(
        1,
        'Coding Ninjas',
        'Tech',
        'SDE',
        'Gurgaon HR IND Remote',
        '14-20lpa', 
        '5', 
        ['React','NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], 
        '11/8/2023, 12:00:00 PM', 
        '11/6/2023, 12:39:06 PM'
    ),
    new JobModel(
        2,
        'Go Digit',
        'Tech',
        'Angular Developer',
        'Pune IND On-Site',
        '6-10lpa', 
        '10', 
        ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], 
        '12/12/2023, 12:00:00 PM', 
        '12/8/2023, 12:39:06 PM'
    ),
    new JobModel(
        3,
        'Juspay',
        'Tech',
        'SDE',
        'Bangalore IND',
        '20-26lpa', 
        '7', 
        ['React','NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], 
        '12/7/2023, 12:00:00 PM', 
        '16/4/2023, 12:39:06 PM'
    ),
];
