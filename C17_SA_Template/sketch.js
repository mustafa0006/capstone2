//boilerplate
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOverImg,restartImg
//
function preload(){

 
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
  trex_running = loadAnimation("trex1.png",
  "trex3.png","trex4.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")//project?
  gameOverImg = loadImage("gameOver.png")


  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.scale = 0.5;

  trex.addAnimation("running", trex_running);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  gameOver = createSprite(300,70);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300,120);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
}

function draw() {
  //setting the background
  background(255);
  //displaying score
   text("score:"+score,500,50);
   trex.collide(ground);
   
  if(gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    score=score+Maths.round(getFrameRate()/60);
    
    if(keyDown("space")&& trex.y >= 100) {
      // make the player jump
      trex.velocityY = -12; 
    }
    //complete adding the gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    trex.collide(ground);  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles()
     spawnObstacles()
     if (obstaclesGroup.isTouching(trex)){
    gameState=End;
  }

  else if(gameState === END){
    // complete the 2 statements
   gameOver.visible=true;   
  restart.visible =true;   
    obstaclesGroup.setVelocityXEach(0);   
    cloudsGroup.setVelocityXEach(0);   
    obstaclesGroup.setLifetimeEach(-1); 
    cloudsGroup.setLifetimeEach(-1); 

    
    trex.changeAnimation("trex_collided",trex_collided); 
    if(mousePressedOver(restart)){    
     reset();
    }
  }

  drawSprites();
}


function spawnObstacles(){
  if (frameCount % 60 ==  0){    
//Creat the obstacle sprite at x=800,y=165,w=10,h=40
var obstacle = createSprite(800,165,10,40); 
    obstacle.velocityX = -6;
     var rand = Math.round(random(1,6));  //sa   4 
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);  
               break;
       default: break;
     }
     obstacle.scale = 0.5;   
     obstaclesGroup.add(obstacle); 
    }
 }  

 function reset(){
  trex.changeAnimation("trex_running",trex_running);//template
    // complete the 2 statements
  restart.visible = false;    
  gameOver.visible =false;    
  cloudsGroup.destroyEach();  
  obstaclesGroup.destroyEach();
  score=0;
  gameState=play;  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    //adding cloud to the group
    cloudsGroup.add(cloud);
  }
}

