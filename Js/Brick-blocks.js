
//Start Global variables
const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");
//End Global variables

class Brick{
    width = 150;
    height = 50;
    padding = 0;
    setTop = 100;
    setLeft = 100;
    color;
    Stcolor;
    constructor(color, Stcolor){
        this.color = color
        this.Stcolor = Stcolor;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.setLeft, this.setTop, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.Stcolor;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        
    }
    drawBreak(){

        ctx.beginPath();
        ctx.rect(this.setLeft, this.setTop - 7, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.Stcolor;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

    }
    
};


//The game blocks Levels

var blockDimn = [];
function EmptQueue (){blockDimn = []}
//First level
function first_level(){
    let rows = 4;
    let columns = 10;
    if(blockDimn == 0){
        for (var c = 0; c < rows; c++) {
            blockDimn[c] = [];
            for (var r = 0; r < columns; r++) {
                blockDimn[c][r] = { x: 0, y: 0, health: 2 };
            }
        }
    }
    const Brick_block = new Brick("#C74C0C", "black");
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            Brick_block.setLeft = 225;
            Brick_block.setTop = 100;
            if (blockDimn[i][j].health === 2) { 
                Brick_block.setLeft = (j * (Brick_block.width + Brick_block.padding)) + Brick_block.setLeft;
                Brick_block.setTop = (i * (Brick_block.height + Brick_block.padding)) + Brick_block.setTop;
                blockDimn[i][j].x = Brick_block.setLeft;
                blockDimn[i][j].y = Brick_block.setTop;
                Brick_block.draw();

            }else if(blockDimn[i][j].health === 1){   
                const Brick2 = new Brick("#FCBDB0", "black");
                Brick2.setLeft = 225;
                Brick2.setTop = 100;
                Brick2.setLeft = (j * (Brick2.width + Brick2.padding)) + Brick2.setLeft;
                Brick2.setTop = (i * (Brick2.height + Brick2.padding)) + Brick2.setTop;
                blockDimn[i][j].x = Brick2.setLeft;
                blockDimn[i][j].y = Brick2.setTop;
                Brick2.drawBreak();
            }
        }
    }
}


//Second level
function second_level(){
    const Brick_block = new Brick("#C74C0C", "black");
    let rows = 4;
    let columns = 10;
    let R_top = 100;
    let R_left = 100;
    if(blockDimn == 0){
        for (var c = 0; c < rows; c++) {
            blockDimn[c] = [];
            for (var r = 0; r < columns; r++) {
                blockDimn[c][r] = { x: 0, y: 0, health: 2 };
            }
        }
    }
    
    for(let i = 0; i < rows; i++){
        R_left += 30;
        for(let j = 0; j < columns; j++){
            Brick_block.setLeft = R_left;
            Brick_block.setTop = R_top;
            if (blockDimn[i][j].health === 2) { 
                Brick_block.setLeft = (j * (Brick_block.width + Brick_block.padding)) + Brick_block.setLeft;
                Brick_block.setTop = (i * (Brick_block.height + Brick_block.padding)) + Brick_block.setTop;
                blockDimn[i][j].x = Brick_block.setLeft;
                blockDimn[i][j].y = Brick_block.setTop;
                Brick_block.draw();

            }else if(blockDimn[i][j].health === 1){   
                const Brick2 = new Brick("#FCBDB0", "black");
                Brick2.setLeft = R_left;
                Brick2.setTop = R_top;
                Brick2.setLeft = (j * (Brick2.width + Brick2.padding)) + Brick2.setLeft;
                Brick2.setTop = (i * (Brick2.height + Brick2.padding)) + Brick2.setTop;
                blockDimn[i][j].x = Brick2.setLeft;
                blockDimn[i][j].y = Brick2.setTop;
                Brick2.drawBreak();
            }
        }
    }
}


//Third level
function third_level(){
    let rows = 4;
    let columns = 11;
    blockDimn = [];
    if(blockDimn == 0){
        for (var c = 0; c < rows; c++) {
            blockDimn[c] = [];
            for (var r = 0; r < columns; r++) {
                blockDimn[c][r] = { x: 0, y: 0, health: 2 };
            }
        }
    }
    const Brick_block = new Brick("#C74C0C", "black");
    let R_top = 50;
    let R_left = 170;
    for(let i = 0; i < rows; i++){
        R_top += 30;
        for(let j = 0; j < columns; j++){
            if( j === 5 && i !== rows-1){
                R_left = 400;
            }else{
                R_left = 170;
            }
            Brick_block.setLeft = R_left;
            Brick_block.setTop = R_top;
            if (blockDimn[i][j].health === 2) { 
                if(j % 2 === 0){
                    Brick_block.color = "#ccc";
                }else{
                    Brick_block.color = "#C74C0C";
                }
            
                Brick_block.setLeft = (j * (Brick_block.width + Brick_block.padding)) + Brick_block.setLeft;
                Brick_block.setTop = (i * (Brick_block.height + Brick_block.padding)) + Brick_block.setTop;
                blockDimn[i][j].x = Brick_block.setLeft;
                blockDimn[i][j].y = Brick_block.setTop;
                Brick_block.draw();
                

            }else if(blockDimn[i][j].health === 1){   
                const Brick2 = new Brick("#FCBDB0", "black");
                Brick2.setLeft = R_left;
                Brick2.setTop = R_top;
                Brick2.setLeft = (j * (Brick2.width + Brick2.padding)) + Brick2.setLeft;
                Brick2.setTop = (i * (Brick2.height + Brick2.padding)) + Brick2.setTop;
                blockDimn[i][j].x = Brick2.setLeft;
                blockDimn[i][j].y = Brick2.setTop;
                Brick2.drawBreak();
            }
        }
    }
    
}

//Forth level
function forth_level(){
    let rows = 6;
    let columns = 6;
    let R_top = 500;
    let R_left = 150;
    blockDimn = [];
    if(blockDimn == 0){
        for (var c = 0; c < rows; c++) {
            blockDimn[c] = [];
            for (var r = 0; r < columns; r++) {
                blockDimn[c][r] = { x: 0, y: 0, health: 2 };
            }
        }
    }
    const Brick_block = new Brick("#C74C0C", "black");
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if( j > 2 && i !==0 && i !== rows -1){
                R_left = 1000;
            }else if (i ===0 || i === rows -1){
                R_left = 575;
                Brick_block.color = "#C74C0C"
                
                
            }else{
                R_left = 150;
                Brick_block.color = "#fff"
            }
            if( i > 2){
                R_top = 200;
                Brick_block.color = "#C74C0C"
                
            }else {
                R_top = 50;
                Brick_block.color = "#fff"
            }
            Brick_block.setLeft = R_left;
            Brick_block.setTop = R_top;
            if (blockDimn[i][j].health === 2) { 
                Brick_block.setLeft = (j * (Brick_block.width + Brick_block.padding)) + Brick_block.setLeft;
                Brick_block.setTop = (i * (Brick_block.height + Brick_block.padding)) + Brick_block.setTop;
                blockDimn[i][j].x = Brick_block.setLeft;
                blockDimn[i][j].y = Brick_block.setTop;
                Brick_block.draw();

            }else if(blockDimn[i][j].health === 1){   
                const Brick2 = new Brick("#FCBDB0");
                Brick2.setLeft = R_left;
                Brick2.setTop = R_top;
                Brick2.setLeft = (j * (Brick2.width + Brick2.padding)) + Brick2.setLeft;
                Brick2.setTop = (i * (Brick2.height + Brick2.padding)) + Brick2.setTop;
                blockDimn[i][j].x = Brick2.setLeft;
                blockDimn[i][j].y = Brick2.setTop;
                Brick2.drawBreak();
            }
        }
    }
}
export {forth_level,third_level, second_level, first_level, EmptQueue, blockDimn};