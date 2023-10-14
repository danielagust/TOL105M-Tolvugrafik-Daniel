import obj_Vector from "./obj_vector.js";


import config from "../config.json" assert { type: 'json' };

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
      isFinite(value) && 
      Math.floor(value) === value;
  };

if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
}
Number.isSafeInteger = Number.isSafeInteger || function (value) {
   return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
};


export function is_float(value){
    return Number(value) === value && value % 1 !== 0;
}

export function is_integer(value){
    return Number.isSafeInteger(value);
}

export function angle_to_degre(angle){
    return angle * 180/Math.PI;
}
var then = 0;
export function new_speed(now){
    // Convert to seconds
    now *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = now - then;
    if (deltaTime != deltaTime){ // check if NAN
        return 0.0;
    }
    // Remember the current time for the next frame.
    then = now;
   //  console.log("deltaTime new ", deltaTime);

    return deltaTime;
}

export function get_speed(v){
    var temp = 0;
    for ( var i = 0; i < v.length; ++i ){
        temp += Math.pow(v[i],2);
    }
    return Math.sqrt(temp);
} 

export function vec3_to_Vector(v){
    return new obj_Vector(v[0], v[1], v[2]);
}

export function transposeV(v){
    // var array = v;
    // return array.map((_, colIndex) => array.map(row => row[colIndex]));
    if (v.length[0] == 1){

    }
    
    for ( var i = 0; i < v.length; ++i ) {
        result.push( [v[i]] );
        
    }
    result.matrix = true;
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = tmp;
        }
    }
    return mat
    return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
    ), []);
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
    return result;
}

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;

    return result;
}

export function make_fishs(fishs){
    
    fishs.push(new obj_Fish([size_body,size_tail,size_fin], 2.0, new obj_Position(0.0,0.0,0.0), new obj_Direction(1.0,-0.0,0.0))) 
}

// function is_floatv2(e){
//     const n = Number(e)

//     if (Number.isNaN(n)) {
        
//         return false
//         console.log(e + " :letter")
//     }

//     if (Number.isInteger(n)) {
        
//         return false
//         console.log(e + " :integer")
//     }
//     return true;
//     console.log(e + " :non-integer number")
// }

// function is_floatv3(input){
//     if(!Number.isInteger(input)) {
//         if(Number.isSafeInteger(input)  ){
//             // console.log("hello", true);
//             return true;
//         } 
//         // console.log("hello2", false);
//         if(!isNaN(parseFloat(input))) {
//             // console.log("hello3", true);  
//             return true;
//         }
        
//     }
//     return false;
    
// }
// var input = 1.0
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), false)     
// console.log("4",is_floatv2(input), false); 
// console.log("5",is_floatv3(input), false); 
// console.log("");

// var input = 1.2
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), true);     // corect
// console.log("4",is_floatv2(input), true);     // corect
// console.log("5",is_floatv3(input), true);     // corect
// console.log("");

// var input = "1.2"
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), true)     // corect
// console.log("4",is_floatv2(input), false);
// console.log("5",is_floatv3(input), false);
// console.log("");

// var input = "hello"
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");

// var input = ""
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");

// var input = []
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");

