//My project1 is a game machine.
//The machine could create bubbles.
//If you click the bubble, the bubble will disappear. And you will get some scores.
//Different sizes and colors represent different scores.
//If you click the largest bubble, you will get the highest score. 
//The size and color of the bubble will change with time

//??? make some noises
//??? change the bubble size according to the location of the mouse


var points=[];
var num=500;

function setup(){
  createCanvas(1200,800);
  frameRate(40);

  for(var i=0; i<num; i++){
    var px=random(0,width);
    var py=random(0,height);
    var r=i/7+2;
    var speed=i+10;
    points[i]= new Bubble(px,py,r,speed);
  }
}


function draw(){
  background(0);
  for(var i=0; i<points.length; i++){
    points[i].move();    //move the bubble
    points[i].display();   //draw the bubble
    //points[i].grow();   //bubbles grow
    
  }
}




function Bubble(tempPx,tempPy,tempR,tempSpeed){
  this.px= tempPx;
  this.py= tempPy;
  this.r= tempR;
  this.speed=tempSpeed;
  
  
  
 
  //control the distance between bubbles
  //avoid overlapping
  /*
  var r1;
  var r2;
  var px1;
  var py1;
  var px2;
  var py2;
  */
  
  
  //boolean overlapping=false;
  var d=dist(this.px1,this.py1,this.px2,this.py2);
  
  

  if (d>this.r1+this.r2){
  d=this.r1+this.r2;
  
    //overlapping=true;
  }

  
  
  //draw the bubble
this.display=function(){
  ellipse(this.px,this.py,this.r,this.r);
}
  //move the bubble
this.move=function(){
  
  this.py-=1;
  this.speed+=10;
  this.px+=sin(this.speed)*2+random(-2,2);

  
  if (this.px+this.r>width){
    this.px=width-this.r;
  }
   if (this.px-this.r<0){
    this.px=this.r;
  }
   if (this.py+this.r>height){
    this.pyr=height-this.r;
  }
   if ( this.py-this.r<0){
     this.py=this.r;
  }
}

/*
this.grow=function(){
  if (this.r<num/5){
  this.r+=0.5;
  }
}
*/
}