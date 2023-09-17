import Car from "./obj_car.js"
export default class Lane{
    constructor(Star_and_End, speed, car_amount, space){
        this.pos = (Star_and_End[1]-Star_and_End[0])/2;
        this.lane_Star_and_End = Star_and_End;
        
        this.speed = speed;
        this.car_amount =  car_amount;
        this.cars = [];

        this.width_car = 0.2
        this.height_car = 0.1;
        
        this.wrap_line = 1.4;
        this.space = space;
        
        

    }
    set Cars(cars){
        this.cars = cars
    }

    get Cars(){
        return this.cars;
    }


    move(){
        for (let i = 0; i < car_amount; i++){
            this.cars[i].move_right_wrap(this.speed); 
            this.cars[i].render();
         }
    }

    set_webstuff(gl, program){
        this.gl = gl;
        this.id = gl.createBuffer();
        this.gl.bindBuffer( gl.ARRAY_BUFFER, this.id );
        this.program = program;
        this.vPosition = gl.getAttribLocation( program, "vPosition" );
        this.colorLoc = gl.getUniformLocation( program, "fColor" );
    }
}