(function(global){
  setTimeout(function(){
    alert('PLEASE NOTE TO GET ACCURATE WEATHER UPDATE INCLUDE CITY NAME COMMA AND COUNTRY CODE IN YOUR SEARCH EXAMPLE (DUBLIN,IE)  ')
  },1500)
 //initializing all variable with html element 
var country =document.getElementById('country');
var todayW =document.getElementById('todayw');
var current =document.getElementById('current');
var time =document.getElementById('time');
var humidty =document.getElementById('humidity');
var five=document.getElementById('five').children;
var HourlyC=document.getElementById('Hourly').children;
var canvass=document.getElementById('canvas');
var ctx = canvass.getContext("2d");
var input =document.getElementById('input');
var search =document.getElementById('search');
var imgupdate=document.getElementsByClassName('imgupdate');
var reg=/^([A-Za-z\s])+[,\sa-zA-Z]{0,5}$/gm;
var menu=document.getElementById('menu');
var searchCont=document.getElementById('searchcont');
var openMenu=false;
var weatherElement=document.getElementById('weatherupdate').children;

ctx.fillStyle = "white";
ctx.textAlign = "center";
var canvasWidth=canvass.clientWidth/8;
ctx.font = "1.5em monospace";
ctx.lineWidth = "1";
ctx.strokeStyle = "white"
 var canvasTracker=0;
var count=0;
var loopCount=0;

//function to load api
function loadApi(countrypara) {
    var contianer=document.getElementById("container");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       var json=JSON.parse(this.response);
      data(json)//callback function 
      }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${countrypara}&units=metric&appid=${pi}`, true);
    xhttp.send();
  }
  loadApi('new york,us')//calling the callback function with default parameter 






function data(data){
  //accesing html element and updating them data from api
  country.innerHTML='City  '+'  '+ data.city.name+', '+data.city.country;
  time.innerHTML='updated at '+ data.list[count].dt_txt.substring(10,16);
  humidty.firstElementChild.innerHTML='Humidity '+data.list[count].main.humidity+'%';
  humidty.firstElementChild.nextElementSibling.innerHTML='Population '+data.city.population;
  humidty.lastElementChild.innerHTML='Wind '+data.list[count].wind.speed+' m/s';
  current.innerHTML=data.list[count].weather[count].description;
  todayW.lastElementChild.innerHTML=tempDeg(data.list[count].main.temp)+' &deg;C';
  todayW.firstElementChild.firstElementChild.src='http://openweathermap.org/img/w/'+data.list[count].weather[count].icon+'.png';
   daily(data);//callback function that display daily weather forcast

}






function daily(main){

if(loopCount===5){
  loopCount=0;
}

//using dependent quadratic loop to access daily data from api and update html element
  for(var i=0;i<main.list.length; i=i+8){
   
    for(var j=loopCount;j<=loopCount; j++){
      
     five[j].firstElementChild.innerHTML=helper(main.list[i].dt_txt);
    five[j].firstElementChild.nextElementSibling.firstElementChild.src='http://openweathermap.org/img/w/'+main.list[i].weather[count].icon+'.png';
    five[j].firstElementChild.nextElementSibling.nextElementSibling.innerHTML=tempDeg(main.list[i].main.temp)+' &deg;C';;
    five[j].lastElementChild.innerHTML=main.list[i].weather[count].description;;
    }

     if(i===0){
      Hourly(i,main,five[i]); //calling 
     }
    

    (function(tracker,data,counter){
    five[counter].onclick=function(){
     
      Hourly(tracker,data,this);
    };
  })(i,main,loopCount)

    loopCount++;
  }
}



//creating helper function that convert degree float number to integer number 
function tempDeg(temp){
return parseInt(temp);
}





function Hourly(tracker,data,that){
ctx.clearRect(0,0,canvass.width,canvass.height);

  var temp=[];
  var update=[];
  var img=[];
  var weatherUpdate=[];
  for(var l=tracker;l<(tracker+7);l++){
    temp.push(tempDeg(data.list[l].main.temp));
    update.push(data.list[l].dt_txt.substring(11,16));
    img.push(`http://openweathermap.org/img/w/${data.list[l].weather[count].icon}.png`);
    weatherUpdate.push(data.list[l].weather[count].description);
  }

  
  for(var i=0;i<temp.length;i++){
    ctx.beginPath();
    ctx.fillText(update[i],(i+1)*150,200-temp[i]-6 );
    ctx.fillText(temp[i]+'°',(i+1)*150,100-temp[i]-6 );
    ctx.moveTo((i*150),100-temp[i-canvasTracker]);
    ctx.lineTo((i+1)*150,100-temp[i]);
    
     imgupdate[i].src=img[i];
     weatherElement[i].innerHTML=weatherUpdate[i];
    ctx.stroke();
 canvasTracker=1;
  
}

 for(var k=0;k<five.length;k++){
       five[k].classList.remove('specialClass');
       
     }
that.classList.add('specialClass');


}


//function that convert date data to current date
function helper(data){
  data=new Date(data)
 return data.toString().substring(0,16);
}

//searching for different country weather forcast  
search.onclick=function(){
  
  if(input.value===''){
   return alert('INPUT IS REQURED EXAMPLE (DUBLIN,IE)')
  }
  if(input.value.match(reg)!==null){
    loadApi(input.value);
  }else{
    return  alert('INPUT INVALID PLEASE INSERT CITY NAME COMMA AND COUNTRY CODE EXAMPLE (DUBLIN,IE)');
  }
  
  
  
  if(global.innerWidth<450&&openMenu===true){
    searchCont.style.opacity=0;
    openMenu=false;
    menu.innerHTML='<i class="fas fa-search-location"></i>';
    ctx.font = "1.9em monospace";
  }
  
}

//function that display search field and change icon
menu.onclick=function(){
  searchCont.style.zIndex=1000;
  
  if(!openMenu){
    openMenu=true;
    this.innerHTML='<i class="fas fa-search-minus"></i>';
    this.setAttribute('title','close search');
    searchCont.style.opacity=1;
  }else{
    openMenu=false;
    this.innerHTML='<i class="fas fa-search-location"></i>';
    this.setAttribute('title','search city');
    searchCont.style.opacity=0;
  }
}


global.onresize=function(){
  
  if(global.innerWidth>414){
    searchCont.style.opacity=1;
  }else if(global.innerWidth<414&&openMenu!==true){
    searchCont.style.opacity=0;
  }
}



}(window));