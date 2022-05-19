class Projectile {
  static IMAGE_SIZE = {
    x: 50,
    y: 50,
  };
  constructor(x, y, speed, angle, imageSrc) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle - Math.PI / 2;
    this.imageSrc = imageSrc;
    this.ctx = myGameArea.context;
    this.timeToLive = 600;
    this.alive = true;
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.timeToLive -= 1;
  }

  draw() {
    this.ctx.drawImage(
      this.imageSrc,
      this.x,
      this.y,
      Projectile.IMAGE_SIZE.x,
      Projectile.IMAGE_SIZE.y
    );
  }
}

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

let enemiesImage = [
  enemy_0,
  enemy_1,
  enemy_2,
  enemy_3,
  enemy_4,
  enemy_5,
  enemy_6,
  enemy_7,
  enemy_8,
  enemy_9,
];
let listOfEnemies = [];
let listOfProjectiles = [];

function startGame() {
  myGameArea.start();
  myGameArea.background();
  myGameArea.canvas.onclick = (event) => {
    const spawnPosition = {
      x: 100,
      y: 140,
    };

    const rect = myGameArea.canvas.getBoundingClientRect();

    console.log(
      `x: ${event.clientX - rect.left} y: ${event.clientY - rect.top}`
    );
    const x = event.clientX - rect.left - spawnPosition.x;
    const y = event.clientY - rect.top - spawnPosition.y;
    const angle = Math.atan2(y, x) + Math.PI / 2;
    listOfProjectiles.push(
      new Projectile(
        spawnPosition.x - Projectile.IMAGE_SIZE.x / 2,
        spawnPosition.y - Projectile.IMAGE_SIZE.y / 2,
        2.5,
        angle,
        document.getElementById("projectile")
      )
    );
  };
  generateEnemies();
}

function drawEnemy() {
  listOfEnemies.forEach(
    (object) => new ComponentImage(object.image, object.xCord, 370, 70, 75)
  );
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
  enemy.speed = Math.random() * 0.8 + 0.5;
  enemy.hp = Math.floor(Math.random() * 10) + 1;
  enemy.attack = 1;
  enemy.xCord = Math.floor(Math.random() * 500) + 1200;
  enemy.alive = true;
  return enemy;
}

let CastleWallXCord = 350;

function moveEnemies() {
  listOfEnemies.forEach((enemy) => {
    //move left
    enemy.xCord = enemy.xCord - enemy.speed;
    if (enemy.xCord <= CastleWallXCord) {
      //player looses life
      playerStats.hp = playerStats.hp - 1;
      enemy.alive = false;
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
    new ComponentImage(castle, 0, 100, 440, 475);
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
  myGameArea.background();
  moveEnemies();
  drawEnemy();
  listOfProjectiles = listOfProjectiles.filter((projectile) => {
    return projectile.timeToLive > 0;
  });
  listOfProjectiles.forEach((projectile) => {
    projectile.update();
    projectile.draw();
  });
  listOfEnemies = listOfEnemies.filter((enemy) => enemy.alive === true);
  listOfProjectiles = listOfProjectiles.filter(
    (projectile) => projectile.alive === true
  );
  colissionCheck();
  requestAnimationFrame(update);
}

update();

function colissionCheck() {
  listOfProjectiles.forEach((projectile) => {
    listOfEnemies.forEach((enemy) => {
      const currentProjectile = projectile;
      const currentEnemy = enemy;
      let projectileAABB = {
        x: currentProjectile?.x,
        y: currentProjectile?.y,
        width: Projectile.IMAGE_SIZE.x,
        height: Projectile.IMAGE_SIZE.y,
      };
      // ctx.rect(
      //   projectileAABB.x,
      //   projectileAABB.y,
      //   projectileAABB.width,
      //   projectileAABB.height
      // );
      // ctx.stroke();

      let enemyAABB = {
        x: currentEnemy?.xCord,
        y: 370,
        width: 70,
        height: 75,
      };
      // ctx.rect(enemyAABB.x, enemyAABB.y, enemyAABB.width, enemyAABB.height);
      // ctx.stroke();

      // kolla om skiten krockar!
      if (projectileAABB != null && enemyAABB != null) {
        console.log(projectileAABB);
        console.log(enemyAABB);
        if (
          projectileAABB.x < enemyAABB.x + enemyAABB.width &&
          projectileAABB.x + projectileAABB.width > enemyAABB.x &&
          projectileAABB.y < enemyAABB.y + enemyAABB.height &&
          projectileAABB.y + projectileAABB.height > enemyAABB.y
        ) {
          console.log("Collision Detected");
          currentProjectile.alive = false;
          currentEnemy.alive = false;
        }
      }
    });
  });
}
