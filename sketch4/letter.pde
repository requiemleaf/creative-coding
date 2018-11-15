class Letter {
  char letter;
  PVector pos, ll;
  
  Letter(PVector pos, char letter) {
    this.pos = pos.get();
    this.letter = letter;
    update();
  }
  
  void update() {
    ll = new PVector(random(-3,3), random(-3,3), random(-0.1, 0.1));
  }
  
  void display() {
    fill(255);
    textAlign(CENTER);    //Sets the current alignment for drawing text
    pushMatrix();
    translate(pos.x, pos.y);    //translate
    rotate(pos.z);    //rotate the letter
    text(letter,0, 0);
    popMatrix();
    edge();
  }
  
  void edge() {    //bounce at the edge of the canvas
    if ((pos.x > width)||(pos.x < 0)) {
      ll.x *= -1;
    }
    if ((pos.y > height)||(pos.y < 0)) {
      ll.y *= -1;
    }
    pos.add(ll);
  }
}
