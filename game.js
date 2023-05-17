const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];


window.addEventListener("load", setCanvasSize); /*Esto ayuda para decirle al algoritmo que apenas termine de cargar el html, cargue ensequida este documento. */
window.addEventListener("resize", setCanvasSize);  /*"resize" esta indicación le dice al algoritmo que cuando cambie de tamaño la pantalla (resize) recargue nuevamente el juego */


function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)
    
    elementsSize = canvasSize / 10;

    startGame();
}


function startGame(){
/*para hacer el canvas responsive con buenas practicas podemos hacer lo siguiente: (inicio) */

console.log({ canvasSize, elementsSize });

game.font = elementsSize + 'px Verdana';
game.textAlign = 'end';

const map = maps[level];

    if(!map) {
        gameWind();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log({playerPosition});
          }
        } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
      } else if (col =="X") {
        enemyPositions.push({
            x: posX,
            y: posY,
        });
      }
      
      game.fillText(emoji, posX, posY);
    });
  });

movePlayer();

/*si yo uso el atributo .split lo que hara es partir la oración por fracies o silavas. ejemplo: si pongo en la consola //"hola mundo como estas".split(" ")// lo que hara es partirme la frace en palabras hola/mundo/como/estas/, pero si lo hago sin espacio en "" lo que hara es partirlo por cilavas // "hola mundo".split("")   -->> h.o.l.a. .m.u.n.d.o  todos en forma de arreglos*/

/*el .trim nos ayuda a limpiar los espacios en blancos de la cadena de texto a la que se le utilizo .split, para limpiar los arrays */


/*
for (let row = 1; row<=10; row++){
    for (let col = 1; col <= 10; col++) {
        game.fillText(emojis[mapRowsCols[row - 1][col - 1]] , elementsSize * col, elementsSize  * row);
    }
}*/


//canvas.setAttribute("width", window.innerWidth * 0.75); con este atributo, lo que hacemos es darle al width del vancas segun las propiedades del windows 0.75 para quitarle el 0.25 y no ocupe la totalidad de la pantalla
//canvas.setAttribute("height", window.innerHeight * 0.5) con este atributo, lo que hacemos es darle al height del vancas segun las propiedades del windows 0.5 para quitarle el 0.25 y no ocupe la totalidad de la pantalla

//window.innerHeight // con esto podemos sacar la altura de la pantalla por las propiedades de windows y utilizarlos en el calculo del responsive del canvas
//window.innerwidth // con esto podemos sacar el ancho de la pantalla por las propiedades de windows y utilizarlos en el calculo del responsive del canvas

/*para hacer el canvas responsive con buenas practicas podemos hacer lo siguiente: (fin) */

    //game.fillRect(0,50,100,100); /*game.fillReact es un metodo de la API de dibujo en canvas en html5 para dibujar un elemento dentro del canvas.(x, y, width, height) son los parametros dentro del objeto dentro del canvas. (posición en "x", posición en "y", largo del objeto, alto del objeto);  */
    //game.clearRect(50,50,50,50);
    //game.clearRect();
    //game.clearRect(0,0,10,10);

    //game.font="25px verdana";
    //game.fillStyle = "purple";
    //game.textAling = "start";
    //game.fillText("platzi",25,25);//game.fillText(Texto,100,100); /*game.fillText es un metodo de la API de dibujo en canvas en html5 para insertar textos dentro del canvas.(x, y, width, height) son los parametros dentro del objeto dentro del canvas;  */
}



function movePlayer() {

    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    
    const giftCollision = giftCollisionX && giftCollisionY;


    if(giftCollision){
        console.log("felicidades, ganaste")
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
      });
      
      if (enemyCollision) {
        console.log('deteccion de colición');
        levelFail();
      }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  }

  function levelWin() {
    console.log("subieste de nivle")
    level++;
    startGame();
  }

  function levelFail() {
    console.log("cocaste contra un enemigo")
    lives--;

    if(lives <= 0) { 
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
  }

  function gameWind(){
    console.log("Ganaste el juego")
  }

  function showLives(){
    const heartsArray = Array(lives).fill(emojis["HEART"]);


    spanLives.innerHTML="";
    heartsArray.forEach(heart => spanLives.append(heart));
    //spanLives.innerHTML = heartsArray;   /*esta fue mi solución */
  }

/*para escuchar los eventos de los botones del teclado */
window.addEventListener("keydown", moveBykeys);

btnUp.addEventListener ("click", moveUP);
btnLeft.addEventListener ("click", moveLeft);
btnRight.addEventListener ("click", moveRight);
btnDown.addEventListener ("click", moveDown);

function moveBykeys (event) {

    if(event.key == "ArrowUp") moveUP(); 
        else if (event.key == "ArrowLeft") moveLeft(); 
        else if (event.key == "ArrowRight") moveRight();  
        else if (event.key == "ArrowDown") moveDown();
}

function moveUP(){

    if((playerPosition.y - elementsSize) < 0){
        console.log("OUT")
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }

}
function moveLeft(){
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log("OUT")
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight(){

    if((playerPosition.x + elementsSize) > (canvasSize + 40)){
        console.log("OUT");
    }else{
        playerPosition.x += elementsSize;
        startGame();
        
    }
}
function moveDown(){
    if((playerPosition.y + elementsSize) > canvasSize){
        console.log("OUT");
    }else{
    playerPosition.y += elementsSize;
    startGame();
    }
}
