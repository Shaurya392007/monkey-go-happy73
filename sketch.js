var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(510,250);
  background("lightgreen");
  
  
  monkey = createSprite(50,200,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(220,230,600,10);
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  

  
  score = 0;
}


function draw() {
  background("white");
  
if (keyDown("space") && monkey.y >= 190 ) {
  monkey.velocityY = -14;
}
  
  if (FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score = score +1;
}
  
  if (obstacleGroup.isTouching(monkey)){
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    background("black");
      
      
      }

  
   monkey.velocityY = monkey.velocityY + 0.8;
  
if (ground.x < 0){
  ground.x = ground.width/2;
}
  
  spawnObstacle();
  spawnBanana();
  
  monkey.collide(ground);
  
    stroke("black");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
  
  
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100, 50);
    
  drawSprites(); 
}

function spawnObstacle(){
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(550,207,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7; 
    obstacle.scale = 0.1;                     
    obstacle.lifetime = 90;
    
  obstacleGroup.add(obstacle);

  }
}

function spawnBanana(){
  if (frameCount % 130===0) {
    banana = createSprite(550,100,30,10);         
    banana.y = Math.round(random(50,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 90;
    
    FoodGroup.add(banana);
  }
}