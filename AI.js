const rl=require('readline');
const fs=require('fs');

module.exports={
 generate_response:function(input,file,min){return generate_response(input,file,min);},
 file_to_array:function(array,file){file_to_array(array,file);},
 add_key:function(key,resp,file){add_key(key,resp,file);},
 sanitize_string:function(string){return sanitize_string(string);},
 readFile:function(file){return read_file(file);},
 removeWord:function(file,word){remove_word(file,word);},
};

function add_key(key,resp,file){
	fs.appendFileSync(file,key+"{}"+resp.replaceAll("{}","").replaceAll("[]","")+"[]\n");
}

function generate_response(input,file,min){
	let large_file=[];
	read_multi_dim_file(large_file,file);
	let largest_score=0;
	let score_map=[];
	large_file.forEach((element)=>{
		let score=relevancy_score(element[0],input);
		if(score>largest_score&&score>min){
			largest_score=score;
			let info=[element[1],score];
			score_map.push(info);
		}
	});
	if(largest_score<min){
		return null;
	}
	let possible_resp=[];
	score_map.forEach((element)=>{
		if(element[1]==largest_score){
			possible_resp.push(element[0]);
		}
	});
	if(possible_resp.length<1){return null;}
	if(possible_resp.length<2){
		return possible_resp[0];
	}
	let rand=Math.floor(Math.random()*possible_resp.length);
	return possible_resp[rand];
}

function read_file(file){
	return fs.readFileSync(file,"utf-8");
}

function file_to_array(array,file){
	let fc=fs.readFileSync(file,"utf-8");
	let lines=fc.split("\n");
	lines.forEach((line)=>{
		if(line.length>2){
			array.push(line);
		}
	});
}
//syntax: use [] to split rows, use : to split columns
function read_multi_dim_file(array,file){
	let fc=fs.readFileSync(file,"utf-8");
	let lines=fc.split("[]");
	lines.forEach((line)=>{
		let small=line.split("{}");
		let smallarr=[];
		let lc=0;
		small.forEach((line2)=>{
			if(line2.length>2){
				if(line2.charAt(0)=='\n'){
					line2=line2.substring(1);
				}
				smallarr.push(line2);
				lc++;
			}
		});
		if(lc!=0){
			array.push(smallarr);
		}
	});
}

function count_in_string(charin,string){
	let len=string.length;
	let c=0;
	let count=0;
	for(c=0;c<len;c++){
		let cc=string.charAt(c);
		if(cc==charin){
			count++;
		}
	}
	return count;
}
/*relevancy score algorithm
 *non-case sensitve, split the key string into words, replace any double spaces
 *finally count the words and use the includes function to see if the input has the words
 *count those that were found and divide them by the number of words of the longest string
 */
function string_score_by_array(input){
	let count=0;
	input.forEach((str)=>{
		count=count+str.length;
	});
	return count;
}
function sanitize_string(input){
	let sanitize=input.toLowerCase().replaceAll("_"," ");
	let c=0;
	let letters="\n;:{}.[]()*&^%$#@!~`\\|/'\",?-".split("");
	letters.forEach((letter)=>{
		sanitize=sanitize.replaceAll(letter,"");
	});
	while(sanitize.includes("  ")){
		sanitize=sanitize.replaceAll("  "," ");
	}
	return sanitize.trimStart().trimEnd();
}
function relevancy_score(input,input2){
	let i1a=sanitize_string(input).split(" ");
	let i2a=sanitize_string(input2).split(" ");
	let denom=string_score_by_array(i1a);
	let a2r=string_score_by_array(i2a);
	let tarr=i2a;
	let comp=i1a;
	if(a2r>denom){
		denom=a2r;
		tarr=i1a;
		comp=i2a;
	}
	let count=0;
	tarr.forEach((str)=>{
		if(comp.includes(str)){
			count=count+str.length;
		}
	});
	return count/denom;
}
function remove_word(file,word){
	let out="";
	let fc=fs.readFileSync(file,"utf-8");
        let lines=fc.split("[]");
	let found=false;
        lines.forEach((line)=>{
                let small=line.split("{}");
                let smallarr=[];
                let lc=0;
                small.forEach((line2)=>{
                        if(line2.length>2){
                                if(line2.charAt(0)=='\n'){
                                        line2=line2.substring(1);
                                }
                                smallarr.push(line2);
                                lc++;
                        }
                });
                if(lc!=0&&smallarr[1]!=word){
                        if(out!=""){
				out=out+"\n"+smallarr[0]+"{}"+smallarr[1]+"[]";
			}else{
				out=out+smallarr[0]+"{}"+smallarr[1]+"[]";
			}
                }
		if(lc!=0&&smallarr[1]==word){
			found=true;
		}

        });
	if(found){
		fs.writeFileSync(file,out,{encoding:'utf8',flag:'w'});
	}
}

