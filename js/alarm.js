 /**
  * Alarm
  *
  * @author Richard Pullinger
  */
 
 /**
  * @constructor
  */
 function alarm(x, y, size, pointSize, onColor, offColor, ctx){
    this.x = x;
    this.y = y;
    this.size = size;
    this.pointSize = pointSize;
    this.onColor = onColor;
    this.offColor = offColor;
    this.spacing = this.pointSize / 2;  
    this.margin = this.pointSize;
    this.width = this.size + this.pointSize * 2 + this.margin; 
    this.ctx = ctx; 
    this.alarmTime = "1141"; 
    this.status = "clock";
    this.hour = 12;
    this.mins = 0;
    this.secs = 0; 
    
    /**
     * Draw Clock onto the canvas
     */       
    this.draw = function(){                   
        
        var time = new Date(); 
        // Get numbers within the time    
        this.hours = time.getHours().toString();
        this.mins = time.getMinutes().toString();
        this.secs = time.getSeconds();
        // Add 0 if time is single figure
        this.hours = this.hours.length < 2 ? 0 + this.hours : this.hours;
        this.mins = this.mins.length < 2 ? 0 + this.mins : this.mins;
        
        // check if alarm should be going
        if(this.alarmTime == this.hours + this.mins){
            this.status = "alarm";
        } else{
            this.status = "clock";
        }
               
        // Draw Time
        this.drawNumber(this.hours.substring(0,1), this.width);
        this.drawNumber(this.hours.substring(1,2), this.width * 2);                    
        this.drawNumber(this.mins.substring(0,1), this.width * 4);
        this.drawNumber(this.mins.substring(1,2), this.width * 5);
        
        // Draw Seperator
        var seperatorOn = this.secs % 2 == 0 ? true : false;   
        this.drawSeperator(seperatorOn, this.width * 3);
    };       
    
    /**
     * Draw a single digital section
     */
    this.drawNumber = function(number, offset) {         
         
        // Array of on / off of sections to create numbers
        var numberArray = [
                                             [true, true, false, true, true, true, true],
                                             [false, true, false, false, true, false, false],
                                             [true, false, true, true, true, true, false],
                                             [true, false, true, true, false, true, true],
                                             [false, true, true, true, false, false, true],
                                             [true, true, true, false, false, true, true],
                                             [false, true, true, false, true, true, true],
                                             [true, false, false, true, false, false, true],
                                             [true, true, true, true, true, true, true],
                                             [true, true, true, true, false, false, true]
                                            ];      
                                            
        // Draw the separate pieces
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y, numberArray[number][0]);  // Top bar                
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x - this.spacing, this.y + this.spacing, numberArray[number][1]);  // Top left Bar               
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y + this.size + this.spacing * 2, numberArray[number][2]);  // Middle bar
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x + this.spacing + this.size, this.y + this.spacing, numberArray[number][3]);  // Top right Bar        
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x - this.spacing, this.y + this.size + this.spacing * 3, numberArray[number][4]);  // Bottom left Bar               
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y + this.size * 2 + this.spacing * 4, numberArray[number][5]);  // Bottom bar
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x + this.spacing + this.size, this.y + this.size + this.spacing * 3, numberArray[number][6]);  // Bottom right Bar       
    };       
    
    this.drawSeperator = function(on, offset){
        ctx.fillStyle = this.getColor(on);        
        // Draw the two separator squares
        if(on){
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.getColor(on);
        }else{
            this.ctx.shadowBlur = 0;
            this.ctx.shadowColor = this.getColor(false);
        }
        
        var horzOffset = this.x + offset + (this.width / 2) - (this.pointSize* 2);        
        ctx.fillRect(horzOffset, this.y + this.width / 2  - this.pointSize / 2, this.pointSize, this.pointSize);
        ctx.fillRect(horzOffset, this.y + this.width +  this.pointSize / 2, this.pointSize, this.pointSize);
    };
    
    /**
     * Draws a single part of the digital display
     */
    this.drawDigitalClockPart = function(width, height, x, y, on){
        // Could this be drawn easier with two triangles and a rectangle?
        this.ctx.fillStyle = this.getColor(on); 
        
        // Flash on/off if alarmed
        if (this.status == "alarm"){
            // Only blur if section is turned on.
            if(on){
                var alarming = this.secs % 2 == 0 ? true : false; 
                this.ctx.shadowBlur = 50;
                this.ctx.shadowColor = this.getColor(alarming);
                this.ctx.fillStyle = this.getColor(alarming);
            }else{
                this.ctx.shadowBlur = 0;
                this.ctx.shadowColor = this.getColor(false); 
            }
        } else{
            // Only blur if section is turned on.
            if(on){
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = this.getColor(on);
            }else{
                this.ctx.shadowBlur = 0;
                this.ctx.shadowColor = this.getColor(false);
            }
        }
        
        this.ctx.beginPath();  
        this.ctx.moveTo(x, y);   
        // Draw the pointed ends in the right place based on vertical or horizontal
        if (width > height){
            this.ctx.lineTo(x + height/2, y + height/2);  
            this.ctx.lineTo(x + width - height/2, y + height/2);  
            this.ctx.lineTo(x + width, y);  
            this.ctx.lineTo(x + width - height/2, y - height/2);  
            this.ctx.lineTo(x + height/2, y - height/2);  
        }
        else{    
            this.ctx.lineTo(x + width/2, y + width/2);  
            this.ctx.lineTo(x + width/2, y + height - width/2);  
            this.ctx.lineTo(x, y + height);  
            this.ctx.lineTo(x - width/2, y + height - width/2);  
            this.ctx.lineTo(x - width/2, y + width/2); 
        }
        this.ctx.closePath();             
        this.ctx.fill();  
    };
    
    /**
     * Returns the on/off color 
     */
    this.getColor = function(on){
        return on ? this.onColor : this.offColor;
    };
}