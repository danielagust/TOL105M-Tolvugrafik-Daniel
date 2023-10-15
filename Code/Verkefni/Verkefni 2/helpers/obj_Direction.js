import obj_Vector from "./obj_vector.js";
import * as Helper from './Helper_func.js';


// import { is_float } from "./Helper_func";
export default class obj_Direction{
    /**
     * 
     * @param {float} x 
     * @param {float} y 
     * @param {float} z 
     * @param {boolean} if2d 
     */
    constructor(x, y, z, if2d){
        this.x = x;
        this.y = y;
        this.z = z;
        //pyr = pitch, yaw, role
        if(if2d) {
            this.set_pyr_direction2d();
        }else{
            this.set_pyr_direction3d();
        }
        
        
        
    }
    // check_if_float(value){
    //     if(is_float(value)){
    //         throw (
    //             new Error("is not float")
    //         );
    //     }
    // }

    get direction2d(){
        return [this.x, this.y];
    }
    /**
     * @param {float[]} new_dir two in length
     */
    set direction2d(new_dir){
        if(new_dir.length != 2){
            throw (
                new Error("it is not length of 2")
            );
        }
        this.x = new_dir[0];
        this.y = new_dir[1];
        this.set_pyr_direction2d();
    }

    get direction2d_to_vec(){
        return vec2(this.x, this.y);
    }


    get direction3d(){
        return [this.x, this.y, this.z];
    }
    /**
     * @param {float[]} new_dir three in length
     */
    set direction3d(new_dir){
        this.x = new_dir[0];
        this.y = new_dir[1];
        this.z = new_dir[2];
        this.set_pyr_direction3d();
    }

    get direction3d_to_vec(){
        return vec3(this.x, this.y, this.z);
    }

    /**
     * @param {float[]} new_dir
     */
    set (new_dir){
        this.direction3d = new_dir;
    }

    /**
     * @param {float[]} new_dir
     * pyr = pitch, yaw role
     */
    set pyr_direction3d(new_pyr){
        // this.pitch_set = new_pyr[1];
        // this.yaw_set = new_pyr[2];
        this.x = Math.cos(radians(new_pyr[2]))*Math.cos(radians(new_pyr[1]))
        this.y = Math.sin(radians(new_pyr[2]))*Math.cos(radians(new_pyr[1]))
        this.z = Math.sin(radians(new_pyr[1]))
        var temp = (normalize(this.direction3d_to_vec), 100)
        this.direction3d = scale(new_pyr[0], normalize(this.direction3d_to_vec))
        this.set_pyr_direction3d()
        console.log(this.yaw)
        console.log(temp)
        
        
    }
    /**
     * @param {float[]} new_dir
     * pyr = pitch, yaw role
     */
    set direction2d(new_dir){
        this.direction2d = new_dir;
    }
    

    set_pyr_direction3d(){
        //swap z and y

        
        
        // this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2)+ Math.pow(this.z,2));
        this.speed = Helper.get_speed(this.direction3d_to_vec);
        // this.dir_norm = normalize(this.direction3d_to_vec);
        this.dir_norm = Helper.vec3_to_Vector(normalize(this.direction3d_to_vec));
        
        this.yaw = Math.atan2(this.dir_norm.y, this.dir_norm.x); // yaw
       
        this.pitch = Math.asin(this.dir_norm.z); // pitch
        
        // this.yaw = Math.atan2(this.dir_norm.x, this.dir_norm.z); // yaw
       
        // this.pitch = Math.asin(-this.dir_norm.y); // pitch

        // this.yaw = Math.atan2(this.dir_norm.x,-this.dir_norm.y); // yaw
       
        // this.pitch = Math.atan(Math.sqrt(Math.pow(this.dir_norm.x,2)+Math.pow(this.dir_norm.y,2))/this.dir_norm.z)
        // console.log(this.yaw);
        // console.log(this.pitch);
        // console.log("");
    }

    set_pyr_direction2d(){
        this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2));
        this.theta = Math.atan2(this.y, this.x);
    }
    // /**
    //  * 0 to 2π
    //  */
    // get yaw_cor2d(){
    //     return this.yaw+ Math.PI;
    // }
    // /**
    //  * 0 to 2π
    //  */
    // get yaw_cor3d(){
    //     return this.yaw*2;
    // }
    // /**
    //  * 0 to 2π
    //  */
    // get pitch_cor(){
    //     return this.pitch+ Math.PI;
    // }
    // /**
    //  * gets the pyr dir in 3d 
    //  */
    get pyr_direction3d(){
        return [this.speed, this.yaw, this.pitch];
    }
    /**
     * gets the pyr dir in 2d
     */
    get pyr_direction2d(){
        return [this.speed, this.theta];
    }
    /**
     * gets the pyr dir in 3d with the angles 0 to 2π
     */
    get pyr_direction3d_cor(){
        return [this.speed, this.yaw_cor3d(), this.pitch_cor()];
    }

    /**
     * gets the pyr dir in 2d with the angles 0 to 2π
     */
    get pyr_direction2d_cor(){
        return [this.speed, this.yaw_cor2d()];
    }

    /**
     * @param {float} new_pitch
     */
    set pitch_set(new_pitch){
        this.x = this.speed*Math.cos(this.yaw)*Math.cos(new_pitch)
        this.y = this.speed*Math.sin(this.yaw)*Math.cos(new_pitch)
        this.z = this.speed*Math.sin(new_pitch)
        this.pitch = new_pitch;
    }

    /**
     * @param {float} new_yaw
     */
    set yaw_set(new_yaw){
        this.x = this.speed*Math.cos(new_yaw)*Math.cos(this.pitch)
        this.y = this.speed*Math.sin(new_yaw)*Math.cos(this.pitch)
        this.z = this.speed*Math.sin(this.pitch)
        this.yaw = new_yaw;
    }

    

    

    
    
}
// export default obj_Direction;

// var test = new obj_Direction(1.0,1.0,1.0)
// console.log(test);
