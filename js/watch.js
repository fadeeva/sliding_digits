
var c = 0;
var t;
var timer_is_on = 0;

function stopWatch(){
    
    
    
    restartWatch();
    clearInterval(interval);
    timer_is_on = 0;   
}

function timedCount(){
    
    document.getElementById('stopwatch').innerHTML = c;
    c++;
    if(c - 10 > 0)
        document.getElementById('stopwatch').style.marginLeft = "87px";
    if(c - 100 > 0)
        document.getElementById('stopwatch').style.marginLeft = "27px";
    if(c == 999)
        stopWatch();
}

function startWatch(){
    restartWatch();
    if(!timer_is_on){
        timer_is_on = 1;        
        interval = setInterval("timedCount()", 1000);        
    }
}

function restartWatch(){
    c = 0;
    document.getElementById('stopwatch').style.marginLeft = "147px";
    document.getElementById('stopwatch').innerHTML = c;
}