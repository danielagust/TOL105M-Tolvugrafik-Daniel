
import {run, KeyDownChecker} from "./game.js"




window.onload = function init()
{

    
    // document.getElementById("test").addEventListener ("click", run);
    run();

    document.getElementById("forward").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("backward").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("left").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("right").addEventListener ("keydown", KeyDownChecker);
    
};




