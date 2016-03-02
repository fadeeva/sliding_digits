// Grid(top, left):
/*
|    (0, 34)    (0, 137)    (0, 240)    (0, 343)
|   (107, 34)  (107, 137)  (107, 240)  (107, 343)
|   (214, 34)  (214, 137)  (214, 240)  (214, 343)
|   (321, 34)  (321, 137)  (321, 240)  (321, 343)
*/

$(document).ready(function(){

    $(".button").click(function(){   
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
        }  
        
    })
    
});

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

function shuffle(array){
    return array;
}

var orderedBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var shuffleBoard = shuffle(orderedBoard);
//console.log(shuffleBoard);