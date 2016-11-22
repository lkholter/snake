console.log('JS <3 HTML')


$(document).ready(function(){

var text = $('p1').text();

var textLength = text.length;
var timeOut;
var character = 0;


(function write() {
    timeOut = setTimeout(function() {
        character++;
        var type = text.substring(0, character);
        $('p1').text(type);
        write();

        if (character == textLength) {
            clearTimeout(timeOut);
        }

    }, 200);
}());

// $('.start').bind("click",function(){
//       setInterval(snakeMove, 100);
//     });


  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  var cS = 20; //cellSize
  var direction = 'down';
  var snakeArray;
  var food;
  var score = 0;



var gameLoop = setInterval(snakeMove, 100);


function checkCollision(array) {
  for (var i = 1; i < array.length; i++) {
    if (array[i].x === array[0].x && array[i].y === array[0].y) {
      console.log("collision");
      gameOver();
      return true;
    };
  };
};

function gameOver() {
  clearInterval(gameLoop);
  alert("Ouch! Refresh the page to try again!")
};

//this is the canvas
  ctx.fillStyle = '#36454F';
	ctx.fillRect(0, 0, w, h);

//createSnake by making an array and then pushing the elements into it.
//The elements are the cells that make up the snake body. Create the snake to start
//at 0 on the y axis, body across the x-axis.
createSnake();
function createSnake() {
  var length = 5;
  snakeArray = [];
    for (var i = length; i>=0; i--) {
    snakeArray.push({x: i, y: 0});
    }
    console.log(snakeArray);
}
//Generate food by calling for a random cell on x & y
createFood();
function createFood() {
    food = {
    x: Math.floor(Math.random() * (w-cS)/cS),
    y: Math.floor(Math.random() * (h-cS)/cS)
  }
}

//use canvas to "paint" background, snake, and mouse. set direction for snake,
//when snake touches food, snake grows and food reappears.

function snakeMove() {
  $('.score').text('score: ' + score);
  //all my paint strokes were staying on the screen, making an endless snake-trail.
  //Turns out you have to constantly repaint the canvas background.
    ctx.fillStyle = '#36454F';
    ctx.fillRect(0, 0, w, h);

//put the snakeArray "head" position into x & y variables
var snakeX = snakeArray[0].x;
var snakeY = snakeArray[0].y;

//make the snake move! snakeX moves right and left, snakeY moves up and down.
if (direction == 'right') {
      snakeX++;
    }  else if (direction == 'left') {
      snakeX--;
    }  else if (direction == 'up') {
      snakeY--;
    } else if(direction == 'down') {
      snakeY++; }
//console.log(snakeX, snakeY);

if(snakeX === -1 || snakeX === w/cS || snakeY === -1 || snakeY === h/cS) {
  gameOver();
}

checkCollision(snakeArray);

//if mouse generates where snake already exists, create new food
if (snakeArray.x === food.x && snakeArray.y === food.y) {
  createFood();
}

//if snake head and food are in the same place (snake eats food) - create new food and add a cell to the snake tail
if(snakeX == food.x && snakeY == food.y) {
    var tail = {
      x: snakeX,
      y: snakeY
    };
    score+=10;
    createFood();
//otherwise, the snake just keeps moving via pop and unshift
  } else {
      tail = snakeArray.pop()
      tail.x = snakeX;
      tail.y = snakeY;
    }
     snakeArray.unshift(tail);

 for (var i = 0; i < snakeArray.length; i++) {
    var cell = snakeArray[i];
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(cell.x*cS, cell.y*cS, cS, cS);
    ctx.strokeStyle = 'green';
    ctx.strokeRect(cell.x*cS, cell.y*cS, cS, cS);
  }

  function mouse(x, y) {
    ctx.fillStyle = '#8C8C8C';
    ctx.fillRect(x*cS, y*cS, cS, cS);
    //ctx.strokeStyle = 'pink';
    //ctx.strokeRect(x*cS, y*cS, cS, cS);

  }
  mouse(food.x, food.y);
}

$(document).keydown(function(e){
var key = e.which;
if (key == '37' && direction != 'right') {
  direction = 'left';
} else if (key == '38' && direction != 'down') {
  direction = 'up';
} else if (key == '39' && direction != 'left') {
  direction = 'right';
} else if (key == '40' && direction != 'up') {
  direction = 'down';
  }
});

});
