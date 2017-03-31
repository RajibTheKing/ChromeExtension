// initialize your variables outside the function 
var count = 0; 
var clearTime; 
var milliseconds = 0, seconds = 0, minutes = 0, hours = 0; 
var clearState; 
var secs, mins, gethours ,mscns;

function startWatch( ) 
{ 
	/* check if Milliseconds is equal to 1000 and add a +1 to seconds, and set milliseconds to 0 */
	if(milliseconds >= 1000)
	{
		milliseconds = 0;
		seconds = seconds + 1;
	}
	/* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */ 
	if ( seconds === 60 ) 
	{ 
		seconds = 0; 
		minutes = minutes + 1; 
	} 
	/* you use the javascript tenary operator to format how the minutes should look and add 0 to minutes if less than 10 */ 
	mins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); 
	/* check if minutes is equal to 60 and add a +1 to hours set minutes to 0 */ 
	if ( minutes === 60 ) 
	{ 
		minutes = 0; 
		hours = hours + 1; 
	} 
	/* you use the javascript tenary operator to format how the hours should look and add 0 to hours if less than 10 */ 
	gethours = ( hours < 10 ) ? ( '0' + hours + ': ' ) : ( hours + ': ' ); 
	secs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds );

	if(milliseconds<10)
		mscns = ': 00' + milliseconds;
	else if(milliseconds<100)
		mscns = ': 0' + milliseconds;
	else
		mscns = ': ' + milliseconds;
	// display the stopwatch 

	var x = document.getElementById("timer"); x.innerHTML = 'Time: ' + gethours + mins + secs + mscns; 
	/* call the seconds counter after displaying the stop watch and increment seconds by +1 to keep it counting */ 
	milliseconds+=10;
	
	/* call the setTimeout( ) to keep the stop watch alive ! */ 
	//clearTime = setTimeout( "startWatch()", 10); 
	
	clearTime = setTimeout( function() { startWatch(); }, 12); 
} // startWatch( ) 


//create a function to start the stop watch 
function startTime( )
{ 
 	/* check if seconds, minutes, and hours are equal to zero and start the stop watch */ 
	if ( seconds === 0 && minutes === 0 && hours === 0 ) 
	{
		/* hide the fulltime when the stop watch is running */ 
		var fulltime = document.getElementById( "fulltime" ); 
		fulltime.style.display = "none";
		/* call the startWatch( ) function to execute the stop watch whenever the startTime( ) is triggered */ 
		startWatch( ); 
	} // if () 
} // startTime() 

/* you need to bind the startTime( ) function to any event type to keep the stop watch alive ! */
/*
window.addEventListener( 'load', function ()
{ 
	var start = document .getElementById("start"); 
	start.addEventListener( 'click', startTime ); 
}); // startwatch.js end 
*/