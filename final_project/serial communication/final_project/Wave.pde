class Wave {
  float t;
  
  Wave(float u_) {
    u=u_;
    t=100;
  }

  //draw the waves
  void display(float u) {

    //float u=map(mouseX, width/20, width, 0, 1);
    for (int i = 0; i < t; i++) {
      float col = map(i, 0, t, 0, 255);
      //println(col);
      stroke(col, col/2, 2*col/5, 150);
      noFill();
      strokeWeight(3);
      
      //drawing the waves
      beginShape();
      for (int x=0; x < width; x += 10) {
        float n = noise(x * 0.001, u*i * 0.015, frameCount * 0.05);    //creating Perlin noise
        float y = map(n, 0, 1, 0, height);
        vertex(x, y);
        //println(u);
      }
      endShape();
      


    }
  }
}
