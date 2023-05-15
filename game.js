const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize); /*Esto ayuda para decirle al algoritmo que apenas termine de cargar el html, cargue ensequida este documento. */
window.addEventListener("resize", setCanvasSize);  /*"resize" esta indicación le dice al algoritmo que cuando cambie de tamaño la pantalla (resize) recargue nuevamente el juego */



function startGame(){
/*para hacer el canvas responsive con buenas practicas podemos hacer lo siguiente: (inicio) */

console.log({canvasSize, elementsSize});

game.font = elementsSize  + "px verdana";
game.textAlign ="end";

for(let i = 1; i<=10; i++){

    game.fillText(emojis["X"], elementsSize * i, elementsSize);
}


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

function setCanvasSize () {
    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.4;
    } else {
        canvasSize = window.innerWidth * 0.4;
    }
    
    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)
    
    elementsSize = canvasSize / 10;

    startGame();
}