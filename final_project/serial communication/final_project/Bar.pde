class Bar{
  //float n;
  
  Bar(float u_){
    u=u_;
    //float n=100;
  }
  
  void display(float u){
    //noStroke();
    //fill(200*u,200*u,200*u);
    for (int i = 0; i < 100; i++) {
      float col = map(i, 0, 100, 0, 255);
      //println(col);
      fill(col, col/2, 2*col/5, 150);
      noStroke();
    }
    rect(0,height-50*u,50,height-50*u);
    rect(55,height-70*u,50,height-70*u);
    rect(55*2,height-90*u,50,height-90*u);
    rect(55*3,height-110*u,50,height-110*u);
    rect(55*4,height-90*u,50,height-90*u);
    rect(55*5,height-70*u,50,height-70*u);
    rect(55*6,height-50*u,50,height-50*u);
  }
}

    
