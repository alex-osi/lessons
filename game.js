/**
 * Created by osipchuk on 30.05.2016.
 */
window.onload = init;
var map;
var ctxMap;

var pl;
var ctxPl;

var enemyCvs;
var ctxEnemy;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var player;
var enemies = [];

var isPlaying;

var reqwestAnFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame;


function init()
{
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    enemyCvs = document.getElementById("enemy");
    ctxEnemy = enemyCvs.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

    pl.width = gameWidth;
    pl.height = gameHeight;

    enemyCvs.width = gameWidth;
    enemyCvs.height = gameHeight;

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    player = new Player();
    //enemy = new Enemy();
    drawBg();
    draw();

    startLoop();

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
}

function spawnEnemy(count)
{
    for(var i = 0; i < count; i++)
    {
        enemies[i] = new Enemy();
    }
}

function loop()
{
    if (isPlaying)
    {
        draw();
        update();
        reqwestAnFrame(loop);
    }
}

function startLoop()
{
    isPlaying = true;
    loop();
}

function stopLoop()
{
    isPlaying = false;

}

function update()
{
    player.update();

    clearCtxEnemy();
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].draw();
    }

}

function draw()
{
    player.draw();
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].update();
    }

}

function Player()
{
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 190;
    this.height = 90;
    this.speed = 5;
    //for key
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
}

function Enemy()
{
    this.srcX = 0;
    this.srcY = 95;
    this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.width = 190;
    this.height = 90;
    this.speed = 8;
}

Enemy.prototype.draw = function ()
{

    ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.update = function ()
{
    this.drawX -= 7;
    if(this.drawX < 0)
        {
            this.drawX = Math.floor(Math.random() * 10) + gameWidth;
            this.drawY = Math.floor(Math.random() * gameHeight);
        }
}



Player.prototype.draw = function ()
{
    clearCtxPlayer();
    ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}


Player.prototype.update = function ()
{
    if(this.drawX < 0) this.drawX = 0;
    if(this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
    if(this.drawY < 0) this.drawY = 0;
    if(this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;

    this.chooseDir();
}

Player.prototype.chooseDir = function ()
{
    if (this.isUp)
        this.drawY -= this.speed;
    if (this.isDown)
        this.drawY += this.speed;
    if (this.isRight)
        this.drawX += this.speed;
    if (this.isLeft)
        this.drawX -= this.speed;
}

function checkKeyDown (e)
{
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    if (keyChar == "W")
    {
        player.isUp = true;
        e.preventDefault();
    }
    if (keyChar == "S")
    {
        player.isDown = true;
        e.preventDefault();
    }
    if (keyChar == "D")
    {
        player.isRight = true;
        e.preventDefault();
    }
    if (keyChar == "A")
    {
        player.isLeft = true;
        e.preventDefault();
    }
}

function checkKeyUp(e)
{
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    if (keyChar == "W")
    {
        player.isUp = false;
        e.preventDefault();
    }
    if (keyChar == "S")
    {
        player.isDown = false;
        e.preventDefault();
    }
    if (keyChar == "D")
    {
        player.isRight = false;
        e.preventDefault();
    }
    if (keyChar == "A")
    {
        player.isLeft = false;
        e.preventDefault();
    }
}

function drawRect()
{
    ctxMap.fillStyle = "#333";
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect()
{
    ctxMap.clearRect(0 ,0, 800, 500);
}

function clearCtxPlayer()
{
    ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy()
{
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

function drawBg()
{
    ctxMap.drawImage(background, 0, 0, 600, 357,
        0, 0, gameWidth, gameHeight);
}

