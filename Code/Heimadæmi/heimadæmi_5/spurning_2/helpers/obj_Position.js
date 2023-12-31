import * as Helper from './Helper_func.js';
export default class obj_Position{
    /**
     * 
     * @param {float} x 
     * @param {float} y 
     * @param {float} z 
     */
    constructor(x, y,z=0.0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get position2d(){
        return [this.x, this.y];
    }

    set position2d(new_pos){
        this.x = new_pos[0];
        this.y = new_pos[1];
    }

    get position2d_to_vec(){
        return vec2(this.x, this.y);
    }


    get position3d(){
        return [this.x, this.y, this.z];
    }

    set position3d(new_pos){
        this.x = new_pos[0];
        this.y = new_pos[1];
        this.z = new_pos[2];
    }

    get position3d_to_vec(){
        return vec3(this.x, this.y, this.z);
    }

    get radius(){
        return Helper.get_speed(this.position3d_to_vec)
    }
    
}