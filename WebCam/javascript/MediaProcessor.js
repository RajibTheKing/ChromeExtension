'use strict';


var mediaSource = new MediaSource();
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

mediaSource.addEventListener('sourceopen', handleSourceOpen, false);


var directDataVideo = document.querySelector('video#directData');
var recordedDataVideo = document.querySelector('video#storedData');


var constraints = {audio:true, video:true};

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
}


function handleSourceOpen(event)
{
	console.log('TheKing--> MediaSource is now Open');
	sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}

function handleDataAvailable(event) 
{
  if (event.data && event.data.size > 0) 
  {
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
		startRecording();
	}
	else
	{
		recordButton.textContent = 'Record';
		playButton.disabled = false;
		downloadButton.disabled = false;
		stopRecording();
	}
}

function startRecording()
{
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
	mediaRecorder.stop();
	console.log('TheKing--> Recorded Blobs: ', recordedBlobs);
	recordedDataVideo.controls = true;
}



function play() 
{
	var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
	recordedDataVideo.src = window.URL.createObjectURL(superBuffer);
}

function download()
{
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