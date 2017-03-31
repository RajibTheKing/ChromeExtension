'use strict';


var mediaSource = new MediaSource();
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

mediaSource.addEventListener('sourceopen', handleSourceOpen, false);


var directDataVideo = document.querySelector('video#directData');
var recordedDataVideo = document.querySelector('video#storedData');
var statusBar = document.getElementById('status');

//var constraints = {audio:true, video:true};
var minW=2;
var minH=2;
var maxW=2560;
var maxH=1440;

var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log("TheKin--> supported constraints = " , supportedConstraints);


var constraints= {
 "audio": true,
 "video": {
  "mandatory": {
   "minWidth": minW,
   "minHeight": minH,
   "maxWidth": maxW,
   "maxHeight": maxH
  },
  "optional": []
 }
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);


var ResolutionsToCheck = [
	            {width: 160, height:120},
	            {width: 320, height:180},
	            {width: 320, height:240},
	            {width: 640, height:360},
	            {width: 640, height:480},
	            {width: 768, height:576},
	            {width: 1024, height:576},
	            {width: 1280, height:720},
	            {width: 1280, height:768},
	            {width: 1280, height:800},
	            {width: 1280, height:900},
	            {width: 1280, height:1000},
	            {width: 1920, height:1080},
	            {width: 1920, height:1200},
	            {width: 2560, height:1440},
	            {width: 3840, height:2160},
	            {width: 4096, height:2160}
            ];

var left = 0;
var right = ResolutionsToCheck.length;
var selectedWidth;
var selectedHeight;
var mid;

function FindMaximum_WidthHeight_ForCamera()
{
	console.log("TheKing--> left:right = ", left, ":", right);
	if(left > right)
	{
		console.log("TheKing--> Selected Height:Width = ", selectedWidth, ":", selectedHeight);
		return;
	}

	mid = Math.floor((left + right) / 2);

	var temporaryConstraints = {
	 	"audio": true,
	 	"video": {
	  		"mandatory": {
	   		"minWidth": ResolutionsToCheck[mid].width,
	   		"minHeight": ResolutionsToCheck[mid].height,
	   		"maxWidth": ResolutionsToCheck[mid].width,
	   		"maxHeight": ResolutionsToCheck[mid].height
	  		},
	  	"optional": []
	 	}
	}

	navigator.mediaDevices.getUserMedia(temporaryConstraints).then(checkSuccess).catch(checkError);
}

function checkSuccess(stream)
{
	console.log("Success for --> " , mid , " ", ResolutionsToCheck[mid]);
	selectedWidth = ResolutionsToCheck[mid].width;
	selectedHeight = ResolutionsToCheck[mid].height;

	left = mid+1;
	
	for (let track of stream.getTracks()) 
	{ 
        track.stop()
    }

	FindMaximum_WidthHeight_ForCamera();
}
function checkError(error)
{
	console.log("Failed for --> " + mid , " ", ResolutionsToCheck[mid],  " ", error);
	right = mid-1;

	FindMaximum_WidthHeight_ForCamera();
}



function handleSuccess(stream)
{
	//console.log("TheKing--> Now I just Found getUserMedia() = ", stream);
	recordButton.disabled = false;
	window.stream = stream;
	if(window.URL)
	{
		directDataVideo.src = window.URL.createObjectURL(stream);
	}
	else
	{
		directDataVideo.src = stream;
	}

}

function handleError(error) 
{
  console.log('TheKing--> Now Error in getUserMedia =  ', error);
  
  showStatus("Error In getUserMedia, Message = "+error.name);


}


function handleSourceOpen(event)
{
	console.log('TheKing--> MediaSource is now Open');
	sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
}

function handleDataAvailable(event) 
{
  if (event.data && event.data.size > 0) 
  {
  	/*
  	
  	console.log("TheKing--> Got new Data ", event.data.size, event.data);
  	var dataString = "";
  	for(var i=0; i<20; i++)
  	{
  		dataString += event.data[i];
  	}
  	console.log("TheKing--> DataBytes: ", dataString);

  	*/
  	recordedBlobs.push(event.data);
  }
}

function handleStop(event) 
{
  console.log('TheKing--> Recorder stopped: ', event);
}


var recordButton = document.querySelector('button#startRecording');
var playButton = document.querySelector('button#startPlaying');
var downloadButton = document.querySelector('button#startDownloading');

recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;

function toggleRecording()
{
	if(recordButton.textContent === 'Record')
	{
		recordButton.textContent = 'Stop Recording';
		playButton.disabled = true;
		downloadButton.disabled = true;
		
		playButton.style.visibility = 'hidden';
		downloadButton.style.visibility = 'hidden';

		startRecording();
	}
	else
	{
		recordButton.textContent = 'Record';
		playButton.disabled = false;
		downloadButton.disabled = false;

		playButton.style.visibility = 'visible';
		downloadButton.style.visibility = 'visible';

		stopRecording();

	}
}

function startRecording()
{
	//FindMaximum_WidthHeight_ForCamera();
	//return;

	startTime();
	showStatus("Recording started.....");
	recordedBlobs = [];
	var options = {mimeType: 'video/webm;codecs=vp9'};
	mediaRecorder = new MediaRecorder(window.stream, options);
	mediaRecorder.onstop = handleStop;
	mediaRecorder.ondataavailable = handleDataAvailable;
	mediaRecorder.start(10); //Each time get 10ms of [audio+video] data
	console.log('TheKing--> MediaRecorder started = ', mediaRecorder);
}

function stopRecording() 
{
	stopTime();
	showStatus("Stopped Recording.");
	mediaRecorder.stop();
	console.log('TheKing--> Recorded Blobs: ', recordedBlobs);
	recordedDataVideo.controls = true;
}



function play() 
{
	showStatus("Now trying to play Recorded Video");
	var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
	recordedDataVideo.src = window.URL.createObjectURL(superBuffer);

}

function download()
{
	showStatus("Downloading Media to local data storage");
	console.log('TheKing--> Now I am trying to Download Recorded Data');
	var blob = new Blob(recordedBlobs, {type: 'video/webm'});
	var url = window.URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = 'test.webm';
	document.body.appendChild(a);
	a.click();
	
	setTimeout(function() {
    	document.body.removeChild(a);
    	window.URL.revokeObjectURL(url);
  	}, 100);
}

function showStatus(textToShow)
{
	statusBar.innerHTML = "Status: " + textToShow;
}