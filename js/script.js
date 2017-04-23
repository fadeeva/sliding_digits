// Grid(top, left):
/*
|    (0, 34)    (0, 137)    (0, 240)    (0, 343)
|   (107, 34)  (107, 137)  (107, 240)  (107, 343)
|   (214, 34)  (214, 137)  (214, 240)  (214, 343)
|   (321, 34)  (321, 137)  (321, 240)  (321, 343)
*/

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
        var digitButton = $(this);
        var nullButton = $(".null");
        var digitButtonId = digitButton.get(0).id;
        var nullButtonId = nullButton.get(0).id;
        
        var x = digitButton.get(0).id.slice(1, 2);
        var y = digitButton.get(0).id.slice(4, 5);
        var xNull = nullButton.get(0).id.slice(1, 2);
        var yNull = nullButton.get(0).id.slice(4, 5);
        
        var nullButtonCoordanates = getCoordinates(nullButtonId);
        var digitButtonCoordinates = getCoordinates(digitButtonId);
        
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
                
                //console.log("WIN")
            }
        }  
        
    });
    
});

var rightOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

function showWinWindow(show = false) {
    if(show) {
        $("#winner_container").css("display", "flex");
        $("#current_time").text($("#stopwatch").text() + " сек.");
    } else {
        $("#winner_container").css("display", "none");
    }
}

//var j = 0;
function isWin() {
    /*j++;
    if(j > 3) {
        j = 0;
        return true;
    }
    return false;*/
    
    var coordinate;
    var chip;
    var z = 0;
    
    for(var i = 1; i <= 4; i++){       
        for(var j = 1; j <= 4; j++){
            z++;
            coordinate = '#x' + i + '_' + 'y' + j;
            chip = $("#board " + coordinate).children().attr('alt');
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
    var randomBoard = shuffle();    
    drawBoard(randomBoard);  
}

function clearBoard() {
    $("#board").empty();
}

function orderBoard() {
    clearBoard();
    $('#board').append('<div id=freeze></div>')    
    drawBoard(rightOrder);
}

function moveIsLegal(x, y, xNull, yNull) {
    var result = ( (x == xNull) && (Math.abs(y - yNull) == 1))
               || ((y == yNull) && (Math.abs(x - xNull) == 1) );
    return result;
}

function getCoordinates(elementID) {
    var coordinates = {
        top: 0,
        left: 0
    };
    
    switch(elementID) {
        /*-ROW1-------------------------------*/
        case "x1_y1" : 
                        coordinates.top = 0;
                        coordinates.left = 34;
                        break;
        case "x1_y2" : 
                        coordinates.top = 0;
                        coordinates.left = 137;
                        break;
        case "x1_y3" : 
                        coordinates.top = 0;
                        coordinates.left = 240;
                        break;
        case "x1_y4" : 
                        coordinates.top = 0;
                        coordinates.left = 343;
                        break;
        /*-ROW2-------------------------------*/
        case "x2_y1" : 
                        coordinates.top = 107;
                        coordinates.left = 34;
                        break;
        case "x2_y2" : 
                        coordinates.top = 107;
                        coordinates.left = 137;
                        break;
        case "x2_y3" : 
                        coordinates.top = 107;
                        coordinates.left = 240;
                        break;
        case "x2_y4" : 
                        coordinates.top = 107;
                        coordinates.left = 343;
                        break;
        /*-ROW3-------------------------------*/
        case "x3_y1" : 
                        coordinates.top = 214;
                        coordinates.left = 34;
                        break;
        case "x3_y2" : 
                        coordinates.top = 214;
                        coordinates.left = 137;
                        break;
        case "x3_y3" : 
                        coordinates.top = 214;
                        coordinates.left = 240;
                        break;
        case "x3_y4" : 
                        coordinates.top = 214;
                        coordinates.left = 343;
                        break;
        /*-ROW4-------------------------------*/
        case "x4_y1" : 
                        coordinates.top = 321;
                        coordinates.left = 34;
                        break;
        case "x4_y2" : 
                        coordinates.top = 321;
                        coordinates.left = 137;
                        break;
        case "x4_y3" : 
                        coordinates.top = 321;
                        coordinates.left = 240;
                        break;
        case "x4_y4" : 
                        coordinates.top = 321;
                        coordinates.left = 343;
                        break;
        
        default : break;
    }
    return coordinates;
}

function shuffle() {
    var orderedBoard = rightOrder.slice();
    var r, a;
    
    for(var i = 0; i < orderedBoard.length; i++) {
        r = Math.floor(Math.random() * (orderedBoard.length - 1));
        a = orderedBoard[i];
        orderedBoard[i] = orderedBoard[r];
        orderedBoard[r] = a;
    }
    return orderedBoard;
}

function drawBoard(order) {
    var button = $("#board");
    var imgUrlBase = "img/digits/";
    var str, img;
    var grid = [
                "x1_y1", "x1_y2", "x1_y3", "x1_y4",
                "x2_y1", "x2_y2", "x2_y3", "x2_y4",
                "x3_y1", "x3_y2", "x3_y3", "x3_y4",
                "x4_y1", "x4_y2", "x4_y3", "x4_y4",
                ];
   
    for(var i = 0; i < order.length; i++){
        if(order[i] != 0){
            img = "<img src=" + imgUrlBase + order[i] + ".png alt=" + order[i] +">";
            str = "<div id=" + grid[i] + " class=button>" + img + "</div>";
            button.append(str);
        }else{
            str = "<div id=" + grid[i] + " class=null><img></div>";
            button.append(str);
        }
    }
}

/*------------*/