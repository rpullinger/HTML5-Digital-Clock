$(document).ready(function() {		     
     // Get Canvas & Context
     var canvas = document.getElementById("clockCanvas");
	 var ctx = canvas.getContext("2d");            
   
     // Initialize Settings            
     var x = 10, 
         y = 10, 
         size = 100, 
         pointSize = 10;
     
     var alarmClock = new alarm(x, y, size, pointSize, "rgb(255, 0, 0)", "rgb(0, 0, 0)",  ctx);     
     
     //Set interval and Draw Alarm     
     setInterval(function(){
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             alarmClock.draw();                    
        }, 1000);    
});      
 
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
    this.time = function(){        
        var time = new Date();           
        // get numbers from time
        var hours = time.getHours().toString();
        var mins = time.getMinutes().toString();
        var secs = time.getSeconds();
        // Add 0 if time is single figure
        hours = hours.length < 2 ? 0 + hours : hours;
        mins = mins.length < 2 ? 0 + mins : mins;
        return [hours.substring(0,1), hours.substring(1,2), mins.substring(0,1), mins.substring(1,2), secs];
    };
        
    this.draw = function(){                   
        // Get numbers within the time    
        var timeNumber = this.time();                
        // Draw Time
        this.drawNumber(timeNumber[0], this.width);
        this.drawNumber(timeNumber[1], this.width * 2);                    
        this.drawNumber(timeNumber[2], this.width * 4);
        this.drawNumber(timeNumber[3], this.width * 5);
        
        // Draw Seperator
        var sepOn = timeNumber[4] % 2 == 0 ? true : false;   
        this.drawSeperator(sepOn, this.width * 3);
    };       
    
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
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y, this.getColor(numberArray[number][0]));  // Top bar                
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x - this.spacing, this.y + this.spacing, this.getColor(numberArray[number][1]));  // Top left Bar               
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y + this.size + this.spacing * 2, this.getColor(numberArray[number][2]));  // Middle bar
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x + this.spacing + this.size, this.y + this.spacing, this.getColor(numberArray[number][3]));  // Top right Bar        
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x - this.spacing, this.y + this.size + this.spacing * 3, this.getColor(numberArray[number][4]));  // Bottom left Bar               
        this.drawDigitalClockPart(this.size, this.pointSize, offset + this.x, this.y + this.size * 2 + this.spacing * 4, this.getColor(numberArray[number][5]));  // Bottom bar
        this.drawDigitalClockPart(this.pointSize, this.size, offset + this.x + this.spacing + this.size, this.y + this.size + this.spacing * 3, this.getColor(numberArray[number][6]));  // Bottom right Bar       
    };       
    
    this.drawSeperator = function(on, offset){
        ctx.fillStyle = this.getColor(on);        
        // Draw the two separator squares
        var horzOffset = this.x + offset + (this.width / 2) - (this.pointSize* 2);
        
        ctx.fillRect(horzOffset, this.y + this.width / 2 - this.pointSize / 2, this.pointSize, this.pointSize);
        ctx.fillRect(horzOffset, this.y + this.width +  this.pointSize / 2, this.pointSize, this.pointSize);
    };
    
    this.drawDigitalClockPart = function(width, height, x, y, color){
        this.ctx.fillStyle = color; 
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

    this.getColor = function(on){
        return on ? this.onColor : this.offColor;
    };
}
