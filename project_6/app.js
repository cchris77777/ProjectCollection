const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];
let brickNum = 20;
let count = 0;

//隨機生成範圍內的整數
function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.visible = true;
    brickArray.push(this);
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(ballX, ballY) {
    return (
      ballX + radius >= this.x &&
      ballX - radius <= this.x + this.width &&
      ballY + radius >= this.y &&
      ballY - radius <= this.y + this.height
    );
  }
}

//製作所有的brick
for (let i = 0; i < brickNum; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

c.addEventListener("pointermove", (e) => {
  console.log(e);
  ground_x = e.clientX - 300;
});

function drawCircle() {
  //判斷球是否打到磚塊
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
      count++;
      brick.visible = false;
      //改變x, y方向速度，並且將磚塊從array移除
      //從下方或上方撞擊
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y)
        ySpeed *= -1;
      //從右方或左方撞擊
      if (circle_x >= brick.x + brick.width || circle_x <= brick.x)
        xSpeed *= -1;
      //刪除磚塊

      if (count == brickNum) {
        alert("Game Over ~");
        clearInterval(game);
      }
    }
  });

  //判斷及處理碰到ground
  if (
    circle_x + radius >= ground_x &&
    circle_x - radius <= ground_x + 200 &&
    circle_y + radius >= ground_y &&
    circle_y - radius <= ground_y
  ) {
    if (ySpeed > 0) circle_y -= 41;
    else circle_y += 41;
    ySpeed *= -1;
  }
  //判斷及處理超出邊界
  if (circle_x + radius >= canvasWidth) xSpeed *= -1;
  if (circle_x - radius <= 0) xSpeed *= -1;
  if (circle_y + radius >= canvasHeight) ySpeed *= -1;
  if (circle_y - radius <= 0) ySpeed *= -1;

  //更動球的位置
  circle_x += xSpeed;
  circle_y += ySpeed;

  //每次draw前清空畫布(畫黑色背景)
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //draw all bricks
  brickArray.forEach((brick) => {
    if (brick.visible) brick.drawBrick();
  });

  //draw ground
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

  //draw ball
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
