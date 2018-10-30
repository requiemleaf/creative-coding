//My project1 is a game ma chine.
//The machine could create bubbles.
//If you click the bubble, the bubble will disappear. And you will get some scores.
//The size and color of the bubble will change with time

//??? making some noises
//??? change the bubble size according to the location of the mouse
//??? making “Devourer of Souls”. (swallowing small circles)
 // ??? try to let bubbles do not overlap at the beginning


var bubble=[];
var num=25;



function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(80);
	smooth();

	for(var i=0;i<num;i++){
		var r=10+random(10);
		var x= random(r,width-r);
		var y= random(r,height-r);
		bubble[i]=new Bubble(r,x,y);
	}

	for(i=0;i<bubble.length;i++){
		var bub=bubble[i];
		for(var j=0;j<bubble.length;j++){
			var other=bubble[j];
			if(bub!==other){
			var d=dist(bub.x, bub.y, other.x, other.y);
			}
			if (d<=bub.r+other.r+1){
				bub.r=floor(d/2);
				other.r=floor(d/2);
			}
		}
	}
}

//the bubble will disapper if click it
function mousePressed(){

	for(var i=0;i<bubble.length; i++){
		if(bubble[i].clicked(mouseX,mouseY)){
			bubble.splice(i,1);		//removing the connection points
		}
	}
			bubble.push(new Bubble(10,mouseX,mouseY));	//adding connection points
}

//draw bubbles
function draw() {
	background(0);

	for(var i=0;i<bubble.length;i++){

		var bub=bubble[i];
		for(var j=0;j<bubble.length;j++){
			var other=bubble[j];
			if(bub!==other){
			var d=dist(bub.x, bub.y, other.x, other.y);
			}
			if (d<=bub.r+other.r){
				bubble[i].bounce();
			}
			for(var m=0;m<bubble.length;m++){
			var other2=bubble[m];
			var d2=dist(bub.x, bub.y, other2.x, other2.y);
			var d3=dist(other.x, other.y, other2.x, other2.y);

			if (d<=6*bub.r+6*other.r &&d2<=6*bub.r+6*other2.r &&d3<=6*other.r+6*other2.r ){
				stroke(16,16,255,150);
				fill(134,25,232,100);
				strokeWeight(1);
				triangle(other.x,other.y,bubble[i].x,bubble[i].y,other2.x,other2.y);
			}
		}
		}
		bubble[i].move();
		bubble[i].show();
	} 
}


class Bubble{
	constructor(tempR,tempX,tempY){
		this.x=tempX;
		this.y=tempY;
		this.r=tempR;
		this.vel=2;
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
    show(){
    	stroke(200);
    	strokeWeight(0.5);
    	fill(85,42,143,200);
    	ellipse(this.x,this.y,2*this.r,2*this.r);
    }

	//change color
	changeColor(tempK,tempG,tempB){ 
		this.k=tempK;
		this.g=tempG;      
		this.b=tempB;      
		fill(this.k,this.g,this.b);
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

	//reversing if the bubbles overlap
	bounce(){
		this.vel*=-1;
	}
}