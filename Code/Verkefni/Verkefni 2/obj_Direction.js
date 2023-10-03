export default class obj_Direction{
    constructor(x, y,z=0.0){
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = Math.sqrt(Math.pow(x,2)+ Math.pow(y,2)+ Math.pow(z,2));
    }

    get direction2d(){
        return [this.x, this.y];
    }

    set direction2d(new_dir){
        this.x = new_dir[0];
        this.y = new_dir[1];
        this.speed = Math.sqrt(Math.pow(x,2)+ Math.pow(y,2)+ Math.pow(z,2));
    }

    get direction2d_to_vec(){
        return vec2(this.x, this.y);
    }


    get direction3d(){
        return [this.x, this.y, this.z];
    }

    set direction3d(new_dir){
        this.x = new_dir[0];
        this.y = new_dir[1];
        this.z = new_dir[2];
        this.speed = Math.sqrt(Math.pow(x,2)+ Math.pow(y,2)+ Math.pow(z,2));
    }

    get direction3d_to_vec(){
        return vec3(this.x, this.y, this.z);
    }
    
}