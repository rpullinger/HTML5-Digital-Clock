$(document).ready(function() {		     
     // Get Canvas & Context
     var canvas = document.getElementById('clockCanvas');
	 var ctx = canvas.getContext('2d');     
	 
	 var audioBeep = document.getElementById('alarmBeep');      
   
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
             if (alarmClock.status == "alarm"){
                 // Play Beep
                 audioBeep.play();    
             }                   
        }, 1000); 
    
    // Set Alarm
    $('#setAlarm').click(function(){
        alarmClock.alarmTime = $('#alarmTime').val();
        audioBeep.play();
        return false;
    }); 
    
    
    
    
      
});      

