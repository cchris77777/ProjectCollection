const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //getContext method會回傳一個canvas的drawing context(畫圖環境, 可以用來在canvas內畫圖)
const unit = 20;
const row = canvas.height / unit; // 320/unit
const column = canvas.width / unit; // 320/unit

let snake = []; //array中每個元素都是一個物件，物件的功能是儲存身體的x, y座標
function createSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}
//製作果實
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  newLocation() {
    let overlapping = false;
    let newX;
    let newY;

    function checkOverlap(newX, newY) {
      for (let i = 0; i < snake.length; i++) {
        if (newX == snake[i].x && newY == snake[i].Y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      newX = Math.floor(Math.random() * column) * unit;
      newY = Math.floor(Math.random() * row) * unit;
      checkOverlap(newX, newY);
    } while (overlapping);
    this.x = newX;
    this.y = newY;
  }
}

//初始設定
createSnake();
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let d = "Right"; //direction
let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore2").innerHTML = "Game Score : " + score;
document.getElementById("myScore").innerHTML =
  "Highest Score : " + highestScore;

function changeDirection(e) {
  if (e.key == "ArrowLeft" && d != "Right") d = "Left";
  else if (e.key == "ArrowUp" && d != "Down") d = "Up";
  else if (e.key == "ArrowRight" && d != "Left") d = "Right";
  else if (e.key == "ArrowDown" && d != "Up") d = "Down";

  //如果按的太快，可能在畫下一幀出來前就結束了，所以每次按完按鍵及畫出下一幀前，不接受任何keydown事件
  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //每次畫圖前，確認蛇是否咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      window.clearInterval(myGame);
      window.alert("Game Over!");
      return;
    }
  }
  //每次draw之前清空畫布
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //draw Fruit
  myFruit.drawFruit();
  //draw snake
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      //snake head
      ctx.fillStyle = "lightgreen";
    } else {
      //snake body
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white"; //蛇每節身體的外框

    //判斷超出邊界及處理
    if (snake[i].x >= canvas.width) snake[i].x = 0;
    if (snake[i].x < 0) snake[i].x = canvas.width - unit;
    if (snake[i].y >= canvas.height) snake[i].y = 0;
    if (snake[i].y < 0) snake[i].y = canvas.height - unit;

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit); //arguments = x, y, width, height
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); //arguments = x, y, width, height
  }

  //以目前d變數來決定蛇下一幀要放在哪個座標
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Left") snakeX -= unit;
  else if (d == "Up") snakeY -= unit;
  else if (d == "Right") snakeX += unit;
  else if (d == "Down") snakeY += unit;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //確認是否有吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    //重新給定果實一個新位置
    myFruit.newLocation();
    //更新分數
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML =
      "Highest Score : " + highestScore;
    document.getElementById("myScore2").innerHTML = "Game Score : " + score;
  } else {
    snake.pop();
  }
  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = window.setInterval(draw, 100); //每0.1秒執行一次draw()

function loadHighestScore() {
  if (localStorage.getItem("HighestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("HighestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("HighestScore", score);
    highestScore = score;
  }
}
