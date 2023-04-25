export default class User {
    constructor(username, email, password, botsToVoteFor) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.botsToVoteFor = botsToVoteFor;
    }
}