// import { is_float } from "./Helper_func";
 class obj_Direction{
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
        if(if2d) {

        }else{
            this.#set_polar_direction3d();
        }
        
        
    }
    // #check_if_float(value){
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
        this.#set_polar_direction2d();
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
        this.#set_polar_direction3d();
    }

    get direction3d_to_vec(){
        return vec3(this.x, this.y, this.z);
    }

    /**
     * @param {float[]} new_dir
     */
    set polar_direction3d(new_dir){
        this.direction3d = new_dir;
    }

    set polar_direction2d(new_dir){
        this.direction2d = new_dir;
    }

    #set_polar_direction3d(){
        if(this.x==0.0 && this.y==0.0 && this.z==0){
            throw (
                new Error("all stuff 0")
            );
        }
        this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2)+ Math.pow(this.z,2));
        this.theta = Math.acos(this.z/this.speed) // 0 to pi
        this.phi =  Math.sign(this.y)*Math.acos(this.z/Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2))) // - pi to pi
    }

    #set_polar_direction2d(){
        this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2));
        this.theta = Math.atan2(this.y, this.x);
    }
    /**
     * 0 to 2π
     */
    get theta_cor2d(){
        return this.theta+ Math.PI;
    }
    /**
     * 0 to 2π
     */
    get theta_cor3d(){
        return this.theta*2;
    }
    /**
     * 0 to 2π
     */
    get phi_cor(){
        return this.phi+ Math.PI;
    }
    /**
     * gets the polar dir in 3d 
     */
    get polar_direction3d(){
        return [this.speed, this.theta, this.phi];
    }
    /**
     * gets the polar dir in 2d
     */
    get polar_direction2d(){
        return [this.speed, this.theta];
    }
    /**
     * gets the polar dir in 3d with the angles 0 to 2π
     */
    get polar_direction3d_cor(){
        return [this.speed, this.theta_cor3d(), this.phi_cor()];
    }

    /**
     * gets the polar dir in 2d with the angles 0 to 2π
     */
    get polar_direction2d_cor(){
        return [this.speed, this.theta_cor2d()];
    }
    
}
export default obj_Direction;

// var test = new obj_Direction(1.0,1.0,1.0)
// console.log(test);
