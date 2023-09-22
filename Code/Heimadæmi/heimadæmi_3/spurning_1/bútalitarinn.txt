    precision mediump float;
    uniform vec4 rcolor;
    uniform float time;
    void
    main()
    {
        float temp = 2.5;
        float pi = radians(180.0);
        float time_sec = time*0.001;
        float r =  (sin(time_sec)+0.0)/temp;
        float g =  (sin(time_sec+pi)+1.0)/temp;
        float b =  (sin(time_sec+2.0*pi)+1.0)/temp;
        float a =  (sin(time_sec+pi)+1.0)/temp;

        gl_FragColor = vec4(r, g, b, a);
    }