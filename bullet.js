class Circle {
  constructor() 
  {
    this.c = color(255, 255, 0);
    this.x = -10;
    this.y = -10;
    this.d = 30;
    this.s = 20;
  }

  display(arg1 = this.c, arg2 = this.d) 
  {
    push();
    noStroke();
    fill(arg1);
    ellipse(this.x, this.y, arg2, arg2/2);
    pop();
  }

  move() 
  {
    this.x += this.s;
    
  }

  reset()
  {
    this.x = -10;
    this.y = -10;
  }
}
