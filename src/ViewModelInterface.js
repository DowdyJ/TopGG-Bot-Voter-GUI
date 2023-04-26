import User from "./User";


export default class VMI {
    static _userList = [];
    static _botlist = [];
    static _settings = {};


    static loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula est eget tempor gravida. Nulla facilisi. Curabitur auctor leo sed ligula pretium, vel pharetra ante semper. Donec euismod fringilla urna, eu viverra leo blandit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porttitor risus augue, ac pretium nunc faucibus id. Sed pharetra, justo in pulvinar tristique, dolor arcu rhoncus sem, at euismod elit elit vel velit. Donec lobortis, lacus a vestibulum consequat, augue felis finibus leo, vel efficitur odio enim et nibh. Proin finibus eros justo, in sollicitudin eros tristique eu. Aliquam vulputate dui at tortor posuere, ut hendrerit felis molestie. Nam sed lectus quis nulla vestibulum tincidunt nec eget enim. Suspendisse potenti. Ut aliquam purus vitae est ullamcorper interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula est eget tempor gravida. Nulla facilisi. Curabitur auctor leo sed ligula pretium, vel pharetra ante semper. Donec euismod fringilla urna, eu viverra leo blandit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porttitor risus augue, ac pretium nunc faucibus id. Sed pharetra, justo in pulvinar tristique, dolor arcu rhoncus sem, at euismod elit elit vel velit. Donec lobortis, lacus a vestibulum consequat, augue felis finibus leo, vel efficitur odio enim et nibh. Proin finibus eros justo, in sollicitudin eros tristique eu. Aliquam vulputate dui at tortor posuere, ut hendrerit felis molestie. Nam sed lectus quis nulla vestibulum tincidunt nec eget enim. Suspendisse potenti. Ut aliquam purus vitae est ullamcorper interdum.";
    static GetOutputText() {
        return VMI.loremIpsum;
    }

    static GetIsRunning() {
        return false;
    }

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
        VMI._botlist.push(bot);
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


