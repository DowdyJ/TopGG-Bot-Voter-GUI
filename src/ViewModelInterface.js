//const { spawn } = require('child_process');
import User from './User'


export default class VMI {
    static _userList = [];
    static _botlist = [];
    static _settings = {};


    static loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula est eget tempor gravida. Nulla facilisi. Curabitur auctor leo sed ligula pretium, vel pharetra ante semper. Donec euismod fringilla urna, eu viverra leo blandit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porttitor risus augue, ac pretium nunc faucibus id. Sed pharetra, justo in pulvinar tristique, dolor arcu rhoncus sem, at euismod elit elit vel velit. Donec lobortis, lacus a vestibulum consequat, augue felis finibus leo, vel efficitur odio enim et nibh. Proin finibus eros justo, in sollicitudin eros tristique eu. Aliquam vulputate dui at tortor posuere, ut hendrerit felis molestie. Nam sed lectus quis nulla vestibulum tincidunt nec eget enim. Suspendisse potenti. Ut aliquam purus vitae est ullamcorper interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula est eget tempor gravida. Nulla facilisi. Curabitur auctor leo sed ligula pretium, vel pharetra ante semper. Donec euismod fringilla urna, eu viverra leo blandit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porttitor risus augue, ac pretium nunc faucibus id. Sed pharetra, justo in pulvinar tristique, dolor arcu rhoncus sem, at euismod elit elit vel velit. Donec lobortis, lacus a vestibulum consequat, augue felis finibus leo, vel efficitur odio enim et nibh. Proin finibus eros justo, in sollicitudin eros tristique eu. Aliquam vulputate dui at tortor posuere, ut hendrerit felis molestie. Nam sed lectus quis nulla vestibulum tincidunt nec eget enim. Suspendisse potenti. Ut aliquam purus vitae est ullamcorper interdum.";

    static ansiStrings = [
    '\x1b[31mRed text\x1b[0m',
    '\x1b[32mGreen text\x1b[0m',
    '\x1b[33mYellow text\x1b[0m',
    '\x1b[34mBlue text\x1b[0m',
    '\x1b[35mMagenta text\x1b[0m',
    '\x1b[36mCyan text\x1b[0m',
    '\x1b[91mBright red text\x1b[0m',
    '\x1b[92mBright green text\x1b[0m',
    '\x1b[93mBright yellow text\x1b[0m',
    '\x1b[94mBright blue text\x1b[0m',
    '\x1b[95mBright magenta text\x1b[0m',
    '\x1b[96mBright cyan text\x1b[0m',
    ];

    static lastSeenIndex = 0;
    static outputStrings = [
    ];

    // installationPath with last slash
    static StartVote(installationPath) {
        fetch("http://localhost:40169/users")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            return data;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
    
    static async GetOutputText() {
        await fetch("http://localhost:40169/log", {
            method: "GET",
            headers: {lastSeenIndex : VMI.lastSeenIndex}
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        return this.outputStrings;
    }

    static GetIsRunning() {
        return false;
    }

    static async GetUserList() {
        let users = [];
        await fetch("http://localhost:40169/users", {
            method: "GET"
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          for (const user of data.result) {
            users.push(new User(user.discord_displayname, user.discord_email, user.discord_password, user.bots_to_vote_for));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });


        console.log(users);

        return users;
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


