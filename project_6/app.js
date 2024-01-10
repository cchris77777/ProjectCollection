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

c.addEventListener("pointermove", (e) => {
  console.log(e);
  ground_x = e.clientX - 300;
});

function drawCircle() {
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
