var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bunny, bunny_running, bunny_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudsImage;
var bushGroup, bush1, bush2, bush3, bush4;

var score;

var gameOverImg,restartImg


function preload(){
bunny_running = loadAnimation("bunny1.png","bunny2.png","bunny3.png");
bunny_collided = loadAnimation("dead.png");

groundImage = loadImage("grass.png");
  
cloudsImage = loadImage("clouds.png");

bush1 = loadImage("bush1.png");
bush2 = loadImage("bush2.png");
bush3 = loadImage("bush3.png");
bush4 = loadImage("bush4.png");

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
 
createCanvas(575, 400);

ground = createSprite(200,300,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

bunny = createSprite(50,240,20,50);
bunny.addAnimation("running", bunny_running);
bunny.addAnimation("collided" ,bunny_collided);
bunny.scale = 0.5;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

invisibleGround = createSprite(200,310,400,10);
invisibleGround.visible = false;

bushGroup = createGroup();
cloudsGroup = createGroup();
  
  score = 0;

}

function draw() {

 background(rgb(128,234,255));

 text("Score: "+ score, 500,50);
  
 console.log("this is ",gameState)
 
 
 if(gameState === PLAY){
   gameOver.visible = false
   restart.visible = false
   
   ground.velocityX = -4

   score = score + Math.round(frameCount/60);
   if(score>0 && score % 100 === 0 ){
     
   }
   if (ground.x < 175){
     ground.x = ground.width/2;
   }

   if(keyDown("space")) {
    bunny.velocityY = -12;
  }
  
  bunny.velocityY = bunny.velocityY + 0.8

  spawnClouds();
  spawnObstacles();
  
  if(bushGroup.isTouching(bunny)){
    gameState = END;
    bunny.velocityY=-12
  }
 }
 else if (gameState === END) {
    console.log("hey")
     gameOver.visible = true;
     restart.visible = true;
    
     ground.velocityX = 0;
     bunny.velocityY = 0
    
     bunny.changeAnimation("collided", bunny_collided);
    
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
 
  bunny.collide(invisibleGround);


    drawSprites()
 }

 function spawnObstacles(){
    if (frameCount % 60 === 0){
      var bushes = createSprite(400,260,10,40);
      bushes.velocityX = -4
      
       //generate random obstacles
       var rand = Math.round(random(1,4));
       switch(rand) {
         case 1: bushes.addImage(bush1);
                 break;
         case 2: bushes.addImage(bush2);
                 break;
         case 3: bushes.addImage(bush3);
                 break;
         case 4: bushes.addImage(bush4);
                 break;
         default: break;
       }

       bushes.scale = 1;
       bushes.lifetime = 300;
   
       bushGroup.add(bushes);
    }
}   
function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
       clouds = createSprite(600,100,40,10);
      clouds.y = Math.round(random(10,60));
      clouds.addImage(cloudsImage);
      clouds.scale = 0.5;
      clouds.velocityX = -3;
      
       //assign lifetime to the variable
      clouds.lifetime = 134;
      
      //adjust the depth
      clouds.depth = bunny.depth;
      bunny.depth = bunny.depth + 1;
    
      //adding cloud to the group
     cloudsGroup.add(clouds);
      }
  }
    


