//My project1 is a drawing game machine.
//The machine could create bubbles.
//If you click the bubble, the bubble will disappear. 
//The size and color of the bubble will change with time.



/// I'm confused about why there is always a bubble at (0,0) and why there are some bubbles still overlapping。
//??? trying to make some sounds when the bubble collide with each other
//??? change the bubble size according to the location of the mouse
//??? trying to make “Devourer of Souls”. (swallowing small circles)
//??? trying to portray the movement track
//??? trying to let bubbles do not overlap at the beginning
//trying to use vector this week
//trying to use force this week



 let bubble=[];
 var num=30;

 function setup() {
 	createCanvas(windowWidth, windowHeight);
	//frameRate(30);
	for(var i=0;i<num; i++){
		var x= random(r,width-r);
		var y= random(r,height-r);
		var r= random(10,30);
		var vel=5;
		bubble[i]=new Bubble(x,y,r,vel);
	}
}

//the bubble will disapper if click it
function mousePressed(){
	for(var i=0;i<bubble.length; i++){
		if(bubble[i].clicked(mouseX,mouseY)){
			bubble.splice(i,1);
		}
	}
}

//draw bubbles
function draw() {
	background(0);

	for(let a of bubble){  
		if(a.contains(mouseX,mouseY)){
			a.changeColor(134,25,232);
		}else{
			a.changeColor(0,0,0);
		}

		let overlapping= false;
		for(let others of bubble){

			if(a!==others && a.overlap(others)){
				overlapping=true;
			}
			if(overlapping){
				a.bounce();
			}
			// else{
			// 	a.show();
			// }
		}
		a.move();
		a.show();
	} 
}


class Bubble{
	constructor(tempX,tempY,tempR,tempVel){
		this.x=tempX;
		this.y=tempY;
		this.r=tempR;
		this.vel=tempVel;
	}

	//move bubbles
	move(){
    	//this.r+=1;
    	this.x=this.x+this.vel*cos(this.r);
    	this.y=this.y+this.vel*sin(this.r);

    	if (this.x+this.r>=width || this.x-this.r<=0 || this.y+this.r>=height || this.y-this.r<=0){
    		this.vel*=-1;
    	}

    }

    //draw bubbles
    show(other){
    	stroke(255);
    	strokeWeight(0.5);
    	//noFill();
    	ellipse(this.x,this.y,2*this.r,2*this.r);
    }

	//change color
	changeColor(tempK,tempG,tempB){ 
		this.k=tempK;
		this.g=tempG;      
		this.b=tempB;      
		fill(this.k,this.g,this.b);
	}

	//the bubble will change color if the mouse is in the bubble
	contains(mx,my){
		let d=dist(mx,my,this.x,this.y);
		if (d<this.r){
			return true; 
		}else{
			return false; 
		}
	}

	//the bubble will disapper if click it
	clicked(mx,my){
		let d= dist(mx,my,this.x,this.y);
		if (d<this.r){
			return true;
		}else{
			return false;
	}
}

	//judging overlapping
	overlap(other){
		let d=dist(this.x,this.y,other.x,other.y);
		if(d<=this.r+other.r){
			return true;
		}else{
			return false;
		}
	}

	//reversing if the bubbles overlap
	bounce(){
		this.vel*=-1;
	}
}
