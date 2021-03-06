function writeInTimeRecords() {
    if(!localStorage.getItem(0))
        localStorage.setItem(0, 995);
    if(!localStorage.getItem(1))
        localStorage.setItem(1, 996);
    if(!localStorage.getItem(2))
        localStorage.setItem(2, 997);
    if(!localStorage.getItem(3))
        localStorage.setItem(3, 998);
    if(!localStorage.getItem(4))
        localStorage.setItem(4, 999);
    
    let timeRecords = $("#progress_list").children();

    timeRecords.each(function(i) {
        $(this).text(localStorage.getItem(i));
    });
}

function checkTime() {
    let newTime = parseInt($("#stopwatch").text());
    let arrTime = [];
    
    for(let i = 0; i < 5; i++) {
        arrTime[i] = parseInt(localStorage.getItem(i));
    }
    
    for(let i = 0; i < 5; i++) {
        if(newTime < arrTime[i]) {
            arrTime.splice(i, 0, newTime);
            break;
        }
    }
    
    for(let i = 0; i < 5; i++) {
        localStorage.setItem(i, arrTime[i]);
    }
    
    writeInTimeRecords();
}