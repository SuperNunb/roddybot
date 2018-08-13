const Discord = require('discord.js');
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./roddyLog.sqlite");
const recentWithdraw = new Set();
const recentImg = new Set();
bot.login(process.env.token);
let prefix = ">";
bot.setMaxListeners(100);

const houseOfRoddy = "382890077627613185";
const games = ["with my programming", "with my invisible dog", "with fire", "Microsoft Chrome", "games on the beach", "on my free Nitro"];
const status = ['idle', 'online', 'dnd'];
const gamesChoose = Math.floor(Math.random() * games.length);
const statusChoose = Math.floor(Math.random() * status.length);
bot.once('ready', () => {
    bot.user.setActivity(games[gamesChoose]);
    bot.user.setStatus(status[statusChoose]);
    console.log("BRACE YOURSELVES, RODDY IS COMING...");
});

bot.on("error", err => {
    if (err.message.startsWith("read ECONNRESET")) console.log(err.message);
    else console.log(err);
});

let addRoddyCoin = (thisOH, rC, rA) => {
    sql.run(`UPDATE "${rA}" SET balance = balance + ${rC} WHERE userId = ${thisOH}`);
}

bot.on("guildCreate", guild => {
    sql.run(`CREATE TABLE "${guild.id}" (userId TEXT, balance INTEGER, username TEXT)`).then(() => {
        console.log(`Joined New Server: ${guild.name}`);
        console.log(`Members include: `);
        guild.members.map(g => {
            console.log(g.user.username);
            console.log(`    id: ${g.user.id}`);
            sql.run(`INSERT INTO "${guild.id}" (userId, balance, username) VALUES(?, ?, ?)`, [g.user.id, 500, g.user.username]);
        });
    });
});

bot.on('message', message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("hue")) {
        message.channel.send('https://gph.is/2ptOMX0');
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "ping")) {
        let paddle = message.content.slice(6, message.content.length);
        if (message.content.includes("@")) {
            message.channel.send(paddle + ", pong!");
            addRoddyCoin(message.author.id, 5, message.guild.id);
        } else {
            message.channel.send("Pong!");
            addRoddyCoin(message.author.id, 5, message.guild.id);
        }
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "help") || message.content.startsWith(prefix + "commands") || message.content.startsWith(prefix + "info")) {
        const comList1 = [
        "**>bacta** gives you bacta",
        "**>help** helps you out",
        "**>roll** rolls a die",
        "**>flip** Roddy flips a coin",
        "**>ice cream** gives you ice cream",
        "**>pizza** gives you pizza",
        "**>drink** gives you a drink",
        "**>joke** tells you a joke (I do not claim that these are my jokes. They all belong to other people.)",
        "**>shirt** picks out a shirt for you and tells you if you survive",
        "**>punch {your target here}** punches a user",
        "**>slap {your target here}** slaps a user",
        "**>shoot {your target here}** shoots a user",
        "**>stab {your target here}** stabs a user",
        "**>hug {your target here}** hugs a user",
        "**>kiss {your traget here}** kisses a user",
        "**>heart {your target here}** gives a user your heart",
        "**>rickroll** dances for you",
        "**>asdf** bakes you a pie",
        "**>guess {your number guess here}** guesses Roddy's number (which doesn't change until bot is restarted)",
        "**>rps {rock, paper, or scissors here}** Roddy plays rock, paper, scissors with you",
        "**>spin** spins the wheel and gives you a prize",
        "**>ping** pings the bot"
        ];
        const comList2 = [
        "**>uptime** tells you how long the bot has been online since restarting", 
        "**>chase** chases you or anyone you mention after the command",
        "**>scare** scares you or anyone you want to scare",
        "**>planet** picks a random planet in our solar system as your destination",
        "   **>planet sw** picks a random planet in the Star Wars galaxy as your destination",
        "**>balance/>bal** shows how many RoddyCoins you currently have",
        "**>payday** gives you 100 RoddyCoins for free, you can only use it once every 12 hours",
        "**>rank** gives you a leaderboard made of RoddyCoins for the server",
        " ",
        "**Random Image Commands** send a random picture from the chosen category (DM SuperNunb to submit more pictures for categories, or category ideas) The commands are:",
        ">dog, >cat, >mountain, >beach, >tree, >sw",
        " ",
        "There are also hidden commands if you can find them. Hint: they don't have a prefix."
        ];
        console.log(comList1.join("\n").length);
        console.log(comList2.join("\n").length);
        message.channel.send(`${message.author}, I sent you some info.`);
        message.author.send({
            embed: {
                title: `No need to fear, RoddyBot is here!`,
                color: 3447003,
                description: `Hello, I am Roddy. I can play games with you, make fun of you if you really want, and so much more!`,
                fields: [{
                    name: "**Did you know?**",
                    value: "You can earn RoddyCoins by playing games with Roddy."
                }, {
                    name: "**Commands Part 1**",
                    value: comList1.join("\n")
                }, {
                    name: "**Commands Part 2**",
                    value: comList2.join("\n")
                }, {
                    name: "**P.S.**",
                    value: "If you want to invite me to your server, go [**here.**](https://discordapp.com/api/oauth2/authorize?client_id=297367881736519692&permissions=1678244929&scope=bot)\n To join the support server, go [**here.**](https://discord.gg/A9HnryA)"
                }]
            }
        });
        addRoddyCoin(message.author.id, 30, message.guild.id);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if(message.content.includes("gtg" && message.guild.id == "379371294560354304")) {
        message.reply("Cya!");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if(message.content === "bye" && message.guild.id == "379371294560354304") {
        message.reply("Good Bye...");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if ((message.content == "cya" || message.content == "cya!" || message.content == "Cya" || message.content == "Cya!") && message.guild.id == "379371294560354304") {
        message.reply("Bye!");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if ((message.content.includes("I am Groot") || message.content.includes("I am groot") || message.content.includes("i am groot") || message.content.includes("i am Groot"))) {
        message.channel.send("**I AM GROOT.**");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.includes("Excelsior!") || message.content.includes("excelsior!")) {
        message.channel.send("https://gph.is/2uNdruT");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.includes("tahiti")) {
        message.channel.send("It's a magical place.");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "language")) {
        message.channel.send("https://goo.gl/CS3K2U");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "asdf")) {
        const pie = [
            "https://gph.is/15xZFZl", //PIE FLAVOR
            "https://gph.is/15rK0cD", //THE FLOP
            "https://gph.is/18DLjXi", //MINE TURTLE
            "https://gph.is/18Nw8Op", //I LIKE TRAINS
            "https://gph.is/1Ma5Fdj", //CEREAL
            "https://gph.is/28LzNxR", //CARROTS
            "https://gph.is/15rK6Rr", //MUFFIN FACTORY
            "https://gph.is/18Nv510", //PARKING METER
            "https://gph.is/XHBWCW", //STANDING UP SCHOOL
            "https://gph.is/1tgl1If", //STEGOSAURUS
        ];
        let marmite = Math.floor(Math.random() * pie.length);
        message.channel.send(pie[marmite]);
        marmite;
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if(message.content.startsWith((prefix + "bacta"))) {
        if (message.content.includes("@")) {
            message.channel.send("Here, " + message.content.slice(7, message.content.length) + "! ***130 HEALTH***");
        } else {
        message.reply('here! ***130 HEALTH***');
        }
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content == (prefix + "roll")) {
        let roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send(`I rolled the dice for you and rolled a ${roll}`);
        addRoddyCoin(message.author.id, 25, message.guild.id);
    }
});

bot.on('message', (message) => {
    let penny = ["Heads!", "Tails!"];
    const nickel = Math.floor(Math.random() * penny.length);
    if (message.channel.type == "dm") return;
    else if (message.content == prefix + "flip" || message.content == "heads or tails?") {
        message.channel.send("http://gph.is/2j4SPq3");
        message.channel.send(penny[nickel]);
        nickel;
        addRoddyCoin(message.author.id, 25, message.guild.id);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "ice cream")) {
        let flavor = [
            "have a scoop of chocolate ice cream. :ice_cream:", 
            "have a scoop of vanilla ice cream. :ice_cream:", 
            "have a scoop of strawberry ice cream. :ice_cream:",
            "have a scoop of pistachio ice cream. :ice_cream:",
            "have a scoop of mint ice cream. :ice_cream:", 
            "have a scoop of cookie dough ice cream. :ice_cream:",
            "have a scoop of moose tracks ice cream :ice_cream:",
            "have a scoop of ice cream :ice_cream:"
        ];
        const scoop = Math.floor(Math.random() * flavor.length);
        if (message.content.includes("@")) {
            message.channel.send(message.content.slice(11, message.length) + ', ' + flavor[scoop]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        } else {
            message.reply(flavor[scoop]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        }
        scoop;
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "drink")) {
        let flavor = [
            "have a glass of milk.",
            "have a bottle of water.",
            "have a glass of juice.",
            "have a can of Coke.",
            "have a can of Pepsi.",
            "have a glass of hot cocoa.",
            "have a can of ginger ale.",
            "have a can of root beer.",
            "have a glass of poison.",
            "have a glass of chocolate milk.", 
            "have a glass of iced tea.",
            "have a glass of blue milk.", 
            "have a glass of lemonade.",
            "have a mug of hot tea.", 
            "have a glass of apple cider.",
            "have an empty glass.",
            "have a glass half full.",
            "have a glass half empty.",
            "have a glass of hand sanitizer.",
            "have a bottle of beer.",
            "have a glass of wine.",
            "have some vodka.",
            "have a smoothie.", 
        ];
        const ice = Math.floor(Math.random() * flavor.length);
        if (message.content.includes("@")) {
            message.channel.send(message.content.slice(7, message.length) + ', ' + flavor[ice]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        } else {
            message.reply(flavor[ice]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        }
        ice;
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if(message.content.startsWith(prefix + "pizza")) {
        let topping = [
            "have a slice of cheese pizza. :pizza:",
            "have a slice of pepperoni pizza. :pizza:",
            "have a slice of sausage pizza. :pizza:",
            "have a slice of BBQ chicken pizza. :pizza:",
            "have a slice of Hawaiian pizza. :pizza:",
            "have a slice of vegetarian pizza. :pizza:",
        ];
        let slice = Math.floor(Math.random() * topping.length);
        if (message.content.includes("@")) {
            message.channel.send(message.content.slice(7, message.length) + ', ' + topping[slice]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        } else {
            message.reply(topping[slice]);
            addRoddyCoin(message.author.id, 15, message.guild.id);
        slice;
        }
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if(message.content.startsWith(prefix + "joke") || message.content.startsWith("tell me a joke")) {
        const puns = [
            'What is the difference between a cat and a comma? One has claws at the end of its paws and the other is a pause at the end of a clause.', 
            'Why did the little boy bury his flashlight? Because the batteries died.', 
            'The energizer bunny was arrested on a charge of battery.', 
            "What's Forrest Gump’s password? 1forrest1", 
            "Can a kangaroo jump higher than the Empire State Building? Of course. The Empire State Building can't jump.", 
            'Star Wars fans, who shot first? Not you!', 
            'A blind man walks into a bar...and gets a concussion.',
            'What kind of pumpkins watch over you? Body-gourds.',
            'What do you call prisoners who take their own mugshots? Cellfies',
            'What do you call a motor with ears? Engineers', "What's the best thing about living in Switzerland? I don't know, but the flag is a big plus.", 
            "I tried to take a photograph of some fog. Mist.",
            "What kind of bagel can fly? A plain bagel.", 
            "What do you call an italian spy? An impasta.", 
            "Knock knock. Who's there? A bot; go make some friends.",
            "You see that clock? I ain't got time for this.",
            "Did you get a haircut? No, I got them all cut.",
            "Wanna hear a joke about paper? Never mind, it's tearable.", 
            "Did you hear about the restaurant on the moon? Great food, zero atmosphere.",
            "This cemetery looks crowded, people must be dying to get in.", 
            "I'm not indecisive. Unless you want me to be.", 
            "What did one cell say to his sister cell when she stepped on his toe? Mitosis!",
            "Accordion to a recent survey, replacing words in a sentence with the names of musical instruments goes unnoticed."
            ];
        const yolk = Math.floor(Math.random() * puns.length);
        message.channel.send(puns[yolk]);
        yolk;
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "punch")) {
        let slam = message.content.slice(7, message.length);
        message.channel.send(`${slam} just got punched! Ow! :open_mouth:`);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "shoot")) {
        let slam = message.content.slice(7, message.length);
        message.channel.send(`Oh no! ${slam} just got shot! :dizzy_face:`);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "stab")) {
        let slam = message.content.slice(6, message.length);
        message.channel.send(`${slam} just got stabbed! :grimacing:`);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "slap")) {
        let slam = message.content.slice(6, message.length);
        message.channel.send(`${slam} just got slapped! That must have hurt! :astonished:`);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "hug")) {
        let slam = message.content.slice(5, message.length);
        message.channel.send(`${slam} just got hugged! Aww! :blush:`);
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "kiss")) {
        let slam = message.content.slice(6, message.length);
        message.channel.send(`${slam} just got kissed by ${message.author}! :heart_eyes:`);
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "heart")) {
        let slam = message.content.slice(7, message.length);
        message.channel.send(`${message.author} just gave ${slam} their heart! :blush:`);
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "rickroll")) {
        message.channel.send('https://gph.is/28X33CD');
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "say ") && message.author.id == "233686115712892929") {
        message.channel.send(message.content.slice(5, message.content.length));
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else {
        let color = [
        "You get a red shirt. Sorry, you won't survive! :grimacing: :dizzy_face: ",
        "You get a red shirt. Sorry, you won't survive! :grimacing: :dizzy_face: ",
        "You get a red shirt. Sorry, you won't survive! :grimacing: :dizzy_face: ",
        "You get a blue shirt. Yay, you'll survive! :grinning:  ",
        "You get a yellow shirt. Yay, you'll survive! :grinning:  ",
        "You get a green shirt. Yay, you'll survive! :grinning:  ",
        ];
        let fabric = Math.floor(Math.random() * color.length);
        let kirk = color[fabric]; 
        let negResp = "You lost 100 RoddyCoins.";
        let posResp = "You won 50 RoddyCoins.";
        let spock = () => {
            message.channel.send(kirk);
            fabric;
            if (kirk == color[0] || kirk == color[1] || kirk == color[2]) {
                addRoddyCoin(message.author.id, -100, message.guild.id);
                message.channel.send(negResp);
            } else {
                addRoddyCoin(message.author.id, 50, message.guild.id);
                message.channel.send(posResp);
            }
        }
        if (message.content.startsWith(prefix + "shirt")) spock();
    }
});

const number = Math.round(Math.random() * 1000);
bot.on('message', message => {
    if (message.channel.type == "dm") return;
    else {
        let myNumber = parseFloat(message.content.slice(7, message.content.length));
        if (message.content.startsWith(prefix + "guess")) {
            console.log("......................................");
            console.log(number);
            if (message.content.length <= 7) {
                message.channel.send("Please guess a number after the command.");
                myNumber;
            } 
            if (message.content.includes("@")) { 
                message.channel.send("Users are not numbers!");
            } 
            if (myNumber > 1000) {
                message.channel.send("Roddy's number is not higher than 1000.");
                myNumber;
            } 
            if (myNumber < 0) {
                message.channel.send("Roddy's number is not negative.");
                myNumber;
            } 
            if (myNumber > number) {
                message.channel.send('Your guess is too high. Guess again.');
                myNumber;
                addRoddyCoin(message.author.id, 15, message.guild.id);
            }
            if (myNumber < number) {
                message.channel.send('Your guess is too low. Guess again.');
                myNumber;
                addRoddyCoin(message.author.id, 15, message.guild.id);
            }
            if (myNumber == number) {
                message.channel.send('Congratulations! You guessed my number! Have a RoddyCoin!');
                addRoddyCoin(message.author.id, 250, message.guild.id);
                myNumber;
            }
        }
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else {
        let winRps = () => {
            addRoddyCoin(message.author.id, 25, message.guild.id);
            message.channel.send("Have 5 RoddyCoins, " + message.author + "!");
        }
        if (message.content.startsWith(prefix + "rps")) {
            const rock = ["rock", "paper", "scissors", "Roddy"];
            let paper = rock[Math.floor(Math.random() * rock.length - 1)];
            const scissors = message.content.slice(5, message.content.length);
            let winner = NaN;
            function decisionRG() {
                message.channel.send("You chose " + scissors + ". I chose " + paper + ". " + winner);
                winRps();
                paper;
            };
            if (scissors == rock[0]) { //your guess is rock
                if (paper == rock[0]) { //Roddy's guess is rock
                    winner = "No one wins!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                } else if (paper == rock[1]) { //Roddy's guess is paper
                    winner = "I win!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                } else if (paper == rock[2]) { //Roddy's guess is scissors
                    winner = "You win!";
                    decisionRG();
                }
            } else if (scissors == rock[3]) {
                message.channel.send("Roddy is not a weapon!");
            } else if (scissors == rock[1]) { //your guess is paper
                if (paper == rock[0]) { //Roddy's guess is rock
                    winner = "You win!";
                    decisionRG();
                } else if (paper == rock[1]) { //Roddy's guess is paper
                    winner = "No one wins!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                } else if (paper == rock[2]) { //Roddy's guess is scissors
                    winner = "I win!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                }
            } else if (scissors == rock[2]) { //your guess is scissors
                if (paper == rock[0]) { //Roddy's guess is rock
                    winner = "I win!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                } else if (paper == rock[1]) { //Roddy's guess is paper
                    winner = "You win!";
                    decisionRG();
                } else if (paper == rock[2]) { //Roddy's guess is scissors
                    winner = "No one wins!";
                    decisionRG();
                    addRoddyCoin(message.author.id, 15, message.guild.id);
                }
            } 
            else if (scissors.includes("@")) {
                message.channel.send("Users cannot be used to fight!");
            } 
            else if (message.content.length <= 4) {
                message.channel.send("Please guess rock, paper, or scissors.");
            } else {
                message.channel.send("Please guess rock, paper, or scissors, after the command '>rps'.");
            }
        }
    }
});

bot.on('message', message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "spin")) {
        const prizeList = ["a shiny new brick!", "a vacation to Mordor!", "a glass bottle to the head!", "a week of standing on your head!", "a chance to get in a crash!", "a jar of dirt!"];
        let prized = Math.floor(Math.random() * prizeList.length);
        let prize = prizeList[prized];
        message.channel.send('http://gph.is/2yLommu');
        const spun = () => {
            message.channel.send(message.channel.send('You get ' + prize));
            addRoddyCoin(message.author.id, 50, message.guild.id);
            prized;
        }
        setTimeout(spun, 4000);
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("RODDY!")) {
        message.channel.send("WHAT?!?!?!?");
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("hola") && message.guild.id == "379371294560354304") {
        message.channel.send('Hola, ' + message.author + '!');
    }
});

bot.on('message', (message) => {
    if (message.channel.type == "dm") return;
    else if (message.content =="hello" && message.guild.id == "379371294560354304") {
        message.channel.send('Hello, ' + message.author + '!');
    }
});

bot.on('guildMemberAdd', member => {
    if (message.channel.type == "dm") return;
    else if (member.guild.id == 379371294560354304) {
        member.guild.channels.get('379398355232620545').send('**' + member.user + "** has joined the server! :smiley: ");
        const botBuddy = member.guild.roles.find('name', 'Bot Buddies');
        member.addRole(botBuddy);
    }
});

bot.on("guildMemberRemove", member => {
    if (message.channel.type == "dm") return;
    else if (member.guild.id == '379371294560354304') {  
        bot.guilds.get("379371294560354304").channels.get('379398355232620545').send('**' + member.user + "** has left the server! :frowning: ");
    }
});

bot.on("guildBanAdd", guild => {
    if (message.channel.type == "dm") return;
    else if (guild.id == "379371294560354304") {
        guild.channels.get("379398355232620545").send("Oh, no! Someone's been banned!");
    }
});

bot.on("messageDelete", message => {
    if (!message.channel.type == "dm") {
        console.log("......................................");
        let newJag = message.content;
        let splitJag = newJag.split(" ");
        if (message.content.length > 200) newJag = splitJag[0] + " " + splitJag[1] + " " + splitJag[2] + "......" + splitJag[splitJag.length - 1]; 
        console.log("A message saying " + newJag + ", sent by " + message.author.username + " was deleted on " + message.channel.name + '.');
        console.log('MESSAGE DELETED: ');
        console.log("   " + newJag);
        console.log("   AUTHOR: " + message.author.username);
        console.log("   LOCATION: ");
        console.log("      SERVER: " + message.channel.guild.name);
        console.log("      CHANNEL: " + message.channel.name);
    }
});

bot.on('message', message => {
    if (message.channel.type == "dm") return;
    else {
        hThere = false;
        if (message.content.startsWith("hello there") || message.content.startsWith("Hello there") || message.content.startsWith("Hello There")) {
            message.channel.send('General ' + message.author + '!');
        }
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "uptime")) {
        let botSec = bot.uptime / 1000;
        let botMin = botSec / 60;
        if (botSec <= 60) {
            message.channel.send(botSec + " seconds");
            botSec;
        } if (botSec > 60) {
            message.channel.send(botMin.toFixed(3) + ' minutes');
            botSec;
        }
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.includes('uh-oh') || message.content.includes('uh oh') || message.content.includes("trap")) {
        message.channel.send('https://media.giphy.com/media/lk0TFUdop2JTW/giphy.gif');
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("execute order 66") || message.content.startsWith("Execute Order 66")) {
        message.channel.send('It will be done, ' + message.author + '.');
        message.channel.send("*BANS EVERYONE*");
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.includes("I sense")) {
        message.channel.send("I don't sense anything.");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "chase")) {
        const finale = () => {
            const possibleOutcomes = ["I got you, you little-  Hey! Come back here!", "Where'd they go??"];
            message.channel.send(possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)]);
        }
        let victim = message.author;
        if (message.content.length > 6 && message.content.includes("@")) {
            victim = message.content.slice(7, message.content.length);
        }
        message.channel.send("Watch out, " + victim + "! I'm gonna get you!");
        setTimeout(finale, 3000);
    } else if (message.content.startsWith(prefix + "chase")) {
        const finale = () => {
            const possibleOutcomes = ["I got you, you little-  Hey! Come back here!", "Where'd they go??"];
            message.channel.send(possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)]);
            addRoddyCoin(message.author.id, 50, message.guild.id);
        }
        let victim = message.author;
        if (message.content.length > 6 && message.content.includes("@")) {
            victim = message.content.slice(7, message.content.length);
        }
        message.channel.send("Watch out, " + victim + "! I'm gonna get you!");
        winChase();
        setTimeout(finale, 3000);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "scare") && message.member.hasPermission("SEND_TTS_MESSAGES")) {
        const smokeScreen = ["THINK FAST!", "BOO!", "SURPRISE!"];
        let smoke = Math.floor(Math.random() * smokeScreen.length);
        const mist = smokeScreen[smoke];
        if (message.content.length < 7) {
            message.channel.send(mist, {tts:true});
        } else if (message.content.length > 7 && message.content.includes("@")) {
            let scream = message.content.slice(7, message.content.length);
            message.channel.send(scream + ", " + mist, {tts: true});
        } else if (message.content.startsWith(prefix + "scare")) {
            message.channel.send("Sorry, you don't have permission for that.");
        }
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("he is risen!")) {
        message.channel.send("He is risen indeed! Hallelujah!");
    } else if (message.content.startsWith("God is good")) {
        message.channel.send("all the time.");
    }  else if (message.content.startsWith("and all the time")) {
        message.channel.send("God is good.");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("Hey Roddy") || message.content.startsWith("hey roddy") || message.content.startsWith("hey Roddy")) {
        message.channel.send("What do you want already?!");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content == "Roddy!" || message.content == "roddy!") {
        message.channel.send("Yes, " + message.author + "?");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("rOdDy") || message.content.startsWith("RoDdY")) {
        message.channel.send("wElL, HeLlO sIr");
        }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content =="there" || message.content == "There") {
        message.author.send("Where?");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content == 'roddy' || message.content == 'Roddy' || message.content == 'roddy.' || message.content == 'Roddy.') {
        message.channel.send('*goes back to sleep*');
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.author.id == "297367881736519692") {
        console.log("......................................");
        let finA = message.content;
        let splitFinA = message.content.split(" ");
        if (message.content.length > 200) finA = (splitFinA[0] + " " + splitFinA[1] + " " + splitFinA[2] + "......" + splitFinA[splitFinA.length - 1]); 
        console.log("RODDY SAID:");
        console.log(finA);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "crash")) {
        message.channel.send("Sorry, but Roddy doesn't like to crash on command.");
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith("do it") || message.content.startsWith("Do it") || message.content.startsWith("Do It") || message.content.startsWith("DO IT")) {
        message.channel.send('https://media.giphy.com/media/rjLINlGpJYvvO/giphy.gif');
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.includes('<@!233686115712892929>') || message.content.includes('<@&379401181266444293>')) {
        console.log('*************************************');
        console.log('*************************************');
        console.log('*************************************');
        console.log("HEY, YOU'RE NEEDED ON #" + message.channel.name.toUpperCase() + ", ON " + message.guild.name.toUpperCase() + "!");
        console.log('*************************************');
        console.log('*************************************');
        console.log('*************************************');
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
    else if (message.content.includes("nien nunb") || message.content.includes("Nien Nunb") || message.content.includes("Nien nunb") || message.content.includes("Pancake Face") || message.content.includes("pancake face")) {
        console.log('*************************************');
        console.log('*************************************');
        console.log('*************************************');
        console.log('Your EXPERTISE IS NEEDED ON #' + message.channel.name.toUpperCase() + ", ON " + message.guild.name.toUpperCase() + "!");
        console.log('*************************************');
        console.log('*************************************');
        console.log('*************************************');
    } 
});

bot.on("message", message => {
    let solar = null;
    let map = null;
    const solarUS = ["the Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "the Moon", "the dwarf planet Pluto", "a black hole"];
    const solarSW = ["Tatooine", "Hoth", "Endor", "Yavin", "Yavin 4", "Naboo", "Coruscant", "Sullust", "Mustafar", 
                    "Kashyyyk", "Bespin", "Dagobah", "Jakku", "Takodana", "Crait", "Cantonica", "Ahch-To", 
                    "Alderaan", "Kamino", "Mon Cala", "Rodia", "Kessel", "Christophsis", "Corellia", "D'Qar", 
                    "Dantooine", "Eadu", "Scarif", "Fondor", "Geonosis", "Utapau", "Ilum", "Lothal", "Mandalore", 
                    "Nal Hutta", "Ryloth", "Toydaria", "Trandosha", "Vardos"];
    if (message.channel.type == "dm") return;
    else if (message.guild.id == "438354040493965312" || message.content == prefix + "planet sw") {
        solar = solarSW;
    } else {
        solar = solarUS;
    }
    let galaxy = Math.floor(Math.random() * solar.length);
    let coOp1 = Math.floor(Math.random() * 500);
    let coOp2 = Math.floor(Math.random() * 500);
    let coOp3 = Math.floor(Math.random() * 500);
    let moon = "**" + solar[galaxy] + "**";
    const mapUS = [('Preparing for landing on ' + moon + " in 3...2...1!"), (message.author + ", your destination is " + moon + "."), ("Preparing for launch towards " + moon + "...Preparations complete.")];
    const mapSW = [(message.author + ", prepare to make a hyperspace jump to " + moon + "!"), (message.author + ", brace for impact on the surface of " + moon + "!"), ((message.author + ", the rendezvous point is located on " + moon + "."))];
    let coords = "**Coordinates:** X: " + coOp1 + ", Y: " + coOp2 + ", Z: " + coOp3;
    if (message.guild.id == "438354040493965312" || message.content == prefix + "planet sw") {
        map = mapSW;
    } else {
        map = mapUS;
    }
    let nav = Math.floor(Math.random() * map.length);
    let targeting = map[nav];
    if (message.content.startsWith(prefix + "planet")) {
        message.channel.send(targeting);
        message.channel.send(coords);
        addRoddyCoin(message.author.id, 15, message.guild.id);
    }
    galaxy;
    nav;
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else {
        let baleUnc = (stringLen) => {
            sql.get(`SELECT * FROM "${message.guild.id}" WHERE userId = "${message.author.id}"`).then(row => {
                message.channel.send(`${message.author}, you currently have a whopping ${row.balance} RoddyCoins!`);
            });
        }
        if (message.content.startsWith(prefix + "balance"))  baleUnc(8);
        else if (message.content.startsWith(prefix + "bal"))  baleUnc(4);
        if (message.content.startsWith(prefix + "money"))  baleUnc(6);
        if (message.content.startsWith(prefix + "coins"))  baleUnc(6);
        else if (message.content.startsWith(prefix + "coin"))  baleUnc(5);
        if (message.content.startsWith(prefix + "RoddyCoins"))  baleUnc(11);
        else if (message.content.startsWith(prefix + "RoddyCoin"))  baleUnc(10);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "payday")) {
        if (recentWithdraw.has(message.author.id)) {
            message.channel.send(`${message.author}, the payday command can only be used once by each user within 12 hours.`);
        } else {
            sql.run(`UPDATE "${message.guild.id}" SET balance = balance + 100 WHERE userId = ${message.author.id}`);
            sql.get(`SELECT DISTINCT * FROM "${message.guild.id}" WHERE userId = ${message.author.id}`).then(row => {
                message.channel.send(`${message.author}, you now have ${row.balance} RoddyCoins.`);
            });
            recentWithdraw.add(message.author.id);
            setTimeout(() => {
                recentWithdraw.delete(message.author.id);
            }, 43200000);
        }
    }
});

bot.on("guildMemberAdd", member => {
    if (message.channel.type == "dm") return;
    else {
        sql.run(`INSERT INTO "${message.guild.id}" (userId, balance, username) VALUES(?, ?, ?)`, [member.id, 500, member.user.username]);
        if (member.guild.id == "379371294560354304") member.guild.channels.get(houseOfRoddy).send(`${member.user}, you have 500 RoddyCoins`);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else {
        const boards = (stringLen) => {
            sql.all(`SELECT DISTINCT * FROM "${message.guild.id}" ORDER BY balance DESC LIMIT 20`).then(rows => {
                let leaders = ``;
                rows.forEach(function (row) {
                    leaders += `**${row.username}:** ${row.balance} RoddyCoins\n`
                });
                message.channel.send({
                    embed: {
                        title: `__**${rows.length} Wealthiest RoddyCoin Cardholders in the Server**__`,
                        color: 3447003,
                        description: `${leaders} \n\n For a full list, say ">rank all".`
                    }
                });
            });
        }
        const boardsFull = (stringLen) => {
            sql.all(`SELECT DISTINCT * FROM "${message.guild.id}" ORDER BY balance DESC`).then(rows => {
                let leaders = ``;
                rows.forEach(function (row) {
                    leaders += `**${row.username}:** ${row.balance} RoddyCoins\n`
                });
                message.author.send({
                    embed: {
                        title: "__**All RoddyCoin Cardholders in the Server**__",
                        color: 3447003,
                        description: `${leaders}`
                    }
                });
                message.channel.send(`I sent a full leaderboard to you, ${message.author}.`);
            });
        }
        if (message.content.startsWith(prefix + "leaderboard full")) boardsFull(17);
        if (message.content.startsWith(prefix + "leaderboard all")) boardsFull(16);
        else if (message.content.startsWith(prefix + "leaderboard")) boards(12);
        if (message.content.startsWith(prefix + "board full")) boardsFull(11);
        if (message.content.startsWith(prefix + "board all")) boardsFull(10);
        else if (message.content.startsWith(prefix + "board")) boards(6);
        if (message.content.startsWith(prefix + "rank full")) boardsFull(10);
        if (message.content.startsWith(prefix + "rank all")) boardsFull(9);
        else if (message.content.startsWith(prefix + "rank")) boards(5);
        if (message.content.startsWith(prefix + "levels full")) boardsFull(12);
        if (message.content.startsWith(prefix + "levels all")) boardsFull(11);
        else if (message.content.startsWith(prefix + "levels")) boards(7);
        else if (message.content.startsWith(prefix + "level full")) boardsFull(11);
        else if (message.content.startsWith(prefix + "level all")) boardsFull(10);
        else if (message.content.startsWith(prefix + "level")) boards(6);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else {
        const dog = ["dog/dog1.jpg", "dog/dog2.jpg", "dog/dog3.jpg", "dog/dog4.jpg", "dog/dog5.jpg", "dog/dog6.jpg", "dog/dog7.jpg", "dog/dog8.jpg", "dog/dog9.jpg", "dog/dog10.jpg"];
        const cat = ["cat/cat1.jpg", "cat/cat2.jpg", "cat/cat3.jpg", "cat/cat4.jpg", "cat/cat5.jpg", "cat/cat6.jpg", "cat/cat7.jpg", "cat/cat8.jpg", "cat/cat9.jpg", "cat/cat10.jpg"];
        const mount = ["mount/mount1.jpg", "mount/mount2.jpg", "mount/mount3.jpg", "mount/mount4.jpg", "mount/mount5.jpg", "mount/mount6.jpg", "mount/mount7.jpg", "mount/mount8.jpg", "mount/mount9.jpg", "mount/mount10.jpg"];
        const tree = ["tree/tree1.jpg", "tree/tree2.jpg", "tree/tree3.jpg", "tree/tree4.jpg", "tree/tree5.jpg", "tree/tree6.jpg", "tree/tree7.jpg", "tree/tree8.jpg", "tree/tree9.jpg", "tree/tree10.jpg"];
        const beach = ["beach/beach1.jpg", "beach/beach2.jpg", "beach/beach3.jpg", "beach/beach4.jpg", "beach/beach5.jpg", "beach/beach6.jpg", "beach/beach7.jpg", "beach/beach8.jpg", "beach/beach9.jpg", "beach/beach10.jpg"];
        const sw = ["sw/sw1.jpg", "sw/sw2.jpg", "sw/sw3.jpg", "sw/sw4.jpg", "sw/sw5.jpg", "sw/sw6.jpg", "sw/sw7.jpg", "sw/sw8.jpg", "sw/sw9.jpg", "sw/sw10.jpg", "sw/sw11.jpg", "sw/sw12.jpg", "sw/sw13.jpg", "sw/sw14.jpg", "sw/sw15.jpg"];
        const filler = ["dog/dog1.jpg", "dog/dog2.jpg", "dog/dog3.jpg", "dog/dog4.jpg", "dog/dog5.jpg", "dog/dog6.jpg", "dog/dog7.jpg", "dog/dog8.jpg", "dog/dog9.jpg", "dog/dog10.jpg", 
                        "cat/cat1.jpg", "cat/cat2.jpg", "cat/cat3.jpg", "cat/cat4.jpg", "cat/cat5.jpg", "cat/cat6.jpg", "cat/cat7.jpg", "cat/cat8.jpg", "cat/cat9.jpg", "cat/cat10.jpg", 
                        "mount/mount1.jpg", "mount/mount2.jpg", "mount/mount3.jpg", "mount/mount4.jpg", "mount/mount5.jpg", "mount/mount6.jpg", "mount/mount7.jpg", "mount/mount8.jpg", "mount/mount9.jpg", "mount/mount10.jpg", 
                        "tree/tree1.jpg", "tree/tree2.jpg", "tree/tree3.jpg", "tree/tree4.jpg", "tree/tree5.jpg", "tree/tree6.jpg", "tree/tree7.jpg", "tree/tree8.jpg", "tree/tree9.jpg", "tree/tree10.jpg", 
                        "beach/beach1.jpg", "beach/beach2.jpg", "beach/beach3.jpg", "beach/beach4.jpg", "beach/beach5.jpg", "beach/beach6.jpg", "beach/beach7.jpg", "beach/beach8.jpg", "beach/beach9.jpg", "beach/beach10.jpg", 
                        "sw/sw1.jpg", "sw/sw2.jpg", "sw/sw3.jpg", "sw/sw4.jpg", "sw/sw5.jpg", "sw/sw6.jpg", "sw/sw7.jpg", "sw/sw8.jpg", "sw/sw9.jpg", "sw/sw10.jpg", "sw/sw11.jpg", "sw/sw12.jpg", "sw/sw13.jpg", "sw/sw14.jpg", "sw/sw15.jpg", 
                        "navigation.png", "NunbLaugh.gif", "palpa.jpg", "Rand#.png", "rickroll.gif", "RoddyBot.png", "RoddyWheel.gif"
                        ];
        const sendImg = (folder) => {
            let raImg = Math.floor(Math.random() * folder.length);
            if (!(recentImg.has(message.author.id))) {
                message.channel.send({files:["./images/" + folder[raImg]]});
                addRoddyCoin(message.author.id, 7, message.guild.id);
                recentImg.add(message.author.id);
                setTimeout(() => {
                    recentImg.delete(message.author.id);
                }, 5000);
            } else message.channel.send("Sorry, but you've been using the image commands too quickly. Wait a few seconds.");
        }
        if (message.content.startsWith(prefix + "randomImage")) sendImg(filler);
        if (message.content.startsWith(prefix + "randomimage")) sendImg(filler);
        if (message.content.startsWith(prefix + "RandomImage")) sendImg(filler);
        if (message.content.startsWith(prefix + "Randomimage")) sendImg(filler);
        if (message.content.startsWith(prefix + "randImage")) sendImg(filler);
        if (message.content.startsWith(prefix + "img")) sendImg(filler);
        if (message.content.startsWith(prefix + "dog")) sendImg(dog);
        if (message.content.startsWith(prefix + "cat")) sendImg(cat);
        if (message.content.startsWith(prefix + "dogs")) sendImg(dog);
        if (message.content.startsWith(prefix + "cats")) sendImg(cat);
        if (message.content.startsWith(prefix + "tree")) sendImg(tree);
        if (message.content.startsWith(prefix + "trees")) sendImg(tree);
        if (message.content.startsWith(prefix + "beach")) sendImg(beach);
        if (message.content.startsWith(prefix + "beaches")) sendImg(beach);
        if (message.content.startsWith(prefix + "sw")) sendImg(sw);
        if (message.content.startsWith(prefix + "mount")) sendImg(mount);
        if (message.content.startsWith(prefix + "mountains")) sendImg(mount);
        else if (message.content.startsWith(prefix + "mountain")) sendImg(mount);
    }
});

bot.on("message", message => {
    if (message.channel.type == "dm") return;
    else if (message.content.startsWith(prefix + "invite")) {
        message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=297367881736519692&permissions=1678244929&scope=bot");
    }
});
