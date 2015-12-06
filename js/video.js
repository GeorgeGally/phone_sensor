      var vidHolder;
      var context;
      var imgData;
      var video;
      
        var video = document.querySelector('video');
        var canvas = document.getElementById('vH');
        var context = canvas.getContext('2d');
        context.strokeStyle = '#ddd';
        // context.setLineDash([4,4]);
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(canvas.width,canvas.height);
        context.moveTo(0,canvas.height);
        context.lineTo(canvas.width,0);
        context.stroke();

      video.autoplay  = true;
      video.loop  = true;


(function () { 
  
video.setAttribute("id", "videoOutput");
vidHolder = document.getElementById('videoOutput');  
vidHolder.setAttribute("style", "display:none;");

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL; 

  function successCallback(stream) {
      // Set the source of the video element with the stream from the camera
      if (video.mozCaptureStream) {
          video.mozSrcObject = stream;              
      // imgData = context.getImageData(0,0,video.width,video.height);
      } else {
          video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      }
       video.play();
   }

   function errorCallback(error) {
      alert('Unable to get webcam stream.');
   }
  
  if (navigator.getUserMedia) {
     navigator.getUserMedia({video: true}, successCallback, errorCallback);
  } else {
     alert('Native web camera streaming (getUserMedia) not supported in this browser.');
  }
  
  video.addEventListener('loadeddata', function() {
      var attempts = 50;    
      function checkVideo() {
          if (attempts > 0) {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                video.available = true;
                // video.width = 320;
                // video.height = 240;
            } else {
                // Wait a bit and try again
                window.setTimeout(checkVideo, 100);
            }
          } else {
              // Give up after 10 attempts
              alert('Unable to play video stream. Is webcam working?');
          }
          attempts--;
      }    
      checkVideo();
  }, false);

}());

