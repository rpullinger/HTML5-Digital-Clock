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
         
    var alarmClock = new alarm(x, y, size, pointSize, "rgb(255, 0, 0)", "rgb(10, 10, 10)",  ctx);          
    
    
    
    var setting = "hours";
    // Pick up keypresses 
    $(document).keydown(function(e) {
        if (alarmClock.status == "set"){
            switch(e.which){
                case 38:	
            	    if (setting == "hours"){
        		        alarmClock.alarmHour = alarmClock.alarmHour == 24 ? 0 : alarmClock.alarmHour + 1;
        		    }else{
         		        alarmClock.alarmMin = alarmClock.alarmMin == 59 ? 0 : alarmClock.alarmMin + 1;
               		    }  
          		    break;
          	    case 40:	
          	        if (setting == "hours"){
          	            alarmClock.alarmHour = alarmClock.alarmHour == 0 ? 24 : alarmClock.alarmHour - 1;
          	        }else{
          	    	    alarmClock.alarmMin = alarmClock.alarmMin == 0 ? 59 : alarmClock.alarmMin - 1;
          	    	}  
          	    	break;
            	case 37:
            	    setting = setting == "mins" ? "hours" : "mins";
        		    break;
        		case 39:
        		    setting = setting == "mins" ? "hours" : "mins";
        		    break;
            }
        }
          
    });
    
    var i = 0;
    //Set interval and Draw Alarm     
    setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        alarmClock.draw();  
        if (alarmClock.status == "alarm" && i == 0){
                // Play Beep
                audioBeep.play();   
            }  
        i = i > 8 ? 0 : i + 1;        
    }, 100); 
        
    
    // Set Alarm
    $('#setAlarm').click(function(){
        alarmClock.status = alarmClock.status == "set" ? "clock" : "set";
    });
    

    
        
});      

