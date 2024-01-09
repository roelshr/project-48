var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var zombieGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullets = 65;
var gameState = "fight";
var life = 2

var bulletGroup;
var score = 0;

function preload() {
  shooterImg = loadImage("assets/shooter_1.png");
  shooter_shooting = loadImage("assets/shooter_2.png");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bgImg = loadImage("assets/bg.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 2.3;

  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.1;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 500, 1100);

  heart1 = createSprite(displayWidth - 180, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth - 150, 40, 20, 20); 
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth - 120, 40, 20, 20); 
  heart3.visible = true;
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;

  zombieGroup = new Group();
  bulletGroup = new Group();

  enemy()
}

function draw() {
  background(0);

    if (gameState === "fight") {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy();
          reduceHearts();
          life = life - 1
      if (score == 100){
        gameState = "win"
      }
        }
      }
    } else if (gameState === "end") {
      textSize(50);
      fill(255, 0, 0);
      text("Game Over", width / 2 - 150, height / 2);
    }

    var spawnInterval = max(60 - score, 20);
  if (frameCount % spawnInterval === 0) {
    enemy();}


  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
  }

  if (keyWentDown("space")) {
    player.addImage(shooter_shooting);
    player.scale = 0.3;
    player.setCollider("rectangle", 0, 0, 200, 400);
    shootBullet();
  } else if (keyWentUp("space")) {
    player.addImage(shooterImg);
    player.scale = 0.1;
    player.setCollider("rectangle", 0, 0, 500, 1100);

  }

  for (var i = 0; i < zombieGroup.length; i++) {
    for (var j = 0; j < bulletGroup.length; j++) {
      if (bulletGroup[j].isTouching(zombieGroup[i])) {
        zombieGroup[i].destroy();
        bulletGroup[j].destroy();
        score = score + 2
      }
    }
  }

  drawSprites();
  
  textSize(20);
  fill(255);
  text("Score: " + score, 20, 20);

  var spawnDelay = max(1000 - score * 50, 200);
 
}


function shootBullet() {
  var bullet = createSprite(player.x, player.y - 30, 20, 10);
  bullet.velocityX = 40;
  bulletGroup.add(bullet);
  bullet.lifetime = 30;
}

function enemy() {
  var zombie = createSprite(random(1000, width - 100), random(height-300, height-100), 40, 40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.30;
  zombie.debug = true;
  zombie.setCollider("rectangle", 50, 100);
  zombie.lifetime = 500;
  zombie.velocityX = -2.5;
  zombieGroup.add(zombie);
}
function reduceHearts() {
  if (gameState !== "end") {
     if (life == 2){
      heart2.visible = true
      heart3.visible = false
    }
    else if (life == 1){
      heart1.visible = true
      heart2.visible = false
    }
    else if (life <= 0){
      gameState = end
    }
} 
}

if(gameState === "end"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}
