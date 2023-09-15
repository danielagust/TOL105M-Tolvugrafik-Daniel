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
        
        for (let i = 0; i < car_amount; i++){
           this.new_car(i); 
        }
        

    }
    new_car(i){
        var car  = new Car(vec2(this.width_car, this.height_car),this.wrap_line, vec2(this.space[0],lane_mid_list[2]));
        car.set_webstuff(gl, program);
        car.Color = vec4(1.0,0.0,0.0,1.0);
        this.cars.push(car);
    }

    move(){
        for (let i = 0; i < car_amount; i++){
            this.cars[i].move_right_wrap(this.speed); 
            this.cars[i].render();
         }
    }
}