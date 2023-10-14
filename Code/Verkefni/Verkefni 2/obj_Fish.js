import obj_Size from "./helpers/obj_Size.js";
import obj_Parent_Char from "./obj_Parent_Char.js"
import * as Helper from './helpers/Helper_func.js';
import obj_Direction from "./helpers/obj_Direction.js";
import obj_Position from "./helpers/obj_Position.js";
import config from "./config.json" assert { type: 'json' };

export default class obj_Fish {
    /**
     * 
     * @param {obj_Size[]} size 
     * @param {float} width_screen_end 
     * @param {vec2} pos 
     */
    constructor(size, width_screen_end, pos, dir, body_middle){
        var temp_points = [];


       
        
        
        // super(temp_points, size, pos); // sent to parent
        // this.size_body = new obj_Size(0.5,0.2,0.0); //new obj_Size(0.5,0.2,0.0);
        // this.size_tail = new obj_Size(0.15,0.15,0.0); //new obj_Size(0.15,0.15,0.0);
        // this.size_fin = new obj_Size(0.1,0.02,0.0); //new obj_Size(0.1,0.02,0.0);
        this.size_body = size[0] //new obj_Size(0.5,0.2,0.0);
        this.size_tail = size[1] //new obj_Size(0.15,0.15,0.0);
        this.size_fin = size[2] //new obj_Size(0.1,0.02,0.0);
        // console.log(this.size_fin);
        var body_middle = body_middle;
        // this.dir  = new obj_Direction(1.0,-0.0,0.0);
        this.dir = dir
        this.dir_allowed = config.fish.dir_alowed;

        this.rotTail = 0.0;        // Snúningshorn tail
        this.incTail = 2.0;        // Breyting á snúningshorni

        this.rotFin1 = 0.0;        // Snúningshorn fin 1
        this.incFin1 = 0.2;        // Breyting á snúningshorni

        this.rotFin2 = 0.0;        // Snúningshorn fin 2
        this.incFin2 = -0.2;        // Breyting á snúningshorni

        this.pos = pos;

        // var vertices = [
        //     // l�kami (spjald)
        //     vec4( -body_length,  body_width, 0.0, 1.0 ),
        //     vec4(  body_middle,  body_height, body_width, 1.0 ),
        //     vec4(  body_length,  0.0, body_width, 1.0 ),
            
        //     vec4(  body_length,  0.0, body_width, 1.0 ),
        //     vec4(  body_middle, -body_height, body_width, 1.0 ),
        //     vec4( -body_length,  0.0, body_width, 1.0 ),
        //     // spor�ur (�r�hyrningur)
        //     vec4( -0.0,  0.0, 0.0, 1.0 ),
        //     vec4( -tail_length,  tail_height, 0.0, 1.0 ),
        //     vec4( -tail_length, -tail_height, 0.0, 1.0 ),
        
        //     vec4( -0.0,  0.0, 0.0, 1.0 ),
        //     vec4( -fin_length,  fin_height, 0.0, 1.0 ),
        //     vec4( -fin_length, -fin_height, 0.0, 1.0 )
        // ];

        this.body = [
            // l�kami (spjald)
            vec4( -this.size_body.length,  this.size_body.width, 0.0, 1.0 ),
            vec4(  body_middle,  this.size_body.height, this.size_body.width, 1.0 ),
            vec4(  this.size_body.length,  0.0, this.size_body.width, 1.0 ),
            
            vec4(  this.size_body.length,  0.0, this.size_body.width, 1.0 ),
            vec4(  body_middle, -this.size_body.height, this.size_body.width, 1.0 ),
            vec4( -this.size_body.length,  0.0, this.size_body.width, 1.0 ),
            // spor�ur (�r�hyrningur)
            
        ];
        this.tail = [
            vec4( -0.0,  0.0, 0.0, 1.0 ),
            vec4( -this.size_tail.length,  this.size_tail.height, 0.0, 1.0 ),
            vec4( -this.size_tail.length, -this.size_tail.height, 0.0, 1.0 )
        ];
        this.fin = [
            vec4( -0.0,  0.0, 0.0, 1.0 ),
            vec4( -this.size_fin.length,  this.size_fin.height, 0.0, 1.0 ),
            vec4( -this.size_fin.length, -this.size_fin.height, 0.0, 1.0 )
        ];
        // console.log(this.fin);
        this.zView = 10.0
        this.points_all = [];
        // this.points_all = this.body + this.tail + this.fin;
        this.points_all.push(...this.body);
        this.points_all.push(...this.tail);
        this.points_all.push(...this.fin);
        // console.log(this.points_all);
        
       
        // this.position = pos;
        // this.points = temp_points;
        

        
        this.width_screen_end = width_screen_end;
        
        
    }

    set_webstuff(gl, program){
        this.gl = gl;

        this.vBuffer = this.gl.createBuffer();
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points_all), this.gl.STATIC_DRAW );
    
        var vPosition = this.gl.getAttribLocation( program, "vPosition" );
        this.gl.vertexAttribPointer( vPosition, 4, this.gl.FLOAT, false, 0, 0 );
        
        

    
        this.colorLoc = this.gl.getUniformLocation( program, "fColor" );
    
        // this.proLoc = this.gl.getUniformLocation( program, "projection" );
        this.mvLoc = this.gl.getUniformLocation( program, "modelview" );
        this.gl.enableVertexAttribArray( vPosition );
    
        // Setjum ofanvarpsfylki h�r � upphafi
        // var proj = perspective( 90.0, 1.0, 0.1, 100.0 );
        // this.gl.uniformMatrix4fv(this.proLoc, false, flatten(proj));
    }

    calculate_centerv2(){
        return vec3((-this.size_tail.length+this.size_body.length)/2, (-this.size_body.height+this.size_body.height)/2, (-this.size_body.width+this.size_body.width)/2);
    }
    
    // console.log(calculate_center())
    get_ofset(){
        var temp = this.calculate_centerv2();
        return(vec3(-temp[0], -temp[1], -temp[2]))
    }

    render(mv){
        // console.log(dir.x);
    // this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points_all), this.gl.STATIC_DRAW );

    // var mv = lookAt( vec3(0.0, 0.0, this.zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    // mv = mult( mv, rotateX(spinX) );
    // mv = mult( mv, rotateY(spinY) );
    
    mv = mult(mv, translate(this.pos.position3d_to_vec))
    mv = mult(mv, translate(this.get_ofset())) // move to center
    // mv = mult( mv, rotateX(Helper.angle_to_degre(dir.yaw)) );
    if (radians(this.dir_allowed.yaw.yaw_max)> this.dir.yaw && radians(this.dir_allowed.yaw.yaw_min) < this.dir.yaw){
        mv = mult( mv, rotateZ(Helper.angle_to_degre(this.dir.yaw)) );
    }
    
    
    
    mv = mult( mv, rotateY(Helper.angle_to_degre(this.dir.pitch)) );
    // mv = mult( mv, rotateY(Helper.angle_to_degre(Math.PI)) );
   

    // mv = mult( mv, rotateZ(Helper.angle_to_degre(dir.theta)) );
    // mv = mult( mv, rotateX(Helper.angle_to_degre(dir.phi)) );
    // mv = mult( mv, rotate(dir.phi_cor, vec3()) );
    // mv = mult( mv, rotateZ(fish_look_z) );
    
   
    
    // mv =  mult(mv, translate(0.5,0.2,0.2)); // pos
    
    
    var mv_fin1 = mv;
    var mv_fin2 = mv;

    this.rotTail += this.incTail;
    if( this.rotTail > 35.0  || this.rotTail < -35.0 )
        this.incTail *= -1;

    this.rotFin1 += this.incFin1;
    if( this.rotFin1 > 35.0  || this.rotFin1 < -0.0 )
        this.incFin1 *= -1;

    this.rotFin2 += this.incFin2;
    if( this.rotFin2 > 0.0  || this.rotFin2 < -35.0 )
        this.incFin2 *= -1;

	this.gl.uniform4fv( this.colorLoc, vec4(0.2, 0.6, 0.9, 1.0) );

	// Teikna l�kama fisks (�n sn�nings) body
    // this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id_body );
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.body), this.gl.STATIC_DRAW );
    this.gl.uniformMatrix4fv(this.mvLoc, false, flatten(mv));
    this.gl.drawArrays( this.gl.TRIANGLES, 0, this.body.length );
    
    var move = this.size_body.length; // 0.5
    // Teikna spor� og sn�a honum tail
    
	mv = mult( mv, translate ( -move, 0.0, 0.0 ) );
    mv = mult( mv, rotateY( this.rotTail ) );
	mv = mult( mv, translate ( move, 0.0, 0.0 ) );
    mv = mult( mv, translate ( -move, 0.0, 0.0 ) );
    
    

    // this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id_tail );
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.tail), this.gl.STATIC_DRAW );
    this.gl.uniformMatrix4fv(this.mvLoc, false, flatten(mv));
    this.gl.drawArrays( this.gl.TRIANGLES, this.body.length, this.tail.length );
    
    //fin 1
    var move2 = 0.2
    mv_fin1 = mult( mv_fin1, translate ( move2, 0.0, 0.01 ) );
    // mv_fin1 = mult( mv_fin1, translate ( move2, 0.0, 0.0 ) );
    mv_fin1 = mult( mv_fin1, rotateY( this.rotFin1 ) );
	// mv_fin1 = mult( mv_fin1, translate ( -move2, 0.0, 0.0 ) );
    
     
    // this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id_fin );
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.fin), this.gl.STATIC_DRAW );
    this.gl.uniform4fv( this.colorLoc,  vec4(1.0, 1.0, 1.0, 1.0));
    this.gl.uniformMatrix4fv(this.mvLoc, false, flatten(mv_fin1));
    this.gl.drawArrays( this.gl.TRIANGLES, this.body.length+this.tail.length, this.fin.length );


    // fin 2
    var move2 = -0.2
   
    mv_fin2 = mult( mv_fin2, translate ( -move2, 0.0, 0.0 ) );
    mv_fin2 = mult( mv_fin2, rotateY( this.rotFin2 ) );
	mv_fin2 = mult( mv_fin2, translate ( move2, 0.0, 0.0 ) );
    mv_fin2 = mult( mv_fin2, translate ( -move2, 0.0, -0.01 ) );
    
    // this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id_fin );
    
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.fin), this.gl.STATIC_DRAW );
    this.gl.uniform4fv( this.colorLoc,  vec4(1.0, 1.0, 1.0, 1.0));
    this.gl.uniformMatrix4fv(this.mvLoc, false, flatten(mv_fin2));
    this.gl.drawArrays( this.gl.TRIANGLES, this.body.length+this.tail.length, this.fin.length );

   
    // window.requestAnimationFrame(render);
    // requestAnimFrame( render );
    }
}