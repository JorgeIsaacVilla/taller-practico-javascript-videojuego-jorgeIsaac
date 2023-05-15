const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame); /*Esto ayuda para decirle al algoritmo que apenas termine de cargar el html, cargue ensequida este documento. */
function startGame(){
    //game.fillRect(0,50,100,100); /*game.fillReact es un metodo de la API de dibujo en canvas en html5 para dibujar un elemento dentro del canvas.(x, y, width, height) son los parametros dentro del objeto dentro del canvas. (posición en "x", posición en "y", largo del objeto, alto del objeto);  */
    //game.clearRect(50,50,50,50);
    //game.clearRect();
    //game.clearRect(0,0,10,10);

    game.font="25px verdana";
    game.fillStyle = "purple";
    game.textAling = "start";
    game.fillText("platzi",25,25);//game.fillText(Texto,100,100); /*game.fillText es un metodo de la API de dibujo en canvas en html5 para insertar textos dentro del canvas.(x, y, width, height) son los parametros dentro del objeto dentro del canvas;  */
}