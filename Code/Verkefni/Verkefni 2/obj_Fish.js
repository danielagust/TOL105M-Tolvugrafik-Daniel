export default class Car extends obj_Parent_Char{
    /**
     * 
     * @param {vec2} size 
     * @param {float} width_screen_end 
     * @param {vec2} pos 
     */
    constructor(size, width_screen_end, pos){
        var temp_points = [];
        var half_width = size[0]/2;
        var half_height = size[1]/2;

       
        
        
        super(temp_points, size, pos); // sent to parent

        this.body = [
            // l�kami (spjald)
            vec4( -0.5,  0.0, 0.0, 1.0 ),
            vec4(  0.2,  0.2, 0.0, 1.0 ),
            vec4(  0.5,  0.0, 0.0, 1.0 ),
            vec4(  0.5,  0.0, 0.0, 1.0 ),
            vec4(  0.2, -0.15, 0.0, 1.0 ),
            vec4( -0.5,  0.0, 0.0, 1.0 )
            // spor�ur (�r�hyrningur)
            
        ];
        this.fin = [
            vec4( -0.5,  0.0, 0.0, 1.0 ),
            vec4( -0.65,  0.15, 0.0, 1.0 ),
            vec4( -0.65, -0.15, 0.0, 1.0 )
        ]
        
       
        // this.position = pos;
        // this.points = temp_points;
        

        
        this.width_screen_end = width_screen_end;
        
        
    }

    set_webstuff(gl, program){
        this.gl = gl;
        
        this.id_body = gl.createBuffer();
        this.gl.bindBuffer( gl.ARRAY_BUFFER, this.id_body );
        
        this.id_fin = gl.createBuffer();
        this.gl.bindBuffer( gl.ARRAY_BUFFER, this.id_fin );

        this.id_tail = gl.createBuffer();
        this.gl.bindBuffer( gl.ARRAY_BUFFER, this.id_tail);
        
        
        this.program = program;

        // this.bufferId2 = this.gl.createBuffer();
        // this.gl.bindBuffer(  this.gl.ARRAY_BUFFER, bufferId2 );
        this.vPosition = gl.getAttribLocation( program, "vPosition" );
        this.colorLoc = gl.getUniformLocation( program, "fColor" );
    }
}