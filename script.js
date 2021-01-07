// const video = document.getElementById('myImg')

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/face/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/face/models')
//  ]).then(()=>start())

// async function start() {
//   console.log('0')

 

 
//   const detectionsWithLandmarks = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
  
//   console.log('1')
//   var ctx=canvas.getContext("2d");
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   const resizedDetections = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
//   console.log(faceapi.tf.getBackend())

//   const lab = resizedDetections[0].landmarks.getMouth();

  

//   beginShape();
//   blendMode(MULTIPLY); 
//   filter(BLUR, 3); 
//   fill('rgba(204, 0, 0, 0.7)');

//   noStroke()
  
//   curveVertex(lab[0].x,lab[0].y);
//   // circle(lab[0].x,lab[0].y, 10); 
//   for(var i=0;i<lab.length;i++){
//     var pt=lab[i];
//     curveVertex(pt.x,pt.y);
//     //circle(pt.x,pt.y, 10); 
//   }
//   curveVertex(lab[0].x,lab[0].y);
//   // circle(lab[0].x,lab[0].y, 10); 
//    endShape();
//    image(img, 0, 0);
//   redraw()     

         
// }

// function preload() {

//   img = loadImage("img/base.jpg");

// }

// function setup() {

//   const canvas = createCanvas( video.width, video.height);

// }

// function draw() {

  
//   noLoop();
// }






let detections = [];

const video1 = document.getElementById('video')
navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
Promise.all([
     faceapi.nets.faceLandmark68Net.loadFromUri('/face/models'),
     faceapi.nets.tinyFaceDetector.loadFromUri('/face/models')
]).then(()=>startVideo())



var myCanvas;
function setup() {
  myCanvas = createCanvas(video1.width, video1.height);
  myCanvas.parent('container');
  myCanvas.position(0, 0);
  blendMode(MULTIPLY); 
  filter(BLUR, 3); 
  
}




 
 function draw() {
  
  
  if (detections.length > 0) {
    clear()
      const lab = detections[0].landmarks.getMouth();

      console.log(detections)
      beginShape();
  
  
  noStroke()
  fill('rgba(204, 0, 0, 0.7)');

  curveVertex(lab[0].x,lab[0].y);
  //  circle(lab[0].x,lab[0].y, 10); 
  for(var i=0;i<lab.length;i++){
    var pt=lab[i];
    curveVertex(pt.x,pt.y);
    //circle(pt.x,pt.y, 10); 
  }
    
  curveVertex(lab[0].x,lab[0].y);
  // circle(lab[0].x,lab[0].y, 10); 
   endShape();
  }
}


function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video1.srcObject = stream,
      err => console.error(err)
    )
  }

    video1.addEventListener('play', () => {
     const displaySize = { width: video.width, height: video.height }
 
    setInterval(async () => {
    const detectionsWithLandmarks = await faceapi.detectAllFaces(video1,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
    faceapi.matchDimensions(myCanvas, displaySize)
    const resizedDetections = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
  console.log('1')
  
  
 detections = resizedDetections
     
    
    }, 100)
  })





  
