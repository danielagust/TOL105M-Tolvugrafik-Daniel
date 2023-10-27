class obj_Color{
    constructor(type){
        this.type = type;
        
        this.r_1;
        this.g_1;
        this.b_1;
        this.a_1;

        this.r_255;
        this.g_255;
        this.b_255;
        this.a_255;

        this.hex;
        this.hex_alpha;

    }

    hex_color(hex){
        
        if(this.#isValidHexaCode(hex)){
            console.log(this.#isValidHexaCode(hex))
            this.hex = hex;
            // this.hex_alpha = alpha
            
            var hex_split = this.#chunkString(hex, 1, 2) 
            if (hex_split.length == 4){
                this.hex_alpha = hex_split[3]
            }
            console.log(hex_split)
            this.#make_rgb_255(hex_split);
            // console.log(this.#decimalToHex(255))
            
        }
        
        
    }

    #make_rgb_255(hex_split){
        var r_255 = this.#hexToDecimal(hex_split[0])
        var g_255 = this.#hexToDecimal(hex_split[1])
        var b_255 = this.#hexToDecimal(hex_split[3])

        console.log(r_255)
    }

    #has_alpha(hex_split){
        return hex_split.length == 4
    }

    #hexToDecimal(hex){
        return parseInt(hex, 16);
    }

    #decimalToHex(decimal){
        return decimal.toString(16);
    }

    #chunkString(str,start, length) {
        str = str. substring(start)
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }

    #isValidHexaCode(str) {
        // Regex to check valid
        // hexadecimalColor_code  
        let regex = new RegExp(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/);
     
        // if str 
        // is empty return false
        if (str == null) {
            return false;
        }
     
        // Return true if the str
        // matched the ReGex
        if (regex.test(str) == true) {
            return true;
        }
        else {
            return false;
        }
    }
     
}

var test =  new obj_Color(1);
test.hex_color("#1F99CC");
