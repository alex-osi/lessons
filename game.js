/**
 * Created by osipchuk on 30.05.2016.
 */
window.onload = init;
var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var player;
var enemy;

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
    ctxPl = map.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

  //  pl.width = gameWidth;
   // pl.height = gameHeight;

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    player = new Player();
    enemy = new Enemy();
    drawBg();
    draw();

    startLoop();
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
}

function draw()
{
    player.draw();
    enemy.draw();
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
}

function Enemy()
{
    this.srcX = 0;
    this.srcY = 95;
    this.drawX = 500;
    this.drawY = 50;
    this.width = 190;
    this.height = 90;
    this.speed = 8;
}

Enemy.prototype.draw = function ()
{
    ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.draw = function ()
{
    clearCtxPlayer();
    ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}


Player.prototype.update = function ()
{
    this.drawX += 3;
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

function drawBg()
{
    ctxMap.drawImage(background, 0, 0, 600, 357,
        0, 0, gameWidth, gameHeight);
}

