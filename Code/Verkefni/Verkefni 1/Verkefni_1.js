///////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Einfaldasta WebGL forritið.  Teiknar einn rauðan þríhyrning.
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
///////////////////////////////////////////////////////////////////
import Car from "./obj_car.js"
import {run, KeyDownChecker} from "./game.js"
// import  from "./game.js"


// function event_keyboard(){
//     var Forward_key = 87; // w key
//     var Backward_key = 83; // s key
//     var Left_key = 65; // a key
//     var Right_key = 68; // d key
   
//     // $(this).on('keydown', function(event) {
//     //     // if (event.keyCode == 13) {
//     //     //   alert('hi.')
//     //     // }
//     //     alert(event.keyCode)
//     // })
//     document.addEventListener("keydown", function(event) {
//         console.log("hello");
//         // w key
//         if (event.keyCode == Forward_key) {
//           alert('Forward_key')
//         }
//         // s key
//         if (event.keyCode == Backward_key) {
//             alert('Backward_key')
//         }
//         // a key
//         if (event.keyCode == Left_key) {
//             alert('Left_key')
//         }
//         // d key
//         if (event.keyCode == Right_key) {
//             alert('Right_key')
//         }
//     })
// }

function Get_key(evtobj,id) {

    if (evtobj.keyCode == 75 && evtobj.ctrlKey) {

        alert(id);
    }
    alert(id, keyCode);
}

window.onload = function init()
{

    // event_keyboard();
    // run()
    document.getElementById("test").addEventListener ("click", run);

    document.getElementById("forward").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("backward").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("left").addEventListener ("keydown", KeyDownChecker);
    document.getElementById("right").addEventListener ("keydown", KeyDownChecker);
    
};



function run_run(){

}



// function KeyDownChecker(evtobj,id) {

//     var target = evtobj.target || evtobj.srcElement;

//     // if (evtobj.keyCode == 75 && evtobj.ctrlKey) {
//     //     AddUsers(target.id);

//     //     return false;
//     // }
//     // alert(target.id);
//     document.getElementById(target.id).value = "";
// }


