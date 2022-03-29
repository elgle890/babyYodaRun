var solo1, soloImg, solo2;
var grogu, groguImg, groguOver;
var stormtrooper, stormImg;
var placar = 0;
var gameOver, imagemOver;
var deserto;
var scream, cry;

var estado = "jogar";

var grupoStorm;

function preload() {
  groguImg = loadImage("Baby Yoda 2.png");
  groguOver = loadImage("Baby Yoda 1.png");
  stormImg = loadImage("stormtrooper 1.png");
  soloImg = loadImage("ground2.png");
  deserto = loadImage("deserto.png");
  imagemOver = loadImage("gameover-removebg.png");
  scream = loadSound("scream.mp3");
  cry = loadSound("cry.mp3");
  //scream.looping = false;
}

function setup() {
  createCanvas(600, 300);
  grogu = createSprite(100, 150, 10, 10);
  grogu.scale = 0.2;
  grogu.addImage("grogu base", groguImg);
  grogu.addImage("grogu over", groguOver);
  grogu.setCollider("circle", -10, 0, 45);

  grupoStorm = new Group();

  solo1 = createSprite(300, 280, 600, 20);
  solo1.addImage(soloImg);
  solo2 = createSprite(300, 300, 600, 50);
  solo2.visible = false;

  grogu.depth = solo2.depth + 1;

  gameOver = createSprite(300, 90, 20, 20);
  gameOver.scale = 0.5;
  gameOver.addImage("game over", imagemOver);
  gameOver.visible = false;
}

function criaStormie() {
  if (frameCount % 60 == 0) {
    stormtrooper = createSprite(600, 260, 30, 30);
    stormtrooper.scale = 0.2;
    stormtrooper.lifetime = 110;
    stormtrooper.addImage(stormImg);
    grupoStorm.add(stormtrooper);

    if (6 + Math.round(placar / 100) > 20) {
      stormtrooper.velocityX = 20;
    } else {
      stormtrooper.velocityX = -(6 + Math.round(placar / 100));
    }
  }
}

function draw() {
  background(deserto);
  drawSprites();

  fill("gray");
  text("pontuação " + placar, 500, 50);

  criaStormie();

  if (estado == "jogar") {
    if (frameCount % 10 == 0) {
      placar = placar + 1;
    }

    grogu.collide(solo2);
    solo1.velocityX = -3;
    console.log(solo1.x);

    //solo infinito
    if (solo1.x < 0) {
      solo1.x = solo1.width / 2;
    }

    //pular
    if (keyDown("space") && grogu.y == 266) {
      grogu.velocityY = -8;
    }

    console.log("y do grogu: " + grogu.y);

    grogu.velocityY = grogu.velocityY + 0.5;


    if (placar % 50 == 0) {
      scream.play();
      console.log("aqui");
    }

    if (grupoStorm.isTouching(grogu)) {
        estado = "encerrar";
        solo1.velocityX = 0;
        cry.play();
        
     }

    
  }

  if (estado == "encerrar") {
    grupoStorm.destroyEach();
    solo1.velocityX = 0;
    grogu.velocityY = 0;
    grogu.changeAnimation("grogu over");
    gameOver.visible = true;
  }
}
