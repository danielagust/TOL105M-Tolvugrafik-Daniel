import * as Helper from './Helper_func.js';
import obj_Direction from './obj_Direction.js';
import obj_Position from './obj_Position.js';
import obj_Vector from './obj_vector.js';
export default class obj_Camera{
    /**
     * 
     * @param {vec3} pos 
     * @param {vec3} at 
     * @param {vec3} up 
     * @param {number} speed 
     */
    constructor(pos, at, up, speed){
        this.pos = pos;
        this.dir = at;
        this.up = up;
        // console.log(this.pos)
        // console.log(this.dir)
        // console.log(this.up)
        
        this.cross_vector = cross(this.dir, this.up);
        // this.cross_vector = cross(this.up, this.dir);
        this.cross_vector_n = normalize(this.cross_vector);
        
        // this.dir = (normalize(this.dir))
        this.speed = speed;
        
        this.cross_vector_V = Helper.vec3_to_Vector(this.cross_vector);
        // this.speed_left = this.cross_vector_V.speed;
        // this.speed_right = -this.cross_vector_V.speed;
        this.zView = 2.0;
        // console.log( this.cross_vector_n);
        
        
        
        
    }
    new_pos(){
     
        return lookAt( this.pos, this.dir, this.up );
    }
    move(v, mv){
        this.pos = add(this.pos, v);
        // var temp = (normalize(this.dir));
        // this.dir = add( temp, v);
        
        // this.mv = mult(this.mv, translate(v))
        var mv2 = mult(mv, this.new_pos())
        // console.log( this.dir);
        return mv2
        
    }
    move_dir(v){
        var temp = this.dir;
        this.dir = add( temp, v);
    }
    move_left(amount, mv){
        var v = negate(scale(amount,this.cross_vector_n))
        this.move_dir(v);
        return this.move(v,mv);
    }

    move_right(amount,mv){
        var v = scale(amount,this.cross_vector_n)
        this.move_dir(v);
        return this.move(v,mv);
    }
    move_forward(amount, mv){
        // console.log(this.pos);
        var v = scale(amount,this.dir);
        // console.log(this.pos);
        return this.move(v,mv);
    }
    move_backward(amount, mv){
        var v = negate(scale(amount,this.dir))
        return this.move(v,mv);
    }

    move_up(amount, mv){
        var v = scale(amount,vec3(0.0,1.0,0.0));
        this.move_dir(v);
        return this.move(v,mv);
    }

    move_down(amount, mv){
        var v = scale(amount,vec3(0.0,-1.0,0.0));
        this.move_dir(v);
        return this.move(v,mv);
    }

    // combined func
    move_fb(amount, mv){
        var v = scale(amount,this.dir);
        // console.log(this.pos);
        return this.move(v,mv);
    }

    move_rl(amount, mv){
        var v = scale(amount,this.cross_vector_n)
        // this.move_dir(v);
        return this.move(v,mv);
    }

    move_ud(amount, mv){
        var v = scale(amount,vec3(0.0,1.0,0.0));
        // this.move_dir(v);
        return this.move(v,mv);
    }

    rotate(yaw, pitch, mv, deltaTime){
        
        
        mv = mult(mv, (translate(this.pos)));
        
        mv = mult( mv, rotateX(yaw) );
        
        mv = mult( mv, rotateY(pitch) );
        
        mv = mult(mv, (translate(negate(this.pos))));
        
        // const corector = 0.1
        // var temp = Helper.vec3_to_Dir(this.dir);
        // temp.pitch_set = pitch*corector;
        // temp.yaw_set = yaw*corector;
        // this.dir = temp.direction3d_to_vec;
        // this.new_pos();
        // console.log(this.dir);
        
        return mv;
    }
}