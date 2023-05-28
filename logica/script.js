var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var visualPoints = document.getElementById("valor");
var points = 0;  





var snake = {
  x: 160,
  y: 160,
  
  // velocidad de la serpiente
  dx: grid,
  dy: 0,
  
  // keep track of all grids the snake body occupies
  cells: [],
  
  // largo de la serpiente 
  maxCells: 1
};

var apple = {
  x: 320,
  y: 320
};  


function actualizarPuntos(){
  visualPoints.textContent = points;
}

function incrementarPuntos(){
  points+=10;
}

function resetearPuntos(){
  points = 0;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {

  requestAnimationFrame(loop);
  actualizarPuntos();

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  
  // velocidad
  snake.x += snake.dx;
  snake.y += snake.dy;

  // choque con limites
  if (snake.x < 0) {
    reseteo();
    alert("llego al limite")
    //snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
    reseteo();
    alert("llego al limite") //FUNCION QUE RESETEE EL JUEGOO 
}
  
  // choque con limites 
  if (snake.y <= -1) {
    reseteo();
    alert("llego al limite")
  }
  else if (snake.y >= canvas.height) {
    snake.x = 0;
    reseteo();
    alert("llego al limite")
  }

  // 
  snake.cells.unshift({x: snake.x, y: snake.y});

  // elimina celdas
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // comida
  context.fillStyle = 'blue';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // serpiente
  context.fillStyle = 'black';
  snake.cells.forEach(function(cell, index) {
    
    
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // serpiente come
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      incrementarPuntos();
      apple.x = getRandomInt(0,25) * grid;
      apple.y = getRandomInt(0, 49) * grid;
    }

    //choque 
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // reseteo
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        resetearPuntos();
        apple.x = getRandomInt(0,25) * grid;
        apple.y = getRandomInt(0,49) * grid;
        alert("SE COMIÓ A SI MISMA");
      }
    }
  });
}

function reseteo(){
    //clearScreen();
    context.clearRect(0,0,canvas.width,canvas.height);
    snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        resetearPuntos();

}

// lectura de flechas 
document.addEventListener('keydown', function(e) {
  
  
  // izquierda
  if ((e.key === "a" || e.key === "A") && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // arriba
  else if ((e.key === "w" || e.key === "W")  && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // derecha
  else if ((e.key === "d" || e.key === "D") && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // abajo
  else if ((e.key === "s" || e.key === "S")  && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// inicio
requestAnimationFrame(loop);
