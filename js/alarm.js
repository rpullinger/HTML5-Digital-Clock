/**
  * Alarm
  *
  * @author Richard Pullinger
  */
 
 /**
  * @constructor
  */
 function alarm(x, y, size, pointSize, onColor, offColor, ctx){
    this.alarmHour = 12;
    this.alarmMin = 0;
    this.status = "clock"; // clock / alarm /set
    this.alarmStatus = "off" // on / off / snoozed
      
    var hours = 12,
          mins = 0,
          secs = 0,
          margin = pointSize,
          spacing = pointSize / 2,
          width = size + pointSize * 2 + margin;    
    
    
    /**
     * Draw Clock onto the canvas
     */       
    this.draw = function(){                   
        
        var time = new Date(); 
        // Get numbers within the time    
        hours = time.getHours();
        mins = time.getMinutes();
        secs = time.getSeconds();        
        
        // Add 0 if time is single figure
        hours = hours.toString().length < 2 ? "0" + hours : hours.toString();
        mins = mins.toString().length < 2 ? "0" + mins : mins.toString();
        var alarmHours = this.alarmHour.toString().length < 2 ? "0" + this.alarmHour : this.alarmHour.toString();
        var alarmMins = this.alarmMin.toString().length < 2 ? "0" + this.alarmMin: this.alarmMin.toString();
        
        // check if alarm should be going
        if(alarmHours === hours && alarmMins === mins && this.status != "set" && this.alarmStatus === "on"){
            this.status = "alarm";
        }else if(this.alarmStatus === "off"){
            this.status = "clock";
        }
        
        // set alarm
        if(this.status === "set"){
            this.drawNumber(alarmHours.substring(0,1), 0);
            this.drawNumber(alarmHours.substring(1,2), width);                    
            this.drawNumber(alarmMins.substring(0,1), width * 3);
            this.drawNumber(alarmMins.substring(1,2), width * 4);
            this.drawSeperator(true, width * 2);
        }
        else{ 
            // Draw Time
            this.drawNumber(hours.substring(0,1), 0);
            this.drawNumber(hours.substring(1,2), width);                    
            this.drawNumber(mins.substring(0,1), width * 3);
            this.drawNumber(mins.substring(1,2), width * 4);
            
            // Draw Seperator             
            var seperatorOn = secs % 2 === 0 ? true : false;   
            this.drawSeperator(seperatorOn, width * 2);
        }
        
       
        
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
        this.drawDigitalClockPart(size, pointSize, offset + x, y, numberArray[number][0]);  // Top bar                
        this.drawDigitalClockPart(pointSize, size, offset + x - spacing, y + spacing, numberArray[number][1]);  // Top left Bar               
        this.drawDigitalClockPart(size, pointSize, offset + x, y + size + spacing * 2, numberArray[number][2]);  // Middle bar
        this.drawDigitalClockPart(pointSize, size, offset + x + spacing + size, y + spacing, numberArray[number][3]);  // Top right Bar        
        this.drawDigitalClockPart(pointSize, size, offset + x - spacing, y + size + spacing * 3, numberArray[number][4]);  // Bottom left Bar               
        this.drawDigitalClockPart(size, pointSize, offset + x, y + size * 2 + spacing * 4, numberArray[number][5]);  // Bottom bar
        this.drawDigitalClockPart(pointSize, size, offset + x + spacing + size, y + size + spacing * 3, numberArray[number][6]);  // Bottom right Bar       
    };       
    
    this.drawSeperator = function(on, offset){
        ctx.fillStyle = this.getColor(on);        
        // Draw the two separator squares
        if(on){
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.getColor(on);
        }else{
            ctx.shadowBlur = 0;
            ctx.shadowColor = this.getColor(false);
        }
        
        var horzOffset = x + offset + (width / 2) - (pointSize* 2);        
        ctx.fillRect(horzOffset, y + width / 2  - pointSize / 2, pointSize, pointSize);
        ctx.fillRect(horzOffset, y + width +  pointSize / 2, pointSize, pointSize);
    };
    
    /**
     * Draws a single part of the digital display
     */
    this.drawDigitalClockPart = function(width, height, x, y, on){
        // Could this. be drawn easier with two triangles and a rectangle?
        ctx.fillStyle = this.getColor(on); 
        
        // Flash on/off if alarmed
        if (this.status === "alarm"){
            // Only blur if section is turned on.                        
            var alarming = secs % 2 === 0 ? true : false; 
            ctx.shadowBlur = on ? 50 : 0;
            ctx.shadowColor = this.getColor(on ? alarming : false);
            ctx.fillStyle = this.getColor(on ? alarming : false);        
        } else{
            // Only blur if section is turned on.
            ctx.shadowBlur = on ? 20 : 0 ;
            ctx.shadowColor = this.getColor(on);      
        }
        
        ctx.beginPath();  
        ctx.moveTo(x, y);   
        // Draw the pointed ends in the right place based on vertical or horizontal
        if (width > height){
            ctx.lineTo(x + height/2, y + height/2);  
            ctx.lineTo(x + width - height/2, y + height/2);  
            ctx.lineTo(x + width, y);  
            ctx.lineTo(x + width - height/2, y - height/2);  
            ctx.lineTo(x + height/2, y - height/2);  
        }
        else{    
            ctx.lineTo(x + width/2, y + width/2);  
            ctx.lineTo(x + width/2, y + height - width/2);  
            ctx.lineTo(x, y + height);  
            ctx.lineTo(x - width/2, y + height - width/2);  
            ctx.lineTo(x - width/2, y + width/2); 
        }
        ctx.closePath();             
        ctx.fill();  
    };
    
    /**
     * Returns the on/off color 
     */
    this.getColor = function(on){
        return on ? onColor : offColor;
    };
}