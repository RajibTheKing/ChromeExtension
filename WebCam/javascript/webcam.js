
var video = document.querySelector("#directData");

var streamGlobal ;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) 
{       
	navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) 
{
	streamGlobal = stream;
	console.log("Inside handle video");
	video.src = window.URL.createObjectURL(stream);
	//document.getElementById('videoElement').src = window.URL.createObjectURL(stream);
	console.log(stream.id);
	console.log(video);

}

function videoError(e) 
{
	// do something
}	
