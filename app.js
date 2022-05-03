var myGamePiece;
var playerStats = {
  hp: 5,
  attackSpeed: 1,
  level: 10,
};

function startGame() {
  myGameArea.start();
  myGameArea.background()
  generateEnemies()
}

function generateEnemies(){
    let listOfEnemies = []
    let i = 0
    while(i < playerStats.level){
    listOfEnemies.push(generateEnemy())
    i++
}
listOfEnemies.forEach(object => new ComponentImage(object.image, 1000, 300, 70, 75))
console.log(listOfEnemies)
}

function generateEnemy(){
    let enemy = new Object();
enemy.image = `images/enemy_${Math.floor(Math.random() * 10)}.png`;
enemy.speed = 1;
enemy.hp = Math.floor(Math.random() * 10) + 1;
enemy.attack = 1; 
return enemy
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1280;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertAdjacentElement("beforeend", this.canvas);
  },
  background: function(){
    new Component(window.innerWidth, window.innerHeight, "#87CEEB", 0, 0)
    background = new ComponentImage(
        "images/grassbackground.png",
        0,
        100,
        window.innerWidth,
        400
      );
      ComponentText(`Hp:${playerStats.hp}| Attack Speed:${playerStats.attackSpeed}| Level:${playerStats.level    }`, "30px", 10, 50, "black")
      castle = new ComponentImage("images/castel.canon.png",-55,100,340, 375)
  }
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

  let img = new Image();
  img.src = this.src;
  console.log(img, ctx);
  img.addEventListener(
    "load",
    function () {
      ctx.drawImage(img, x, y, width, height);
    },
    false
  );
}

function ComponentText(text, size, x, y, color) {
  this.text = text;
  this.size = size;
  this.font = "Helvetica";
  this.x = x;
  this.y = y;
  this.color = color
  ctx.fillStyle = color

  ctx.font = `${this.size} ${this.font}`;
  ctx.fillText(this.text, this.x, this.y);
}
startGame();
