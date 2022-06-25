let x = 0, x1 = 0, y = 0, y1 = 0, d = 60;
let velocityX = 1;
let velocityY = 1;
let speed = 3;

let bullet = [];
let bullet_check = [];
let bulletNum = 10;

let enemy = [];
let enemyNum = 15;

let USER_HP = 100;
let SCORE = 0;
let play_check = 0;

let button;

let background_img;
let hero_img;
let zombie_img;

function preload()
{
  warpSound = loadSound( 'media/Jump2.wav' );
  backgroundMusic = loadSound( 'media/il vento doro.mp3' );
  thrustSound = loadSound( 'media/Explosion9.wav' );

  background_img = loadImage('media/background.jpg');
  hero_img = loadImage('media/hero.png');
  zombie_img = loadImage('media/zombie.jfif');
}

function setup() 
{
  frameRate(60)

  button = createButton('Giving Help');
  createCanvas(1497, 763);
  background(0);
  
  x= 300;
  y= height/2;
  x1 = 65;
  y1 = height/2

  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i] = new Circle();
    bullet_check[i] = 0;
  }
  for(let i = 0; i<enemyNum; i++)
  { 
    enemy[i] = new Enemy();
  }
  backgroundMusic.loop(); 
  backgroundMusic.setVolume(0.5);  
}

function touchStarted() 
{
  getAudioContext().resume();
}

function draw() 
{
  background(0);
  image(background_img, 0, 0, 1497, 763);
  hero();
  push();
  fill(150, 0, 0);
  rect(130, 0, 50, 763);
  pop();
  print(USER_HP);
  collBulletEnemy();
  collMeEnemy();
  enemyCheck();
  Target();
  bulletCheck();
  textPrint();
  EndOfGame();
}

function bulletCheck()
{
  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i].display();
    bullet[i].move();

    if(this.y <0 || this.y >height)
    {
      this.velocity *= -1
    }

    if(this.x > width || this.x < 0)
    {
      this.reset();
    }
  }

  for(let i = 0; i<bulletNum; i++)
  { 
    if(bullet[i].x > width)
    {
      bullet_check[i] = 0;
    }
  } 
}

function keyPressed()
{
  if(keyIsDown(32))
  {     
    for(let i = 0; i<bulletNum; i++)
    {
      if(bullet_check[i] == 0)
      {
        bullet[i].x = x1;
        bullet[i].y = y1;
        bullet_check[i] = 1;
        break;
      }
    } 
  }

  if((key == 'r') || (key == 'R'))
  {
    reset();
  }
}

function enemyCheck()
{
  let i = 0;
  while(i<enemyNum)
  {
    enemy[i].display();
    enemy[i].move();
    i++;
  }

  for(let i = 0; i< enemyNum; i++)
  { 
    if(enemy[i].x > width)
    {
      enemy[i].reset();
    }
  } 
}

function collBulletEnemy()
{
  for(let i = 0; i<enemyNum; i++)
  { 
    for(let j = 0; j<bulletNum; j++)
    {
      let dis = 100;

      if(bullet_check[j] == 1) 
      {
        dis = dist(bullet[j].x, bullet[j].y, enemy[i].x, enemy[i].y);
      }

      if(dis<enemy[i].d/2)
      {
        thrustSound.play();
        print(dis);
        enemy[i].y=-50;
        SCORE++;
        bullet_check[j]=0;
        bullet[j].reset();
        enemy[i].reset();
        USER_HP++;
      }
    }
  }
}



function collMeEnemy()
{
  for(let i = 0; i<enemyNum; i++)
  { 
    let dis = 100;
    dis = dist(x, y, enemy[i].x, enemy[i].y);
    
    if(dis<d*3/4)
    {
      print(dis);
      fill(255,0,0);
      USER_HP--;
      warpSound.play();
    }    
  }
}

function textPrint()
{
  push();
  fill(255,255,0);
  rect(0,0,width,30);
  fill(0);
  text("SCORE : "+SCORE, 10, 20);
  text("HP : "+USER_HP, width-50, 20);
  pop();
}

function reset()
{
  play_check++;
  button.hide();
  USER_HP = 100;
  SCORE = 0;
  x= 300;
  y= height/2;
  x1 = 65;
  y1 = height/2
  
  bullet = [];
  bullet_check = [];
  enemy = [];

  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i] = new Circle();
    bullet_check[i] = 0;
  }

  for(let i = 0; i<enemyNum; i++)
  { 
    enemy[i] = new Enemy();
  }
}

function EndOfGame()
{
  if(USER_HP<0)
  {
    background(0);
    push();
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("You couldn't be helpful", width/2, height/2);
    text("if you want to be helpful, plz press R", width/2, height/2+40);
    pop();
    warpSound.pause();
    thrustSound.pause();

  }  
  if(play_check==0)
  {
    background(0);
    push();
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("We will attack zombie", width/2, height/2 - 60);
    text("plz press the button, And help us", width/2, height/2-20);
    textSize(20);
    text("( Player can move w, s )", width/2, height/2+40)
    text("( Player can shoot space_bar )", width/2, height/2+70)

    pop();
    button.center();
    button.position(width/2-40, height/2);
    button.mousePressed(reset);
    warpSound.pause();
    thrustSound.pause();
  }  
}

function Target()
{
  fill(255, 0, 0);
  ellipse(x1, y1, 30, 30);
  fill(0);
  ellipse(x1, y1, 20, 20);
  push();
  strokeWeight(2);
  stroke(255, 0, 0);
  line(x1-10, y1, x1+10, y1);
  line(x1, y1-10, x1, y1+10);
  pop();

  if (keyIsDown(87) && y1 > 50)
  {
    y1 -= 5;
  }

  if (keyIsDown(83) && y1 < height-20)
  {
    y1 += 5;
  }
}

function hero()
{
  image(hero_img, x, y, d*1.5, d*1.5);

  if(USER_HP > 100)
  {
    x += speed* 4* velocityX;
    y -= speed* velocityY;
  }

  x += speed*velocityX;
  y -= speed*velocityY;

  if (x > width - d || x < d*3)
  {
    velocityX *= -1;
  }
  
  if (y > height - d || y < 30) 
  {
    velocityY *= -1;
  }
}