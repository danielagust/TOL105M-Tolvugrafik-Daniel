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
    constructor(pos, at, up, ySpin){
        this.pos = pos;
        this.dir = at;
        this.up = up;
        // console.log(this.pos)
        // console.log(this.dir)
        // console.log(this.up)
        
        // this.cross_vector = cross(this.dir, this.up);
        // // this.cross_vector = cross(this.up, this.dir);
        // this.cross_vector_n = normalize(this.cross_vector);
        
        // this.dir = (normalize(this.dir))
        // this.ySpin = ySpin;
        
        // this.cross_vector_V = Helper.vec3_to_Vector(this.cross_vector);
        // this.speed_left = this.cross_vector_V.speed;
        // this.speed_right = -this.cross_vector_V.speed;
        this.zView = 2.0;
        // console.log( this.cross_vector_n);
        this.new_dir(0.0,0.0,0.0)

        this.zDist = -3.0;
        this.xDist = 0.0;
        this.yDist = 0.0;
        this.speed = 1.0
        
        
        
        
    }
    new_pos(){
        // console.log("hello")
        return lookAt( this.pos, this.dir, this.up );
    }

    new_posv2(){
     
        return lookAt( this.pos.position3d_to_vec, this.dir.direction3d_to_vec, this.up );
    }
    new_lookAt(){
        
        // return  lookAt( vec3(this.xDist, this.yDist, this.zDist),
        //         vec3(this.xDist, this.yDist, this.zDist+2.0),
        //         this.up);
        this.new_dir(0.0,0.0,0.0)
        return  lookAt( this.pos.position3d_to_vec,
            this.dir,
        this.up);
    }
    new_dir(x,y,z){
        this.dir = vec3(this.xDist+x, 0.0+y, this.zDist+2.0+z);
    }
    new_posv3(){
        this.pos = Helper.vec3_to_Pos(vec3(this.xDist, this.yDist, this.zDist))
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

    movev2(mv){
        var mv2 = mult(mv, this.new_posv2())
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

    
    move_fbv2(amount, mv){
       
        // this.pos = new obj_Position(this.pos.x, this.pos.y, amount);
        // this.dir = new obj_Direction(this.dir.x, this.dir.y, amount+2.0)
        this.zDist +=amount;
        this.new_posv3()
        // return this.new_lookAt()
    }

    move_rlv2(amount, mv){
        // this.pos = new obj_Position(this.pos.x+amount, this.pos.y, this.pos.z);
        // this.dir = new obj_Direction(this.dir.x+amount, this.dir.y, this.dir.z)
        this.xDist +=amount;
        this.new_posv3()
        // return this.new_lookAt()
    }

    move_udv2(amount, mv){
        // this.pos = new obj_Position(this.pos.x, this.pos.y+amount, this.pos.z);
        // this.dir = new obj_Direction(this.dir.x, this.dir.y+amount, this.dir.z)
        this.yDist +=amount;
        this.new_posv3()
        // return this.new_lookAt()
    }

    rotate(yaw, pitch, mv, deltaTime){
        
        
        // mv = mult(mv, (translate(this.pos.position3d_to_vec)));
        
        mv = mult( mv, rotateX(yaw) );
        
        mv = mult( mv, rotateY(pitch) );
        
        // mv = mult(mv, (translate(negate(this.pos.position3d_to_vec))));

        console.log(this.up);
        
        // const corector = 0.1
        // var temp = Helper.vec3_to_Dir(this.dir);
        // temp.pitch_set = pitch*corector;
        // temp.yaw_set = yaw*corector;
        // this.dir = temp.direction3d_to_vec;
        // this.new_pos();
        // console.log(this.dir);
        
        return mv;
    }

    /**
     * @param {number} new_pitch
     */
    angle_set(new_pitch, new_yaw){
        // console.log(new_pitch)
        new_yaw = radians(new_yaw);
        new_pitch = radians(new_pitch);

        this.x = 0.0;
        this.y = 1.0;
        this.z = 0.0;
        // this.x = this.speed*Math.cos(new_yaw)*Math.cos(new_pitch)
        
        // this.y = 1.0
        this.y = this.speed*Math.sin(new_yaw)*Math.cos(new_pitch)+1
        this.z = this.speed*Math.sin(new_pitch)
        
        // this.x = Math.cos(new_pitch) * Math.cos(new_yaw)
        // this.y = Math.sin(new_pitch)
        // this.z = Math.cos(new_pitch) * -Math.sin(new_yaw)
    
        // this.z = 1
        // console.log((this.up))
        // console.log(vec3(this.x,this.y,this.z))
        this.up2 = normalize(vec3(this.x,this.y,this.z));
        this.new_dir( this.up2[0],  this.up2[1],  this.up2[2])
        
        
    }
}
var mv = lookAt( vec3(xDist, 0.0, zDist),
vec3(xDist, 0.0, zDist+2.0),
vec3(0.0, 1.0, 0.0) );