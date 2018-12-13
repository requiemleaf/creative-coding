/*
Final Project: Moiré Pattern Simulation
Name: Zhenwen(Wayne) Zhang
Auxiliary Equipment: Arduino
Brief Introduction: Moiré Pattern is a large-scale interference pattern that
can be produced when an opaque ruled pattern with transparent gaps is overlaid
on another similar pattern.
I am trying to explore this fantastic physical phenomenon
*/

import processing.serial.*;

Serial myPort;  // Create object from Serial class
float data;      // Data received from the serial port
float u;
Baseline baselines1;
Baseline baselines2;
Wave waves;    //creating the bar class
Bar bars;    //creating the bar class

void setup() {
  //size(1200, 600);
  fullScreen();    //creating the canvas
  frameRate(30);
  myPort=new Serial(this, "/dev/cu.usbmodem1441", 9600);
  
  //initializew objects
  baselines1= new Baseline(90);    //creating baseline object
  baselines2= new Baseline(90);    //creating baseline object
  waves= new Wave(data);    //creating wave object
  bars=new Bar(data);    //creating wave bars
}

void draw() {
  if (myPort.available()>0){
    data=myPort.read();    //output data from Arduino
  }
  //println(data);
  
  //if(data>=2 && data<=5){
  //  u=0.4;
  //}
  //if(data>5 && data<=8){
  //  u=0.5;
  //}
  //if(data>8 && data<=11){
  //  u=0.6;
  //}
  //if(data>11 && data<=14){
  //  u=0.7;
  //}
  //if(data>14 && data<=18){
  //  u=0.8;
  //}
  //if(data>18){
  //  u=0.9;
  //}
  
  if(data<60){
    u=map(data,0,50,0,1);    //changing the range of data variables
  }else{
    u=1;    //giving the maximum of variables
  }
    
  background(0);
  baselines1.display(120);    //display the baselines
  baselines2.display(120);    //display the baselines
  waves.display(u);    //display the wave
  bars.display(u);    //display the wave bar
  
  //creating the title
  pushMatrix();
  translate(50, 50);    //translate (0,0) location
  fill(255);
  text("Moiré Pattern Simulation", 0, 0); 
  text("Distance ="+ data+" cm", 0, height-80);
  textSize(20);    //the title's sizes
  //fill();
  popMatrix();
}
