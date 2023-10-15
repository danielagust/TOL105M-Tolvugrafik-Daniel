import {run, KeyDownChecker, change_fish_count, config_changer} from "./game.js"




window.onload = function init()
{

    
    document.getElementById("start").addEventListener ("click", run);
    run();
    // document.getElementById("restart").disabled = true;

    // document.getElementById("forward").addEventListener ("keydown", KeyDownChecker);
    // document.getElementById("backward").addEventListener ("keydown", KeyDownChecker);
    // document.getElementById("left").addEventListener ("keydown", KeyDownChecker);
    // document.getElementById("right").addEventListener ("keydown", KeyDownChecker);
    // document.getElementById("up").addEventListener ("keydown", KeyDownChecker);
    // document.getElementById("down").addEventListener ("keydown", KeyDownChecker);

    document.getElementById("change_fish_count_button").addEventListener ("click", change_fish_count);
    
    // could not get it to work
    document.getElementById("cemara_flip").disabled = true; // could not get it to work
    // document.getElementById('forward').disabled = true;  
    // document.getElementById('backward').disabled = true; 
    // document.getElementById('left').disabled = true; 
    // document.getElementById('right').disabled = true; 
    // document.getElementById('up').disabled = true; 
    // document.getElementById('down').disabled = true; 
    
};


