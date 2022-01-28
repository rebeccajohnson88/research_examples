Qualtrics.SurveyEngine.addOnload(function()
{

!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);


// seed random number generator from embedded data fields
// conjoint profile 1
//Math.seedrandom('${e://Field/seed1}');
// conjoint profile 2
Math.seedrandom('${e://Field/seed2}');
// conjoint profile 3
//Math.seedrandom('${e://Field/seed3}');
// conjoint profile 4
//Math.seedrandom('${e://Field/seed4}');
// conjoint profile 5
//Math.seedrandom('${e://Field/seed5}');

// Create Variables for Traits associated with each dimension.
// Rebecca: how adapted- adapted to do our traits



var genderperpvictim_raw = ["male-female", 
                            "male-male", 
                            "female-female",
                            "female-male"];

var race_perp = ["black", "white"]; 
var race_victim = ["black", "white"]; 

var tactic_raw = ["evict",
"cut back the shifts of",
       "break up with",
       "cut the welfare benefits of",
       "fabricate a failed drug test for"];


// Create relationship associated with each tactic
var relationship_raw = ["landlord",
"boss",
       "romantic partner", 
       "caseworker",
       "probation officer"];

// Create names associated with each gender of perpetrator and victim

// options for each (don't repeat across vignettes): 
// males:
// training vignette 1: jake and caroline-- physical force 1
// training vignette 2: lana and charlie-- enthusiastic consent

// randomized vignettes- name one is perp; name two is victim
// 1. Colin,  Brendan, 
// 2. Robert, Mark
// 3. Connor, Peter

// females: 
// 1. Lucy, Julie
// 2. Molly, Laura
// 3. Nora, Margaret



var male_perp_white = ["Robert"];
var female_perp_white = ["Molly"];
var male_victim_white = ["Mark"];
var female_victim_white = ["Laura"];

// black names:

// black male

// 1. Jamal - Kameron
// 2. Darius - Jermaine
// 3. Jaylen -- Malcolm

// black female

// 1. Tabitha - Amani 
// 2. Tianna - Harmony
// 3. Zahara - Tori 

var male_perp_black = ["Darius"];
var female_perp_black = ["Tianna"];
var male_victim_black = ["Jermaine"];
var female_victim_black = ["Harmony"];




// set unequal sampling probs for the gender of victim and perpetrator
function getGenders(){
  // 70% male perp, female victim; 10% others
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

// pull the race 

// first paragraph that describes the victim and perpetrator name and meeting each other
traits_a_all = [getGenders(),
            race_perp[Math.floor(Math.random()*race_perp.length)],
            race_victim[Math.floor(Math.random()*race_victim.length)],
            tactic_raw[Math.floor(Math.random()*tactic_raw.length)]];


// note the indices within traits
// 0: gender
// 1: race
// 2: relationship
// 3: tactic

 // draw relationship associated with tactic
var tacticindex = tactic_raw.indexOf(traits_a_all[3]); 
var relationship_use = relationship_raw[tacticindex]; 

// draw extra line associated with tactic
var welfare_extra = tactic_raw.indexOf(traits_a_all[3]);
var welfare_raw = ["","", "", " after a missed appointment", ""]; 
var welfare_use = welfare_raw[tacticindex];


// draw name associated with gender perpetrator and victim (did not randomize for now)
var gendersindex = genderperpvictim_raw.indexOf(traits_a_all[0]);
var raceindex_perp = race_perp.indexOf(traits_a_all[1]);
var raceindex_victim = race_victim.indexOf(traits_a_all[2]);

// draw perpetrator and victim names
if (gendersindex === 0 && raceindex_perp === 0 && raceindex_victim === 0) {

  var perpetrator_name = male_perp_black[Math.floor(Math.random()*male_perp_black.length)];
  var victim_name = female_victim_black[Math.floor(Math.random()*female_victim_black.length)];

} else if (gendersindex === 0 && raceindex_perp === 0 && raceindex_victim == 1) {

  var perpetrator_name = male_perp_black[Math.floor(Math.random()*male_perp_black.length)];
  var victim_name = female_victim_white[Math.floor(Math.random()*female_victim_white.length)];
  
} else if (gendersindex === 0 && raceindex_perp == 1 && raceindex_victim == 1) {

  var perpetrator_name = male_perp_white[Math.floor(Math.random()*male_perp_white.length)];
  var victim_name = female_victim_white[Math.floor(Math.random()*female_victim_white.length)];

} else if (gendersindex === 0 && raceindex_perp == 1 && raceindex_victim === 0) {

  var perpetrator_name = male_perp_white[Math.floor(Math.random()*male_perp_white.length)];
  var victim_name = female_victim_black[Math.floor(Math.random()*female_victim_black.length)];

} else if (gendersindex == 1 && raceindex_perp === 0 && raceindex_victim === 0) {

  var perpetrator_name = male_perp_black[Math.floor(Math.random()*male_perp_black.length)];
  var victim_name = male_victim_black[Math.floor(Math.random()*male_victim_black.length)];

} else if (gendersindex == 1 && raceindex_perp === 0 && raceindex_victim == 1) {

  var perpetrator_name = male_perp_black[Math.floor(Math.random()*male_perp_black.length)];
  var victim_name = male_victim_white[Math.floor(Math.random()*male_victim_white.length)];
  
} else if (gendersindex == 1 && raceindex_perp == 1 && raceindex_victim == 1) {

  var perpetrator_name = male_perp_white[Math.floor(Math.random()*male_perp_white.length)];
  var victim_name = male_victim_white[Math.floor(Math.random()*male_victim_white.length)];

} else if (gendersindex == 1 && raceindex_perp == 1 && raceindex_victim === 0) {

  var perpetrator_name = male_perp_white[Math.floor(Math.random()*male_perp_white.length)];
  var victim_name = male_victim_black[Math.floor(Math.random()*male_victim_black.length)];

} else if (gendersindex == 2 && raceindex_perp === 0 && raceindex_victim === 0) {

  var perpetrator_name = female_perp_black[Math.floor(Math.random()*female_perp_black.length)];
  var victim_name = female_victim_black[Math.floor(Math.random()*female_victim_black.length)];

} else if (gendersindex == 2 && raceindex_perp === 0 && raceindex_victim == 1) {

  var perpetrator_name = female_perp_black[Math.floor(Math.random()*female_perp_black.length)];
  var victim_name = female_victim_white[Math.floor(Math.random()*female_victim_white.length)];
  
} else if (gendersindex == 2 && raceindex_perp == 1 && raceindex_victim == 1) {

  var perpetrator_name = female_perp_white[Math.floor(Math.random()*female_perp_white.length)];
  var victim_name = female_victim_white[Math.floor(Math.random()*female_victim_white.length)];

} else if (gendersindex == 2 && raceindex_perp == 1 && raceindex_victim === 0) {

  var perpetrator_name = female_perp_white[Math.floor(Math.random()*female_perp_white.length)];
  var victim_name = female_victim_black[Math.floor(Math.random()*female_victim_black.length)];

} else if (gendersindex == 3 && raceindex_perp === 0 && raceindex_victim === 0) {

  var perpetrator_name = female_perp_black[Math.floor(Math.random()*female_perp_black.length)];
  var victim_name = male_victim_black[Math.floor(Math.random()*male_victim_black.length)];

} else if (gendersindex == 3 && raceindex_perp === 0 && raceindex_victim == 1) {

  var perpetrator_name = female_perp_black[Math.floor(Math.random()*female_perp_black.length)];
  var victim_name = male_victim_white[Math.floor(Math.random()*male_victim_white.length)];
  
} else if (gendersindex == 3 && raceindex_perp == 1 && raceindex_victim == 1) {

  var perpetrator_name = female_perp_white[Math.floor(Math.random()*female_perp_white.length)];
  var victim_name = male_victim_white[Math.floor(Math.random()*male_victim_white.length)];

} else {

  var perpetrator_name = female_perp_white[Math.floor(Math.random()*female_perp_white.length)];
  var victim_name = male_victim_black[Math.floor(Math.random()*male_victim_black.length)];

} 

// draw pronouns associated
// draw pronoun associated with perpetrator
if (gendersindex < 2) {

  var perpetrator_subject_pronoun = "he";
  var perpetrator_object_pronoun = "him";

} else  {

  var perpetrator_subject_pronoun = "she";
  var perpetrator_object_pronoun = "her"; 

} 

if (gendersindex == 0 || gendersindex == 2) {

  var victim_subject_pronoun = "she";

} else  {

  var victim_subject_pronoun = "he";

} 

 // create vector in order of attribute's final appearance in vignette
 traits_a_final = [perpetrator_name, victim_name, // perpetrator is victim's, a1, a2
 					relationship_use, // relationship: a3
 					perpetrator_name, victim_name,  // perpetrator wants to have sex but victim does not: a4, a5
 					perpetrator_name, perpetrator_subject_pronoun, // then, perpetrator (a6), says pronoun (a7), he will tactic (a8)
          traits_a_all[3], victim_name, // victim name (a9), 
 					welfare_use, // extra welfare line (a10)
				   victim_subject_pronoun, perpetrator_object_pronoun, // unless she/he (a11) has sex with (a12)
 					victim_name, perpetrator_name]; // victim has sex with perpetrator (a13) (a14)

// Create list of variables to use when setting attributes
// Rebecca note: these are the nammed tags in the html, adapted
// so that there are only four as opposed to 13
a_list = ["a1","a2","a3","a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14"]; 

// set html values in conjoint table
for(i=0;i<14;i++){
    document.getElementById(a_list[i]).innerHTML = traits_a_final[i];
}

// try to print embedded data
	var traits_join_2print = traits_a_all.join("|");
	var victim_array = victim_name;
	var victim_string = victim_array.toString(); 
	var perpetrator_array = perpetrator_name; 
	var perpetrator_string = perpetrator_array.toString();
	var tactic_array = traits_a_all[3]; 
	var tactic_string = tactic_array.toString();
  var perpetrator_pronoun_string = perpetrator_subject_pronoun.toString(); 
	
// store values as embedded data fields
Qualtrics.SurveyEngine.setEmbeddedData('traits_scenario2', traits_join_2print);
Qualtrics.SurveyEngine.setEmbeddedData('victim_scenario2', victim_string);
Qualtrics.SurveyEngine.setEmbeddedData('perpetrator_scenario2', perpetrator_string);
Qualtrics.SurveyEngine.setEmbeddedData('tactic_scenario2', tactic_string);
Qualtrics.SurveyEngine.setEmbeddedData('perpetratorpronoun_scenario2', perpetrator_pronoun_string);
	
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
