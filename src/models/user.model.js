export default class UserModel{
    constructor(id, name, email, passoword){
        this.id = id;
        this.name = name;
        this.email = email;
        this.passoword = passoword;
    }

    static add(name, email, password){
        const newUser = new UserModel(users.length+1, name, email, password);
        users.push(newUser);
    }

    static isValidUser(email, password){
        const result = users.find((user) => {
            return user.email === email && user.passoword === password;
        });
        return result;
    }
}

var users = [];