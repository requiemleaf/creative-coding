PImage img;    //a variable for the image file
boolean drawing=false;
PFont f;    //declare PFont variable
String m="Radiohead";
Letter[] letters;    //an array of Letter objects

void setup() {
  size(700, 700);
  img = loadImage("album1.jpg");    //load image
  img.loadPixels();    //load the pixels of the image  
  background(0);
  frameRate(2000);

  f=createFont("Arial", 100);    //create the font
  textFont(f);    //specify font to be used
  letters = new Letter[m.length()];    //create the array the same size as the string
  //initialize letters for the location
  int fx=width/2;    //variables for location
  int fy=height/2;    //variables image location
  for ( int i=0; i<m.length(); i++) {
    letters[i]=new Letter(new PVector(fx, fy, 0), m.charAt(i));
    fx+=textWidth(m.charAt(i));
  }
}

void draw() {
  //background(0);
  //create a loop; look over every pixel in the image
  for (int x = 0; x < img.width; x++) {
    for (int y = 0; y < img.height; y++) {
      int index = x + y * img.width;    //choose one pixel in the image
      color c = img.pixels[index];    //grab the color
      float b = brightness(c);      
      if (b>1) {
        drawing=true;
      }
    }
  }

  //drawing
  if (drawing) {
    float x=random(img.width);
    float y=random(img.height);
    float r=map(mouseX, 0, width, 5, 15);    //control circles' sizes
    color c=img.get(int(x), int(y));
    fill(c, 150);
    strokeWeight(2);
    stroke(c);
    ellipse(x, y, 2*r, 2*r);
  }

//if the mouse is pressed the letters move
  if (mousePressed) {
    background(img);
    for (int i=0; i < letters.length; i++) {
      letters[i].display();
    }
  }
}

//void mousePressed(){
//}

//void mouseDragged(){
//}

void keyPressed() {
  background(0);
}
