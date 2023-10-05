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
     * pyr = pitch, yaw role
     */
    set pyr_direction3d(new_dir){
        this.direction3d = new_dir;
    }
    /**
     * @param {float[]} new_dir
     * pyr = pitch, yaw role
     */
    set pyr_direction2d(new_dir){
        this.direction2d = new_dir;
    }
    

    set_pyr_direction3d(){
        //swap z and y

        
        
        this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2)+ Math.pow(this.z,2));
        
        this.dir_norm = normalize(this.direction3d_to_vec);
        
        this.yaw = Math.atan2(this.dir_norm[1], this.dir_norm[0]); // yaw
       
        this.pitch = Math.asin(this.dir_norm[2]); // pitch
        
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
        this.x = Math.cos(this.yaw)*Math.cos(new_pitch)
        this.y = Math.sin(this.yaw)*Math.cos(new_pitch)
        this.z = Math.sin(new_pitch)
        this.pitch = new_pitch;
    }

    /**
     * @param {float} new_yaw
     */
    set yaw_set(new_yaw){
        this.x = Math.cos(new_yaw)*Math.cos(this.pitch)
        this.y = Math.sin(new_yaw)*Math.cos(this.pitch)
        this.z = Math.sin(this.pitch)
        this.yaw = new_yaw;
    }

    

    

    
    
}
// export default obj_Direction;

// var test = new obj_Direction(1.0,1.0,1.0)
// console.log(test);
