export class obj_Fish_Tank{
    constructor(size, pos){
    var lenght = size.lenght;
    var height = size.height;
    var width = size.width;

    this.points_all = [
        vec3( -lenght, -height,  width ),
        vec3( -lenght,  height,  width ),
        vec3(  lenght,  height,  width ),
        vec3(  lenght, -height,  width ),
        vec3( -lenght, -height, -width ),
        vec3( -lenght,  height, -width ),
        vec3(  lenght,  height, -width ),
        vec3(  lenght, -height, -width )
    ];
    this.pos = pos;
    }

    set_webstuff(gl, program){
        this.gl = gl;
        var proLoc = this.gl.getUniformLocation( program, "projection" );
        var proj = perspective( 90.0, 1.0, 0.1, 100.0 );
        this.gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    
        this.vBuffer2 = this.gl.createBuffer();
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vBuffer2 );
    
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

    render(mv){
        // console.log(dir.x);
    // this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points_all), this.gl.STATIC_DRAW );

    // var mv = lookAt( vec3(0.0, 0.0, this.zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    // mv = mult( mv, rotateX(spinX) );
    // mv = mult( mv, rotateY(spinY) );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points_all), this.gl.STATIC_DRAW );

    
    mv = mult(mv, translate(this.pos.position3d_to_vec))
    // // mv = mult(mv, translate(this.get_ofset())) // move to center
    // // mv = mult( mv, rotateX(Helper.angle_to_degre(dir.yaw)) );
    // if (radians(this.dir_allowed.yaw.yaw_max)> this.dir.yaw && radians(this.dir_allowed.yaw.yaw_min) < this.dir.yaw){
    //     mv = mult( mv, rotateZ(Helper.angle_to_degre(this.dir.yaw)) );
    // }
    
    
    
    // mv = mult( mv, rotateY(Helper.angle_to_degre(this.dir.pitch)) );
    

	this.gl.uniform4fv( this.colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );

	// Teikna l�kama fisks (�n sn�nings) body
    // this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id_body );
    // this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.body), this.gl.STATIC_DRAW );
    this.gl.uniformMatrix4fv(this.mvLoc, false, flatten(mv));
    this.gl.drawArrays( this.gl.TRIANGLES, 0, this.points_all.length);

   
    }
}

