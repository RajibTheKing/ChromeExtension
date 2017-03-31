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
var minW=640;
var minH=480;
var maxW=640;
var maxH=480;
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

function handleSuccess(stream)
{
	console.log("TheKing--> Now I just Found getUserMedia() = ", stream);
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