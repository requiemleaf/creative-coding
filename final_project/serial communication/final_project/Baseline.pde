class Baseline { 
  float an1, an2, an3, an4, v1, v2, v3, v4, t1, t2, t3, t4, pct;  
  
  //creating the constructor
  Baseline(int n) {  
    pct=1.0/n;
    an1=random(TWO_PI);
    v1=random(-0.015, 0.015);
    t1=random(10, 120);
    an2=random(TWO_PI);
    v2=random(-0.015, 0.015);
    t2=random(10, 120);
    an3=random(TWO_PI);
    v3=random(-0.015, 0.015);
    t3=random(10, 120);
    an4=random(TWO_PI);
    v4=random(-0.015, 0.015);
    t4=random(10, 120);
  }

  void display(float col) { 
    an1+=v1;
    an2+=v2; 
    an3+=v3;
    an3+=v4;
    
    //initialize PVvectors
    PVector p1=new PVector(-t1+cos(an1)*t1, -t1+sin(an1)*t1);
    PVector p2=new PVector(-t2+cos(an2)*t2, t2+height+sin(an2)*t2);
    PVector p3=new PVector(width+t3+cos(an3)*t3, -t3+sin(an3)*t3);
    PVector p4=new PVector(width+t4+cos(an4)*t4, t4+height+sin(an4)*t4);
    
    for (float pc=0; pc<1; pc+=pct) {
      stroke(col);
      strokeWeight(1.5);
      
      //drawing the baselines
      line(lerp(p1.x, p2.x, pc), lerp(p1.y, p2.y, pc), lerp(p3.x, p4.x, pc), lerp(p3.y, p4.y, pc));
    }
  }
}
