$(document).ready(function() {		     
     // Get Canvas & Context
     var canvas = document.getElementById("clockCanvas");
	var ctx = canvas.getContext("2d");            
   
     // Initialize Settings            
     onColor = "rgb(255, 0, 0)",  offColor = "rgb(0, 0, 0)";
     var x = 10, 
         y = 10, 
         size = 100, 
         pointSize = 10, 
         spacing = pointSize/2, 
         color = "rgb(255, 0, 0)";
     
     // Set interval and Draw Alarm
     setInterval(function(){
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             drawAlarm(x, y, size, pointSize, ctx);                     
         }, 1000);         
});      
 
// Draws the whole alarm
function drawAlarm(x, y, size, pointSize, ctx){             
    var time = new Date();   
    var margin = 10;
    var width = size + pointSize * 2 + margin;
    
    // get numbers from time
    var hours = time.getHours().toString();
    var mins = time.getMinutes().toString();            
    
    // Add 0 if time is single figure
    hours = hours.length < 2 ? 0 + hours : hours;
    mins = mins.length < 2 ? 0 + mins : mins;
    
    // Use Seconds to flash seperator
    var sepOn = time.getSeconds() % 2 == 0 ? true : false;   
    
    // Draw Time
    drawNumber(x, y, size, pointSize, hours.substring(0, 1), ctx);
    drawNumber(x + width, y, size, pointSize, hours.substring(1,2), ctx);            
    drawSeperator(x + width * 2, y, width, pointSize, ctx, sepOn);
    drawNumber(x + width * 3, y, size, pointSize, mins.substring(0,1), ctx);
    drawNumber(x + width * 4, y, size, pointSize, mins.substring(1,2), ctx);
     
    //// Draw all the numbers for testing
    //drawNumber(x, y, size, pointSize, 0, ctx);
    //drawNumber(x + width, y, size, pointSize, 1, ctx);
    //drawNumber(x + width * 2, y, size, pointSize, 2, ctx);
    //drawNumber(x + width * 3, y, size, pointSize, 3, ctx);
    //drawNumber(x + width * 4, y, size, pointSize, 4, ctx);
    //drawNumber(x + width * 5, y, size, pointSize, 5, ctx);
    //drawNumber(x + width * 6, y, size, pointSize, 6, ctx);
    //drawNumber(x + width * 7, y, size, pointSize, 7, ctx);
    //drawNumber(x + width * 8, y, size, pointSize, 8, ctx);
    //drawNumber(x + width * 9, y, size, pointSize, 9, ctx);            
}

// Draws a number in the alarm style   
function drawNumber(x, y, size, pointSize, number, ctx){
    
    var spacing = pointSize / 2;    
    
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
    drawDigitalClockPart(size, pointSize, x, y, getColor(numberArray[number][0]), ctx);  // Top bar                
    drawDigitalClockPart(pointSize, size, x - spacing, y + spacing, getColor(numberArray[number][1]), ctx);  // Top left Bar               
    drawDigitalClockPart(size, pointSize, x, y + size + spacing * 2, getColor(numberArray[number][2]), ctx);  // Middle bar
    drawDigitalClockPart(pointSize, size, x + spacing + size, y + spacing, getColor(numberArray[number][3]), ctx);  // Top right Bar        
    drawDigitalClockPart(pointSize, size, x - spacing, y + size + spacing * 3, getColor(numberArray[number][4]), ctx);  // Bottom left Bar               
    drawDigitalClockPart(size, pointSize, x, y + size * 2 + spacing * 4, getColor(numberArray[number][5]), ctx);  // Bottom bar
    drawDigitalClockPart(pointSize, size, x + spacing + size, y + size + spacing * 3, getColor(numberArray[number][6]), ctx);  // Bottom right Bar
}

// Draw the seperator
function drawSeperator(x, y, width, pointSize, ctx, on){
          ctx.fillStyle = getColor(on);
          ctx.fillRect(x + (width / 2) - (pointSize* 2), y + width / 2 - pointSize / 2 , pointSize, pointSize);
          ctx.fillRect(x + (width / 2) - (pointSize* 2), y + width, pointSize, pointSize);
}

// Draws a single part of the alarm clock
function drawDigitalClockPart(width, height, x, y, color, ctx){
    ctx.fillStyle = color; 
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
}

// returns the on / off color 
function getColor(on)
{
    return on ? onColor : offColor;
}