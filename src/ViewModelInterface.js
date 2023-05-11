import User from './User'
import Bot from './Bot'
import EventHandler from './EventHandler';

export default class VMI {
    static _userList = [];
    static _botlist = [];
    static _settings = {};

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

    static async Init() {
        setTimeout(() => EventHandler.Instance().emit("updateRegisteredBotList"), 1000);
        setInterval(() => EventHandler.Instance().emit("updateOutputText"), 1000);
    }

    static async StartVote() {
        const request = { 
            mode: 'start'
        }

        await fetch ("http://localhost:40169/control", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        }); 

        EventHandler.Instance().emit("updateIsRunning");
    }

    static async StopVote() {
        const request = { 
            mode: 'stop'
        }

        await fetch ("http://localhost:40169/control", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        });
        
        EventHandler.Instance().emit("updateIsRunning");
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
          this.outputStrings.push(...(data["result"]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

        return this.outputStrings;
    }

    static async GetIsRunning() {
        const request = { 
            mode: 'status'
        }

        await fetch ("http://localhost:40169/control", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                if (response === "RUNNING") {
                    return true;
                } else if (response === "STOPPED") {
                    return false;
                } else {
                    throw new Error(`Unexpected response from server. Reponse was: ${response}`);
                }
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        }); 
    }

    static async GetUserList() {
        let users = [];

        let botNameToIds;

        await fetch ("http://localhost:40169/bots", {
            method: "GET"
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
        )
        .then((data) => {
            botNameToIds = data.result;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });


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
            let bots = [];

            for (const botEntry of user.bots_to_vote_for) {
                if (!(botEntry in botNameToIds)) {
                    console.log(`Tried to get a bot whose ID was not registered. Bot name is ${botEntry}`);
                    continue;
                }

                bots.push(new Bot(botEntry, botNameToIds[`${botEntry}`], "https://em-content.zobj.net/thumbs/120/noto-emoji/343/chicken_1f414.jpg"))
            }

            users.push(new User(user.discord_displayname, user.discord_email, user.discord_password, bots));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });


        console.log(users);

        return users;
    }
    
    static async AddUser(user) {
        const userdata = { 
            discord_displayname: user.username, 
            discord_username: user.email, 
            discord_password: user.password, 
            bots_to_vote_for: user.botsToVoteFor.map((bot) => bot.botName)
        }

        const mode = 'add';

        await fetch ("http://localhost:40169/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userData: userdata, mode: mode})
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        }); 

        EventHandler.Instance().emit("updateUserList");
    }
    
    static async RemoveUser(user) {
        const userdata = { 
            discord_displayname: user.username, 
            discord_username: user.email, 
            discord_password: user.password, 
            bots_to_vote_for: user.botsToVoteFor.map((bot) => bot.botName)
        }

        const mode = 'remove';

        await fetch ("http://localhost:40169/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userData: userdata, mode: mode})
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        }); 
        
        EventHandler.Instance().emit("updateUserList");
    }

    static async AddBot(bot) {
        const botData = { 
            botName: bot.botName, 
            botID: bot.botID
        }

        await fetch ("http://localhost:40169/bots", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(botData)
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
        )
        .catch((error) => {
            console.error("Error posting data:", error);
        });

        EventHandler.Instance().emit('updateRegisteredBotList');
    }

    static async GetBotList() {

        let botNameToIds;
        await fetch ("http://localhost:40169/bots", {
            method: "GET"
        })
        .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }
        )
        .then((data) => {
            botNameToIds = data.result;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
        let bots = [];

        for (const botName in botNameToIds) {
            bots.push(new Bot(
                botName, 
                botNameToIds[botName], 
                "https://em-content.zobj.net/thumbs/120/noto-emoji/343/chicken_1f414.jpg")
                )
        }

        return bots;
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


