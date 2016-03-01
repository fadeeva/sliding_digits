// Grid(top, left):
/*
|    (0, 34)    (0, 137)    (0, 240)    (0, 343)
|   (107, 34)  (107, 137)  (107, 240)  (107, 343)
|   (214, 34)  (214, 137)  (214, 240)  (214, 343)
|   (321, 34)  (321, 137)  (321, 240)  (321, 343)
*/

$(document).ready(function(){
    function shuffle(array){
        return array;
    }

    var orderedBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var shuffleBoard = shuffle(orderedBoard);
    //console.log(shuffleBoard);
    
    $(".button").click(function(){   
        var digitButton = $(this) // получить id
        var nullButton = $(".null") // получить id
        var digitButtonId = digitButton.get(0).id;
        var nullButtonId = nullButton.get(0).id;
        
        var x = digitButton.get(0).id.slice(1, 2);
        var y = digitButton.get(0).id.slice(4, 5);
        var xNull = nullButton.get(0).id.slice(1, 2);
        var yNull = nullButton.get(0).id.slice(4, 5);
        
       
        
        if( ((x == xNull) && (Math.abs(y - yNull) == 1)) || ((y == yNull) && (Math.abs(x - xNull) == 1))) {
            digitButton.animate({"top": nullButton.position().top, 
                                 "left": nullButton.position().left});
            nullButton.animate({"top": digitButton.position().top, 
                                 "left": digitButton.position().left});
            
            digitButton.removeAttr("id");
            digitButton.attr("id", nullButtonId);
            nullButton.removeAttr("id");
            nullButton.attr("id", digitButtonId);
            
            
        }
        
        
    })
    
});