
let quotechannel="???";

var lib=require("./AI");
const {exec}=require("child_process");

require('dotenv').config()

const taskfile="misc/acts";
const quotefile="misc/quotes";
const aifile="misc/carter_quotes";
const fileh="misc/help";



let sensitivity=0.4;


process.on('uncaughtException',function(err){
	console.log(err);
//	process.exit();
exec("pkill npm");
});



const Discord=require('discord.js')
const client=new Discord.Client({intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMembers,
],});

function get_quote(){
	let pres=[];
	lib.file_to_array(pres,quotefile);
	return pres[Math.floor(Math.random()*pres.length)];
}

function getDay(){
	let youbi=["日","月","火","水","木","金","土"];
	let day=new Date().getDay();
	let resp=youbi[day]+"曜日";
	return resp;
}


function set_pres(){
	let pres=[];
	lib.file_to_array(pres,taskfile);
	let sel=pres[Math.floor(Math.random()*pres.length)];

	client.user?.setPresence(
	{
        	status: "online",
        	activities:[ {
            		name: `${sel}`,
            		type: Discord.ActivityType.Streaming, 
            		url: "https://discord.com"
        		}]
    		}
	);

}



client.on("ready",()=>{
set_pres();
console.log("online");
})
let quotep=true;
setInterval(()=>{
set_pres();
if(quotep&&(new Date().getHours()==8)){

 client.channels.cache.get(quotechannel).send(get_quote());
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
 let curr=date.getDate();
 if(msg.member.displayHexColor=="#2f676d"||msg.member.displayHexColor=="#2ecc71"){
  if(msg.content.includes("/sendb")){
   let cont=msg.content.replace("/sendb","");
   if(msg.member.displayHexColor=="#2f676d"){
    cont=cont+"\n```diff\n---"+msg.author.tag+"\n```"; 
   }
   msg.channel.send(cont)
   msg.delete()
   return;
  }
 } 
 if(curr!=lastday){
   msg.reply(get_quote());
   lastday=curr;
	return;
 }else{
    if(msg.content.trimStart().charAt(0)=='/'){
	msg.reply(handle_command(msg.content.trimStart().trimEnd()));
    }else{
	get_replied_msg(msg);
    }
 }
});


client.login(process.env.BOT_TOKEN);

function is_msg_neg(msg){
	if(msg.author.bot){return false;}
	let content=msg.content.toLowerCase();
	if(content=="wrong"||content.includes("incorrect")||content.includes("wtf")||content.includes("s wrong")||(content.includes("t make sense")&&content.includes("doesn"))){
		return !content.includes("not");
	}
}

function ai_resp(msg){
	let resp=lib.generate_response(msg.content,aifile,sensitivity);
	if(resp!=null){
                resp=resp.replaceAll("<date>",getDay());
                resp=resp.replaceAll("<quote>",get_quote());
                msg.reply(resp);
		return true;
        }
	return false;
}

function handle_command(command){
	let cmd=command;
	if(cmd.includes(" ")){
		cmd=command.substring(0,command.indexOf(" "));
	}
	if(cmd=="/quote"){
		return get_quote();
	}
	if(cmd=="/learn"){
		return "this command is now disabled, the bot learns by itself when you reply to other's messages";
		let parse=command.replaceAll("[","").replaceAll("]","").replaceAll("{","").replaceAll("}","").split("\"");
		if(parse.length!=5){
			return "command /learn takes two strings (\"\") where /learn <key> <phrase>";
		}
		let st1=lib.sanitize_string(parse[1]);
		let st2=parse[3];
		if(st1.length<16||lib.sanitize_string(st2).length<16){
			return "key prase and response must both be at least 16 characters long";
		}
		lib.add_key(st1,st2,aifile);
		return "saved";
	}
	if(cmd=="/help"){
		return lib.readFile(fileh);
        }
	if(cmd=="/status"){
		set_pres();
		return "noted";
	}
return "command not found /help";
}
function get_replied_msg(ormsg){
	let rep=19;
	if(ormsg.type!=rep){
		process_message(null,ormsg);
		return null;
	}
	ormsg.fetchReference();
	if(ormsg.reference==null){return null;}
	if(ormsg.reference.messageId==null){return null;}	
	let othermsg=ormsg.channel.messages.fetch(ormsg.reference.messageId);
	othermsg.then((inputed)=>{process_message(inputed,ormsg);});
	return null;
}



function process_message(rmsg,msg){
	if(rmsg!=null){
                if(rmsg.author.bot&&is_msg_neg(msg)){
			lib.removeWord(aifile,rmsg.content);
			msg.reply("thank you very much for your feedback and helping the AI learn.");
                }else{
                        if((!rmsg.author.bot)&&(!ai_resp(msg))){
                                let key=lib.sanitize_string(rmsg.content);
                                let phrase=msg.content;
                                if(key.length>11&&lib.sanitize_string(phrase).length>11&&rmsg.author.id!=msg.author.id){
                                        lib.add_key(key,phrase,aifile);
                                }
                        }

                }
        }else{
                ai_resp(msg);
        }

}

