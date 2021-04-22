var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,bananaGroup;
var survivalTime=0;
var invisibleGround;
var score;
var bananaScore = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible =true;
  
  FoodGroup=new Group();  
  obstacleGroup=new Group();

  
}


function draw() {
background("white");
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
   if (gameState===PLAY){
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -12;
   }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  
  
  
  food();
spawnObstacles();
  if(FoodGroup.isTouching(monkey)){
  FoodGroup[0].destroy();
  }
     
    
else if (gameState === END ) {
        ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
}
}
drawSprites();
  
}

function food(){
  if (frameCount % 60 === 0) {
    var banana= createSprite(300,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
   banana.lifetime=300;
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
     FoodGroup.add(banana);
    
    if(FoodGroup.isTouching(monkey)){
  FoodGroup[0].destroy();
  }
    
  }
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(390,320,10,40);
obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6
  obstacle.lifetime = 70;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);



  }
}


