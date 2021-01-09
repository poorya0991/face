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


Promise.all([
     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
     faceapi.nets.tinyFaceDetector.loadFromUri('/models')
]).then(()=>startVideo())



var myCanvas;
function setup() {
  blendModes = [ 
    MULTIPLY, 
    BLEND, 
    ADD, 
    DARKEST, 
    LIGHTEST, 
    DIFFERENCE, 
    EXCLUSION, 
    OVERLAY, 
    HARD_LIGHT, 
    SOFT_LIGHT, 
    DODGE, 
    BURN 
  ] 
  
  index = 0; 
  currBlendMode = blendModes[index]; 
  myCanvas = createCanvas(640, 480);
  myCanvas.parent('container');
  myCanvas.position(0, 0);
  capture = createCapture(VIDEO);
  filter(BLUR, 1); 
  
}




 
 function draw() {
  

  image(capture, capture.x, capture.y, capture.width, capture.height);
  
  if (detections.length > 0) {
    clear()
    blendMode(currBlendMode); 
      const lab = detections[0].landmarks.getMouth();

      beginShape();
  
  
  noStroke()
  fill('rgba(204, 0, 0, 0.4)');

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



async function startVideo(){

  const displaySize = { width: capture.width, height: capture.height }
  const detectionsWithLandmarks = await faceapi.detectAllFaces(capture.elt,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
  faceapi.matchDimensions(myCanvas, displaySize)
  const resizedDetections = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
  console.log('1')


detections = resizedDetections

}



var myVar = setInterval(startVideo, 1000);


function changeBlendMode() { 
  if (index < blendModes.length - 1) 
    index++; 
  else
    index = 0; 
  currBlendMode = blendModes[index]; 
  console.log(currBlendMode)
} 

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    changeBlendMode()
  } 
}