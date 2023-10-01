const responds =[["scrum","I'll scrum you!"],

	["agile","nah man, up your game you are not agile"],
 ["i love anime","i want to cuddle with a cute anime shyojyo at the scrum meeting"],
[ "hello","こにちわ！"],
["hey bot?","yeah? what do you want, i am busy with the effort logger."],
[" test ","heck yeah there will be a test you bet ya, thought this class was easy?"],
[" carter ","hello there ;)"],
["effort logger","psss... thats due Friday(金)"],
["japanese?","what do you think? Learning Japanese is essential to understanding the Kanban System which is essential to becoming a scrum samurai.そういえば、 僕は良い日本語をできます。でも、 あなたは 日本語を言ますね？"],
["due?","today! god, kids these days are so lazy, I have over 45 years of experience in software engineering practice, management, education, and research."],
["honkai star rail","is that the game kids these days play?"],
["incels","https://youtu.be/qzPKgTuRwbs?si=8s9ptIlls3yREaIN"],
["where is evan","doko dewa iwan arimasu ka?где же ваня?"]
];




const quotes=["one plus one is three for significantly large values of one",
"That's a stupid thing to say, miss",
"what's you or what's the computer... it's the future",
"This elephant sniffs on you and…",
"press the space bar with your toe",
"I was just trying to get my golf stroke improved, and I click on this thing, and up comes this piece of porn!",
"Granddad I love you dearly, but I'm more interested in art",
"i encourage you all to get good at python, just like chinese and spanish",
"One day in India I was given a lovely silver coin",
"My flight is about to departing.",
"Some of the sexiest movies don't show any boobs or anything else",
"i don't trust any institution; i trust individuals",
"Great technology must deliver much more than just a tactical advantage in the marketplace. Society needs strategically sustainable, secure, and useful system solutions, worthy of trust, that typically depend upon a complex ecosystem of organizations and professionals. This ecosystem must be able to ethically design, develop, deliver, operate, support, sustain, and enhance solutions of great societal value. Crucial systems quality attributes must include security, privacy, and reliability, while being worthy of trust. It is no longer good enough for academics to assert that they deliver graduates with knowledge of enduring value, or for businesspeople to say our employees have best college credentials. Our workforce must have and be able to effectively and ethically leverage and employ the knowledge, skills, abilities, behaviors, tools, technologies, supervision, leadership, and organizational culture needed to serve society, especially in times of overload and stress. This is only possible when all key stakeholders create a safe, healthy, and sustainable environment for excellent performance, continuous improvement, and respect for the contribution of all the incredibly diverse workers needed at every level.",
"Whoaaa that's freaky!",
"it's real easy to make children",
"How many counting programs do you think have been written?",
"It's interesting how the brain says one thing and the fingers say something else",
"some of you are going to find out how little this professor actually knows",
"I'm not buying new tools for you",
"mental midgets",
"Have you ever been blessed by an Indian Elephant?",
"We need to understand the pots of gold out there that maybe took some time and pain how to discover and how to leverage. And we need to recognize the black holes, and lets be very clear where the event horizon is, because once you cross over that line, there be dragons.",
"Oh, finally, a human!",
"Breathe in, breathe out. You're gonna die!",
"If you think this field is all fun and games, it is",
"I’ll share my notes for you for $100",
"'But professor, the text book says that: Users of agile methods claim that detailed design documentation is mostly unused. It is, therefore, a waste of time and money to develop these documents. I largely agree with this view, and I think that, except for critical systems, it is not worth developing a detailed architectural description from Krutchen’s four perspectives. You should develop the views that are useful for communication and not worry about whether or not your architectural documentation is complete.' and so I said in return, stop being an ass.",
];

let quotechannel="1155073945700147206";

const actes=[
"boomer revival 2.0",
"nihongo wo benkyou",
"scrum meeting",
"exploring nagoya",
"divorce court",
"sleeping",
"Agile.js",
"reading a book",
"yelling at son",
"DOOM",
"Quake 3",
"Дачный проспект II",
"Moscow Gopnik Simulator",
"食用系少女 you can eat the 彼女",
"Age of Empires II",
"Honkai Star Rail",
"Skibidi Toilet 2",
"yelling at students",
"Java FX",
"Fidelity BerryStonks",
"ebayno店",
];


require('dotenv').config()
run_block();
function run_block(){
console.log("running/reset");
try{
runserv();

}catch(error){
console.log(error);
run_block();
}
}

function runserv(){
const Discord=require('discord.js')
const client=new Discord.Client({intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMembers,

],});
//client.channels.fetch();
client.on("ready",()=>{
 const namae=actes[Math.floor(Math.random() * (actes.length - 0) + 0)];
client.user?.setPresence(
{
        status: "online",
        activities:[ {
            name: `${namae}`,
            type: Discord.ActivityType.Streaming, 
            url: "https://discord.com"
        }]
    }
);
})
let quotep=true;
setInterval(()=>{
  const namae=actes[Math.floor(Math.random() * (actes.length - 0) + 0)];
 client.user?.setPresence(
{
        status: "online",
        activities:[ {
            name: `${namae}`,
            type: Discord.ActivityType.Streaming,
            url: "https://discord.com"
        }]
    }
).catch((error)=>{run_block()});
if(quotep&&(new Date().getHours()==8)){
 client.channels.cache.get(quotechannel).send(quotes[Math.floor(Math.random() * (quotes.length - 0) + 0)]);
 quotep=false;
}
if(new Date().getHours()!=8){
quotep=true;
}
}
,180000);

let lastday=1+(new Date().getDate());
client.on(Discord.Events.MessageCreate,msg => {
 if(msg.author.bot)return;
 let date=new Date();
 let curr=lastday;
// console.log(msg.member.displayHexColor);
if(msg.member.displayHexColor=="#2f676d"||msg.member.displayHexColor=="#2ecc71"){
 if(msg.content.includes("/sendb")){
  let cont=msg.content.replace("/sendb","");
 //msg.channel.send(msg.content.replace("/sendb",""));
 // console.log(msg.content+"  :=by- "+msg.author.tag+" ");
  if(msg.member.displayHexColor=="#2f676d"){
   cont=cont+"\n```diff\n---"+msg.author.tag+"\n```"; 
  }
  msg.channel.send(cont).catch((error)=>{run_block()});
  msg.delete().catch((error)=>{run_block()});
  return;
 }
} 
if(curr!=lastday){
   msg.reply(quotes[Math.floor(Math.random() * (quotes.length - 0) + 0)]);
   lastday=curr;
	return;
 }else{
	 let c=0;
	if(msg.content.includes("today's")&&(msg.content.includes("day?")||msg.content.includes("date?"))){
		let day=new Date().getDay();
		let resp="日";
		if(day==1){
			resp="月";
		}
		if(day==2){ 
                        resp="火";
                }
		if(day==3){
                        resp="水";
                }
		if(day==4){
                        resp="木";
                }
		if(day==5){
                        resp="金";
                }
		if(day==6){
                        resp="土";
                }
		msg.reply(resp).catch((error)=>{run_block()});
		return;




	}
         if(msg.content.includes("/quote")){
		msg.reply(quotes[Math.floor(Math.random() * (quotes.length - 0) + 0)]+"").catch((error)=>{run_block()});
		//msg.reply(":carter_time:");
		return;
         }
	 while(c<responds.length){
 		if(msg.content.toLowerCase().includes(responds[c][0])){
                         msg.reply(responds[c][1]).catch((error)=>{run_block()});
  		}
		 c=c+1;
	 }
 }
});


client.login(process.env.BOT_TOKEN).catch((error)=>{run_block()})
}
