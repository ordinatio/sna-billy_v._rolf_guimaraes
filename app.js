var myGamePiece;
function startGame() {
    myGameArea.start();
    myGamePiece = new Component(30, 30, "red", 10, 120);
    background = new ComponentImage("images/grassbackground.png", 0, 100, window.innerWidth, 400)
}



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertAdjacentElement("beforeend", this.canvas)
    }
}

function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function ComponentImage(imageSrc, x, y, width, height){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.src = imageSrc
    ctx = myGameArea.context;

    let img = new Image()
    img.src = this.src
    console.log(img, ctx)
    img.addEventListener('load', function() {
        ctx.drawImage(img, x, y, width, height)
       }, false);
}

startGame()