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

    // new_cars(){
    //     for (let i = 0; i < this.car_amount; i++){
    //         this.new_car(i); 
    //         console.log("new line");
    //         console.log("");
    //      }
    //     console.log("width car ", this.width_car);
    //     console.log("height car ", this.height_car);
    //     console.log("wrap line ", this.wrap_line);
    //     console.log("pos ", vec2(this.space[0],mid) );
        
    //     console.log("new lane");
    //     console.log("");
         
         
    // }
    // new_car(i){
    //     var mid = (this.lane_Star_and_End[0]+this.lane_Star_and_End[1])/2
    //     var car  = new Car(vec2(this.width_car, this.height_car),this.wrap_line, vec2(this.space[i],mid)); // add the cars ad a given space
    //     car.set_webstuff(this.gl, this.program);
    //     car.Color = vec4(1.0,0.0,0.0,1.0);
    //     this.cars.push(car);
    //     console.log("mid ",  mid);
    //     console.log("car ", car);
        
    // }

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