const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const paddleHeight = 15;
const paddleWidth = 150;

const paddle={
    height: paddleHeight,
    width: paddleWidth,
    x: (canvas.width - paddleWidth) / 2,
    y: canvas.height - paddleHeight - 10,
    fillColor:"#014D9A",
    strokeColor: "#fff"
};

let rightPressed=false;
let leftPressed=false;
 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.fillColor;
    ctx.strokeStyle= paddle.strokeColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
//Keyboard Events 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//Mouse Events 
document.addEventListener("mousemove", leftMouseDown, false);

// Move paddle by Keyboard 
function keyDownHandler(e) {
    //If the user pressed on the Left arrow key
    if(e.keyCode == 37){
        leftPressed = true;
    }else if(e.keyCode == 39){
    //If the user pressed on the Right arrow key
        rightPressed = true;
    }
    else
    {
        e.preventDefault(); 
    }
}

    function keyUpHandler(e) {
    //If the user releases the Left arrow key
    if(e.keyCode == 37){
        leftPressed = false;
    }else if(e.keyCode == 39){
        //If the user releases the Right arrow key
        rightPressed = false;
    }
}
function setPaddle_pos(x)
{
    paddle.x=x;
}
// Move paddle by Mouse 
function leftMouseDown(e){ 
    setPaddle_pos(e.clientX - 75);
}

//Movement of paddle inside canvas
function Movepaddle() {
    drawPaddle();
    //If user pressed on Right arrow key move right
    if(rightPressed) {
        paddle.x += 10;
        if (paddle.x + paddle.width > canvas.width){
            paddle.x = canvas.width - paddle.width;
        }
    }
    else if(leftPressed) {
        //If user pressed on Left arrow key move left
        paddle.x -= 10;
        if (paddle.x < 0){
            paddle.x = 0;
        }
    }
}

export{paddle, drawPaddle,Movepaddle, setPaddle_pos,keyUpHandler,keyDownHandler} ;