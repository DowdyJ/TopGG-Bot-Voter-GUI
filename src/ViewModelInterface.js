import User from "./User";


export default class VMI {
    static _userList = [];
    static _botlist = [];
    static _settings = {};

    static GetUserList() {
        return VMI._userList;
    }
    
    static AddUser(user) {
        VMI._userList.push(user);
    }
    
    static RemoveUser(user) {
        VMI._userList = VMI._userList.filter(u => u != user);
    }

    static AddBot(bot) {
        this._botlist.push(bot);
    }

    static GetBotList() {
        return VMI._botlist;
    }

    static SetSetting(key, value) {
        VMI._settings[key] = value;
    }

    static PrintSettings() {
        console.log(VMI._settings)
    }

    static WriteSettings() {

    }

    static ReadSettings() {

    }




}


