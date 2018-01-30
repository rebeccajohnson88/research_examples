

// html part

<p id="a1" style="display:inline"></p> and <p id="a2" style="display:inline"> </p> have known each other for 
<p id="a3" style="display:inline"></p>.

<br>
<br>

<p id="a4" style="display:inline"></p> is <p id="a5" style="display:inline"> </p>'s <p id="a6" style="display:inline"></p>. 

<br>
<br>

<p id="a7" style="display:inline"></p> wants to have sex but <p id="a8" style="display:inline"> </p> does not. 
Then, <p id="a9" style="display:inline"></p> <p id="a10" style="display:inline"></p> <p id="a11" style="display:inline"></p> <p id="a12" style="display:inline"></p> 
unless <p id="a13" style="display:inline"></p> has sex with <p id="a14" style="display:inline"></p>.


<br>
<br>

<p id="a15" style="display:inline"></p> has sex with <p id="a16" style="display:inline"></p>.




!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);


// seed random number generator from embedded data fields
// conjoint profile 1
Math.seedrandom('${e://Field/seed1}');
// conjoint profile 2
//Math.seedrandom('${e://Field/seed2}');
// conjoint profile 3
//Math.seedrandom('${e://Field/seed3}');
// conjoint profile 4
//Math.seedrandom('${e://Field/seed4}');
// conjoint profile 5
//Math.seedrandom('${e://Field/seed5}');

// Create Variables for Traits associated with each dimension.
// Rebecca: how adapted- adapted to do our traits
var genderperpvictim_raw = ["male-female", "male-male", "female-female", "female-male"];
var tactic_raw = ["threatens to evict",
"threatens to cut back the shifts of",
       "threatens to post naked photos of",
       "threatens to block the promotion of",
       "threatens to out"];
var trust_raw = ["have a good relationship","have a rocky relationship"];

// Create relationship associated with each tactic
var relationship_raw = ["landlord",
"boss",
       "ex",
       "boss",
       "neighbor"];

// Create names associated with each gender of perpetrator and victim
var male_perp = ["John", "Connor", "Jake", "Luke", "Brad", "Colin"];
var female_perp = ["Amy", "Claire", "Katie", "Heather", "Hannah", "Emma"];
var male_victim = ["Jim", "Clark", "Joel", "Liam", "Will", "Mike"];
var female_victim = ["Anna", "Courtney", "Kelsea", "Haley", "Abby", "Elena"];

// set unequal sampling probs for the gender of victim and perpetrator
function getGenders(){
  // 85% male perp, female victim; 10% others
  var n = Math.floor(Math.random()*100);
  if (n<5) {
    var out = 3;
  } else if (n <10) {
    var out = 2;
  } else if (n<15) {
    var out = 1;
  } else {
    var out = 0;
  }
  var gendereach_repeat = ["male-female", "male-male", "female-female", "female-male"];
  return gendereach_repeat[out];
}

// first paragraph that describes the victim and perpetrator name and meeting each other
traits_a_all = [getGenders(),
            duration_raw[Math.floor(Math.random()*duration_raw.length)],
            tactic_raw[Math.floor(Math.random()*tactic_raw.length)]];



 // draw relationship associated with tactic
var tacticindex = tactic_raw.indexOf(traits_a_all[2]); 
var relationship_use = relationship_raw[tacticindex]; 

// draw extra line associated with tactic
var outing_extra = tactic_raw.indexOf(traits_a_all[2]);
var outing_raw = ["","","","", ", who is not heterosexual but has only come out to a few close friends,"]; 
var outing_use = outing_raw[tacticindex];


// draw name associated with gender perpetrator and victim (did not randomize for now)
var gendersindex = genderperpvictim_raw.indexOf(traits_a_all[0]);

if (gendersindex == 0 | gendersindex == 1) {
  var perpetrator_name = male_perp[Math.floor(Math.random()*male_perp.length)];
} else {
  var perpetrator_name = female_perp[Math.floor(Math.random()*female_perp.length)];
} 
      
if (gendersindex == 1 | gendersindex == 3) {
  var victim_name = male_victim[Math.floor(Math.random()*male_victim.length)];
} else {
  var victim_name = female_victim[Math.floor(Math.random()*female_victim.length)];
} 
      

 // create vector in order of attribute's final appearance in vignette
 traits_a_final = [// known each other for duration
 					perpetrator_name, victim_name, // perpetrator is victim's, 
 					relationship_use, // relationship
 					perpetrator_name, victim_name,  // perpetrator wants to have sex but victim does not
 					perpetrator_name, traits_a_all[2], victim_name, // then, perpetrator tactic victim
 					outing_use, // extra outing line
				   	victim_name, perpetrator_name,
 					victim_name, perpetrator_name]; // victim has sex with perpetrator

// Create list of variables to use when setting attributes
// Rebecca note: these are the nammed tags in the html, adapted
// so that there are only four as opposed to 13
a_list = ["a1","a2","a3","a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16"]; 

// set html values in conjoint table
for(i=0;i<16;i++){
    document.getElementById(a_list[i]).innerHTML = traits_a_final[i];
}

// try to print embedded data
	var traits_join_2print = traits_a_all.join("|");
	var victim_array = victim_name;
	var victim_string = victim_array.toString(); 
	var perpetrator_array = perpetrator_name; 
	var perpetrator_string = perpetrator_array.toString();
	var tactic_array = traits_a_all[2]; 
	var tactic_string = tactic_array.toString();
	
// store values as embedded data fields
Qualtrics.SurveyEngine.setEmbeddedData('traits_scenario1', traits_join_2print);
Qualtrics.SurveyEngine.setEmbeddedData('victim_scenario1', victim_string);
Qualtrics.SurveyEngine.setEmbeddedData('perpetrator_scenario1', perpetrator_string);
Qualtrics.SurveyEngine.setEmbeddedData('tactic_scenario1', tactic_string);