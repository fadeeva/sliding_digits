// Grid(top, left):
/*
|    (0, 34)    (0, 137)    (0, 240)    (0, 343)
|   (107, 34)  (107, 137)  (107, 240)  (107, 343)
|   (214, 34)  (214, 137)  (214, 240)  (214, 343)
|   (321, 34)  (321, 137)  (321, 240)  (321, 343)
*/

const RIGHT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
const GRID = {
    x : [0, 107, 214, 321],
    y : [34, 137, 240, 343]
}

const BOARD = document.getElementById("board");


$(document).ready(function(){
    
    orderBoard();
    writeInTimeRecords();
    
    $("#stopwatch_container").delegate('#button', 'click', function(){
        
        showWinWindow(false);
        
        if($(this).hasClass('start_button')) {
            newGame();
            $(this).removeClass('start_button').addClass('stop_button');
        }else {
            stopWatch();
            orderBoard();
            $(this).removeClass('stop_button').addClass('start_button');
        }
    });
       
    $("#board").delegate('.button', 'click', function(){
        let digitButton = $(this);
        let nullButton = $(".null");
        let digitButtonId = digitButton.get(0).id;
        let nullButtonId = nullButton.get(0).id;
        
        let x = digitButton.get(0).id.slice(1, 2);
        let y = digitButton.get(0).id.slice(4, 5);
        let xNull = nullButton.get(0).id.slice(1, 2);
        let yNull = nullButton.get(0).id.slice(4, 5);
        
        let nullButtonCoordanates = getCoordinates(nullButtonId);
        let digitButtonCoordinates = getCoordinates(digitButtonId);
        
        if( moveIsLegal(x, y, xNull, yNull) ) {
            digitButton.animate({"top": nullButtonCoordanates.top,
                                 "left": nullButtonCoordanates.left});
            nullButton.animate({"top": digitButtonCoordinates.top, 
                                "left": digitButtonCoordinates.left});
            
            digitButton.removeAttr("id");
            digitButton.attr("id", nullButtonId);
            nullButton.removeAttr("id");
            nullButton.attr("id", digitButtonId);
            
            if(isWin()) {
                checkTime();
                showWinWindow(true);
                stopWatch();
                orderBoard();
                
                $("#button").removeClass('stop_button').addClass('start_button');
            }
        }  
        
    });
    
});


function showWinWindow(show=false) {
    let winnerCnt = document.getElementById("winner_container");
    if(show) {
        winnerCnt.style.display = "flex";
        
        let currentTimeCnt = document.getElementById("current_time");
        let currentTime = document.getElementById("stopwatch");
        currentTimeCnt.textContent = currentTime.textContent + " сек.";
    } else {
        winnerCnt.style.display = "none";
    }
}


function isWin() {
    let coordinate;
    let chip;
    let z = 0;
    
    for(let i = 1; i <= 4; i++){       
        for(let j = 1; j <= 4; j++){
            z++;
            coordinate = '#x' + i + '_' + 'y' + j;
            chip = document.querySelector("#board " + coordinate).children[0].getAttribute('alt');
            if(!chip) chip = 16;
            if(parseInt(chip) != z) {
                return false;
            }
        }
    }
    return true;
}


function newGame() {
    setNewBoard();
    startWatch();
}


function setNewBoard() {
    clearBoard();
    let randomBoard = shuffle();    
    drawBoard(randomBoard);  
}


function clearBoard() {
    BOARD.innerHTML = "";
}


function orderBoard() {
    clearBoard();
    BOARD.innerHTML = "<div id=freeze></div>";
    drawBoard(RIGHT_ORDER);
}


function moveIsLegal(x, y, xNull, yNull) {
    let result = ( (x == xNull) && (Math.abs(y - yNull) == 1))
               || ((y == yNull) && (Math.abs(x - xNull) == 1) );
    return result;
}


function getCoordinates(elementID) {
    let coordinates = { top: 0, left: 0 };
    
    let elementID_x = elementID.split("_")[0][1] - 1;
    let elementID_y = elementID.split("_")[1][1] - 1;
        
    coordinates.top = GRID.x[elementID_x];
    coordinates.left = GRID.y[elementID_y];
    
    return coordinates;
}


function shuffle() {
    let orderedBoard = RIGHT_ORDER.slice();
    let r, a;
        
    for(let i = 0; i < orderedBoard.length; i++) {
        r = Math.floor(Math.random() * (orderedBoard.length - 1));
        a = orderedBoard[i];
        orderedBoard[i] = orderedBoard[r];
        orderedBoard[r] = a;
    }
    
    return orderedBoard;
}


function drawBoard(order) {
    let imgUrlBase = "img/digits/";
    let str, img;
    
    let y, x;
    
    let grid = [
                "x1_y1", "x1_y2", "x1_y3", "x1_y4",
                "x2_y1", "x2_y2", "x2_y3", "x2_y4",
                "x3_y1", "x3_y2", "x3_y3", "x3_y4",
                "x4_y1", "x4_y2", "x4_y3", "x4_y4",
                ];
   
    for(let i = 0; i < order.length; i++){
        if(order[i] != 0){
            img = "<img src=" + imgUrlBase + order[i] + ".png alt=" + order[i] +">";
            str = "<div id=" + grid[i] + " class=button>" + img + "</div>";
        }else{
            str = "<div id=" + grid[i] + " class=null><img></div>";
        }
        BOARD.innerHTML += str;
    }
}

/*------------*/