var myGamePiece;
var playerStats = {
  hp: 5,
  attackSpeed: 1,
  level: 10,
};
let castle = document.getElementById("castle");
let enemy_0 = document.getElementById("enemy_0");
let enemy_1 = document.getElementById("enemy_1");
let enemy_2 = document.getElementById("enemy_2");
let enemy_3 = document.getElementById("enemy_3");
let enemy_4 = document.getElementById("enemy_4");
let enemy_5 = document.getElementById("enemy_5");
let enemy_6 = document.getElementById("enemy_6");
let enemy_7 = document.getElementById("enemy_7");
let enemy_8 = document.getElementById("enemy_8");
let enemy_9 = document.getElementById("enemy_9");
let grassbackground = document.getElementById("grassbackground");

let enemiesImage = [enemy_0,enemy_1,enemy_2,enemy_3,enemy_4,enemy_5,enemy_6,enemy_7,enemy_8,enemy_9]
let listOfEnemies = [];
let listOfProjectiles = [];


function startGame() {
  myGameArea.start();
  myGameArea.background();
  myGameArea.canvas.onclick = (event) => {
    const rect = myGameArea.canvas.getBoundingClientRect();

    console.log(`x: ${event.clientX-rect.left} y: ${event.clientY-rect.top}`);
    const x = event.clientX-rect.left;
    const y = event.clientY-rect.top;
    listOfProjectiles.push(new Projectile(x,y,0,0,document.getElementById("enemy_0")));
  }
  generateEnemies();
}

function drawEnemy() {
  listOfEnemies.forEach(
    (object) => new ComponentImage(object.image, object.xCord, 370, 70, 75)  );
}
function drawProjectiles() {
  listOfEnemies.forEach(
    (object) => new ComponentImage(object.image, object.xCord, 370, 70, 75)  );
}

function generateEnemies() {
  let i = 0;
  while (i < playerStats.level) {
    listOfEnemies.push(generateEnemy());
    i++;
  }
  console.log(listOfEnemies);
}

function generateEnemy() {
  let enemy = new Object();
  enemy.image = enemiesImage[Math.floor(Math.random() * 10)];
  //Random number between 0.5 - 5
  enemy.speed = Math.random() * (4 - 1) + 1;
  enemy.hp = Math.floor(Math.random() * 10) + 1;
  enemy.attack = 1;
  enemy.xCord = Math.floor(Math.random() * 500) + 500;
  return enemy;
}

let CastleWallXCord = 200;

function moveEnemies() {
  listOfEnemies.forEach((enemy) => {
    //move left
    enemy.xCord = enemy.xCord - enemy.speed;
    if (enemy.xCord <= CastleWallXCord) {
      //player looses life
      playerStats.hp = playerStats.hp - 1;
      let index = listOfEnemies.indexOf(enemy);
      console.log(enemy,"enemy", index,"index")
      listOfEnemies.splice(index);
    }
  });
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1280;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertAdjacentElement("beforeend", this.canvas);
  },
  background: function () {
    new Component(window.innerWidth, window.innerHeight, "#87CEEB", 0, 0);

    background = new ComponentImage(
      grassbackground,
      0,
      100,
      window.innerWidth,
      400
    );
    
    ComponentText(
      `Hp:${playerStats.hp}| Attack Speed:${playerStats.attackSpeed}| Level:${playerStats.level}`,
      "30px", 
      10,
      50,
      "black"
    );
    new ComponentImage(castle, -55, 100, 340, 375);
    
  },
};

function Component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

function ComponentImage(imageSrc, x, y, width, height) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.src = imageSrc;
  ctx = myGameArea.context;


  ctx.drawImage(imageSrc, x, y, width, height);
   
}

function ComponentText(text, size, x, y, color) {
  this.text = text;
  this.size = size;
  this.font = "Helvetica";
  this.x = x;
  this.y = y;
  this.color = color;
  ctx = myGameArea.context;
  ctx.fillStyle = color;

  ctx.font = `${this.size} ${this.font}`;
  ctx.fillText(this.text, this.x, this.y);
}

startGame();

function update() {
  requestAnimationFrame(update);
  myGameArea.background();
  moveEnemies();  
  drawEnemy();
  listOfProjectiles.forEach(projectile => {projectile.draw();});
}

update()

class Projectile
{
  constructor(x,y,speed,angle,imageSrc){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.imageSrc = imageSrc;
    this.ctx = myGameArea.context;
    this.ctx.drawImage(imageSrc, x, y, 50, 50);
  }
  
  draw(){
    this.ctx.drawImage(this.imageSrc, this.x, this.y, 50, 50);
  }
}