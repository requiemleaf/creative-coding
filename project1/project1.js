//My project1 is a game machine.
//The machine could create bubbles.
//If you click the bubble,the bubble will disappear.
//If you click the mouse, the windTunnel will create a new bubble.

var bubble=[];
var num=25;
var cueBubble;


function setup() {
	createCanvas(windowWidth, windowHeight); //create the canvas
	frameRate(50); //initialize the frame rate
	smooth();

//initialize the bubbles
	for(var i=0;i<num;i++){ 
		var r=10+random(10);
		var x= random(r,width-r);
		var y= random(r,height-r);
		bubble[i]=new Bubble(r,x,y);  //initialize the bubble[i]
	}

//try to aovid overlapping at the beginning
	for(var i=0;i<bubble.length;i++){		
		var bub=bubble[i];
		for(var j=0;j<bubble.length;j++){
			var other=bubble[j];
			if(bub!==other){
				var d=dist(bub.x, bub.y, other.x, other.y);
			}
			if (d<bub.r+other.r+1){
				bub.r=floor(d/2);
				other.r=floor(d/2);
			}
		}
	}

//intialize the cueBubble
	cueBubble=new windTunnel(mouseX,mouseY);		//setting the location values for the constructor
}

//the bubble will disapper if click it
function mousePressed(){

	for(var i=0;i<bubble.length; i++){
		if(bubble[i].clicked(mouseX,mouseY)){
			bubble.splice(i,1);		//removing the connection points
		}
	}
			bubble.push(new Bubble(5+mouseX%15,mouseX,mouseY));	//adding connection points, setting the location values for the constructor
		}



//draw bubbles
function draw() {
	background(0);

	push();		//change the (0,0) coordinate
	translate(mouseX,mouseY);
	cueBubble.show();		//show function from class
	//cueBubble.changeColor(255,255,255);
	pop();
	
	for(var i=0;i<bubble.length;i++){		
		var bub=bubble[i];
		bubble[i].move();		//move function from class
		bubble[i].show();		//show function from class


		//avoid overlapping between any two bubbles
		var changeC=false;
		for(var j=0;j<bubble.length;j++){
			var other=bubble[j];

			if(bub!==other){
				var d=dist(bub.x, bub.y, other.x, other.y);		//calculate the distance between two bubbles
			}

			if (d<bub.r+other.r+1){
				bubble[i].bounce();		//the bubble will bounce if the distance less than the radiuses of any two bubbles
			}

			if (d<bub.r+other.r+8){		//changing the color if the distance between two bubbles is less than "bub.r+other.r+8"
				changeC=true;
			}

			if(changeC){
				bubble[i].changeColor(random(255),random(255),random(255));		//changing the color
			}else{
				bubble[i].changeColor(127,10,215);		//the color that shows in the condition when the bubbles are not overlapping
			}

			//create triangles
			for(var m=0;m<bubble.length;m++){
				var other2=bubble[m];
				if(other2!==other && other2!==bub){
					var d2=dist(bub.x, bub.y, other2.x, other2.y);
					var d3=dist(other.x, other.y, other2.x, other2.y);
				}

				//if (d<=6*bub.r+6*other.r && d2<=6*bub.r+6*other2.r && d3<=6*other.r+6*other2.r ){
					if (d<width/8 && d2<width/8 && d3<width/8){		
						stroke(16,16,255,150);
					//var r=map(mouseX,0,width,100,175);
					var g=map(bub.x,0,width,30,130);
					var b=map(bub.y,0,height,50,200);
					fill(127,g,b,50);
					strokeWeight(1);
					triangle(other.x,other.y,bub.x,bub.y,other2.x,other2.y);  //create a triangle
				}
			}
		}
	}

		//Press key to clean the canvas and reset the bubbles
		if(keyIsPressed){
			background(0);
			bubble.length=25;		//initialize the number of the bubbles
		}
	}



class Bubble{
	constructor(tempR,tempX,tempY){
		this.x=tempX;
		this.y=tempY;
		this.r=tempR;
		this.vel=2+sin(radians(random(180)));
		//this.acc=0.03;

	}

	//change color
	changeColor(tempRB,tempGB,tempBB){ 
		this.rB=tempRB;
		this.gB=tempGB;
		this.bB=tempBB;
		//this.trans=100;
	}

	//move bubbles
	move(){
		//this.vel=this.vel+this.acc;
		this.x=this.x+this.vel*cos(this.r);
		this.y=this.y+this.vel*sin(this.r);
		if (this.x+this.r>=width || this.x-this.r<=0 || this.y+this.r>=height || this.y-this.r<=0){
			this.vel*=-1;
		}

	}

    //draw bubbles
    show(){
    	noStroke();
    	//strokeWeight(0.5);
    	fill(this.rB,this.gB,this.bB,200);
    	ellipse(this.x,this.y,2*this.r,2*this.r);
    }


	//the bubble will disapper if click it
	clicked(tempMx,tempMy){
		this.mx=tempMx;
		this.my=tempMy;

		let d= dist(this.mx,this.my,this.x,this.y);
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

//create the wind tunnel
class windTunnel{
	constructor(tempX,tempY){
		this.x=tempX;
		this.y=tempY;
		this.r=20;
	}

	show(){
		for(var i=0; i<360; i+=15){
			if(this.r<50){
				this.r+=0.005;
			}else{this.r=20;
			}
			this.x=sin(this.r)*30;
			this.y=cos(this.r)*30;
			rotate(radians(i));		//rotate the ellipse to have an animation
			fill(134,111,189,50);
			noStroke();
			ellipse(this.x,5+this.y,this.r,1.5*this.r);		//drawing the wind tunnel
		}
	}
}