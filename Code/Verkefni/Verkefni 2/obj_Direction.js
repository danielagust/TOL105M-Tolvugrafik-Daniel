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
        
        if(if2d) {
            this.set_polar_direction2d();
        }else{
            this.set_polar_direction3d();
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
        this.set_polar_direction2d();
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
        this.set_polar_direction3d();
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
    calculate_theta(){
        if(this.z>0){
            this.theta = Math.atan(Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2))/this.z);
            return;
        }
        if(this.z>0){
            this.theta = Math.PI + Math.atan(Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2))/this.z);
            return;
        }
        if(this.z==0 && this.x!=0 & this.y!=0){
            this.theta = Math.PI/2;
            return;
        }
        this.theta = 0.0;

    }

    set_polar_direction3d(){
        //swap z and y

        
        
        this.speed = Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2)+ Math.pow(this.z,2));
        
        this.dir_norm = normalize(this.direction3d_to_vec);
        // this.theta = Math.acos(this.y/this.speed) // 0 to pi
        // this.theta = Math.acos(this.z/this.speed) // 0 to pi
        this.theta = Math.atan2(this.dir_norm[1], this.dir_norm[0]); // yawn
        // this.calculate_theta();
        
        // this.phi =  Math.sign(this.z)*Math.acos(this.x/Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.z,2))) // - pi to pi
        // this.phi =  Math.sign(this.y)*Math.acos(this.x/Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2))) // - pi to pi
        this.phi = Math.asin(this.dir_norm[2]); // pitch
        
    }

    set_polar_direction2d(){
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

    get pitch(){
        return this.phi
    }

    get yaw(){
        return this.theta
    }

    
    
}
// export default obj_Direction;

// var test = new obj_Direction(1.0,1.0,1.0)
// console.log(test);
