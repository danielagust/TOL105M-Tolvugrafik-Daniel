

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

