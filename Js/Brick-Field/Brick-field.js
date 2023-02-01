
import { first_level, second_level, third_level, forth_level, blockDimn, EmptQueue } from '../Brick-blocks.js';
import { paddle, drawPaddle, Movepaddle, setPaddle_pos, keyDownHandler, keyUpHandler } from '../paddleScript.js';

const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const stop = document.getElementById("stop-play");
const start = document.getElementById("start-play");
const pause = document.getElementById("pause-play");
const score = document.getElementById("score-value");
const selected_level = document.getElementById("Levels");
const game_over_alert = document.getElementById("Game-over");
const play_again_btn = document.getElementById("play-again");
const lives_remaining = document.getElementById("lives-remaining");


let lives = 3;
let hit_bricks = 0;
let blockLength = 0;
let score_value = 0;
let current_level = 1;
let speed_level = "Easy";
let continue_play = false;




let getHighestScore = localStorage.getItem("hightestScore");
let highest_score = document.getElementById("highest_score_number");
highest_score.innerHTML = getHighestScore || 0;
const Background_sound = new Audio("../../sounds/Game_Theme_Song.mp3");
const GameOver_sound = new Audio("../../sounds/Game_gameover.mp3");
const Game_Lose_Live = new Audio("../../sounds/Game_Lose_Live.mp3");
const Break_sound = new Audio("../../sounds/Break_brick_sound.mp3");
const Start_Game = new Audio("../../sounds/Start_Game.mp3");
const Warning_Live = new Audio("../../sounds/Lives_warning.mp3");


class Ball {

    static dx = 5;
    static dy = -5;
    radius = 8
    constructor(xCenter, yCenter, alpha, theta) {
        this.x = xCenter;
        this.y = yCenter;
        this.startAngel = alpha;
        this.endAngel = theta;
    }

    darw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngel, this.endAngel);
        ctx.fillStyle = "#F2F2F2";
        ctx.fill();
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 1;
        ctx.stroke();
        this.x += Ball.dx;
        this.y += Ball.dy;
    }

    remove() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};


let ball_XCenter = canvas.width / 2;
let ball_YCenter = canvas.height - 40;
const breaking_ball = new Ball(ball_XCenter, ball_YCenter, 0, (2 * Math.PI));


// Events- Handlers
start.addEventListener("click", start_game);
stop.addEventListener("click", end_game);
selected_level.addEventListener('change', choose_speed)



function start_game() {
    if (lives === 3) {
        Start_Game.play();
    }

    continue_play = true;

    // Add Events to Buttons and Arrows
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    pause.addEventListener('click', pause_game);
    play_again_btn.addEventListener('click', () => {
        new_game();
    })


    //Update UI
    start.style.display = "none";
    pause.style.display = "block";

    document.querySelector("#levels-section").style.display = "none";
    document.querySelector("#levels-selected").style.display = "block";
    document.querySelector("#levels-selected>p>#level").innerText = speed_level;

    Background_sound.volume = 0.4;
    Background_sound.play();

    drawShape();
}


// Pause game 
function pause_game() {
    start.style.display = "block";
    pause.style.display = "none";
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    continue_play = false;
    drawShape();
}


function end_game() {
    continue_play = false;
    start.style.display = "block";
    pause.style.display = "none";
    document.querySelector("#levels-section").style.display = "block";
    document.querySelector("#levels-selected").style.display = "none";

    hit_bricks = 0;
    score_value = 0;
    score.textContent = score_value;
    lives = 3;
    lives_remaining.innerText = lives;
    game_over_alert.style.display = "none";
    breaking_ball.x = ball_XCenter;
    breaking_ball.y = ball_YCenter;
    setPaddle_pos((canvas.width - paddle.width) / 2);
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    EmptQueue();
    drawShape();
}

// Restart The Game
function new_game() {
    location.reload();
}

// Store the Highest store
function setHightestScore(score) {
    if (score > getHighestScore)
        localStorage.setItem("hightestScore", score);
}


function game_over() {
    continue_play = false;
    lives_remaining.innerHTML='0';
    game_over_alert.style.display = "block";
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    document.removeEventListener("keydown", getKey, false || !pause_game());
    start.style.display="none";
    stop.style.display="none";
    pause.style.display="none";
    Background_sound.pause();
    GameOver_sound.play();
}


function choose_speed(event) {
    let level = event.target.value;
    switch (level) {
        case "hard":
            Ball.dy = -7;
            Ball.dx = 7;
            break;

        case "intermediate":
            Ball.dy = -6;
            Ball.dx = 6;
            break;

        default:
            Ball.dy = -5;
            Ball.dx = 5;
            break;
    }
    speed_level = level;
}

function upgrade_level() {
    switch (current_level) {
        case 1:
            first_level();
            break;

        case 2:
            second_level();
            break;

        case 3:
            third_level();
            break;

        case 4:
            forth_level();
            break;
    }
}



// Start Game by clickong on space.
document.addEventListener("keydown", getKey, false || !pause_game());
let start_pause = false
function getKey(e) {
    if (e.key == " " && start_pause === false) {
        start_pause = true;
        start_game();
    }
    else if (e.key == " " && start_pause === true) {
        start_pause = false;
        pause_game();
    }
    else {
        e.preventDefault();
    }
}


function drawShape() {
    breaking_ball.remove();
    upgrade_level();
    breaking_ball.darw();
    drawPaddle();
    Movepaddle();
    BreakBlocks();

    /* 
    Bouncing off the walls 
        * Bouncing off Left & Right
    */
    if (breaking_ball.x + Ball.dx > canvas.width - breaking_ball.radius || breaking_ball.x + Ball.dx < breaking_ball.radius) {
        Ball.dx = -Ball.dx;
    }

    // Bouncing off UP & Down
    if (breaking_ball.y + Ball.dy < breaking_ball.radius) {
        Ball.dy = -Ball.dy;

    }
    else if (breaking_ball.y + 17 + Ball.dy > canvas.height - breaking_ball.radius) {
        if (breaking_ball.x > paddle.x && breaking_ball.x < paddle.x + paddle.width) {
            if (breaking_ball.y = breaking_ball.y - paddle.height) {
                Ball.dy = - Ball.dy;
            }
        } else {
            Game_Lose_Live.play();
            lives--;
            lives_remaining.innerText = lives;
            setPaddle_pos((canvas.width - paddle.width) / 2);
            if (lives === 1) {
                setTimeout(() => {
                    Background_sound.pause();
                    Game_Lose_Live.pause();
                    Warning_Live.play();
                    Background_sound.play();
                }, 1000);
            }
            if (!lives) {
                game_over();
                continue_play = false;
            }
            else {
                breaking_ball.x = ball_XCenter;
                breaking_ball.y = ball_YCenter;
            }
        }
    }
    if (continue_play) {
        requestAnimationFrame(drawShape);
    }

}


//Breaking test
function BreakBlocks() {
    for (let i = 0; i < blockDimn.length; i++) {
        for (let j = 0; j < blockDimn[i].length; j++) {

            //Get block length
            blockLength = blockDimn[i].length * blockDimn.length;

            if (
                breaking_ball.x + breaking_ball.radius > blockDimn[i][j].x &&
                breaking_ball.x - breaking_ball.radius < blockDimn[i][j].x + 150 &&
                breaking_ball.y + breaking_ball.radius > blockDimn[i][j].y &&
                breaking_ball.y - breaking_ball.radius < blockDimn[i][j].y + 50
            ) {
                //Changing the block health
                if (blockDimn[i][j].health === 2) {
                    blockDimn[i][j].health = 1;
                    //Check the collision
                    if (breaking_ball.x < blockDimn[i][j].x || breaking_ball.x > blockDimn[i][j].x + 150) {
                        Ball.dx *= -1;
                    } else
                        Ball.dy *= -1;

                } else if (blockDimn[i][j].health === 1) {
                    blockDimn[i][j].health = 0;
                    score_value++;
                    score.textContent = score_value;
                    setHightestScore(score_value);
                    hit_bricks++;
                    //Check the collision
                    if (breaking_ball.x < blockDimn[i][j].x || breaking_ball.x > blockDimn[i][j].x + 150) {
                        Ball.dx *= -1;
                    } else
                        Ball.dy *= -1;
                }

                Break_sound.play();
            }
        }
        if (blockLength === hit_bricks) {
            i = 0;
            if (current_level !== 4) {
                EmptQueue();
                current_level++;
            }
            hit_bricks = 0;
        }
    }
}
