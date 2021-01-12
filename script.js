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


// Promise.all([
//      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//      faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models')
// ]).then(()=>startVideo())

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/face/models'),
  faceapi.nets.faceLandmark68TinyNet.loadFromUri('/face/models')
]).then(()=>startVideo())

var myCanvas;
let capture;
let bool = false;

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
  capture.hide()
  frameRate(5)
  filter(BLUR, 3); 
  noStroke()
  colorMode(HSB, 100);
  c = color(0, 100, 230);
  c.setAlpha(55)
  curveTightness(-0.5);
}




 var bol = false;
 function draw() {
  

  
  
  if (detections.length > 0) {
    clear()
    blendMode(currBlendMode); 
    const lab = detections[0].landmarks.getMouth();

    if(!bol){
      console.log(lab);
      bol=true;
    }
   
    beginShape();
    noErase();
  
  fill(c);
  
  fill(255, 204, 0);
  textSize(8);

  
  // text('0',lab[0].x,lab[0].y);
  // text('1',lab[1].x,lab[1].y);
  // text('2',lab[2].x,lab[2].y);

  // text('3',lab[3].x,lab[3].y);
  // text('4',lab[4].x,lab[4].y);
 

  // text('5',lab[5].x,lab[5].y);
  // text('6',lab[6].x,lab[6].y);
  // text('16',lab[16].x,lab[16].y);
  // text('15',lab[15].x,lab[15].y);
  // text('14',lab[14].x,lab[14].y);
  // text('13',lab[13].x,lab[13].y);
  // text('12',lab[12].x,lab[12].y);
  // text('0',lab[0].x,lab[0].y);


  var yMargin=4;  

  curveVertex(lab[0].x,lab[0].y-yMargin);
  curveVertex(lab[1].x,lab[1].y-yMargin);
  curveVertex(lab[2].x,lab[2].y-yMargin);
  

  curveVertex(lab[3].x,lab[3].y-yMargin);
  curveVertex(lab[4].x,lab[4].y-yMargin);
  

  curveVertex(lab[5].x,lab[5].y-yMargin);

  curveVertex(lab[6].x,lab[6].y-yMargin);
  curveVertex(lab[16].x,lab[16].y);
  curveVertex(lab[15].x,lab[15].y);
  curveVertex(lab[14].x,lab[14].y);
  curveVertex(lab[13].x,lab[13].y);
  curveVertex(lab[12].x,lab[12].y);
  curveVertex(lab[0].x,lab[0].y);



  for(var i=0;i<lab.length;i++){
    
    var pt=lab[i];
   
    
    //text(''+i, pt.x, pt.y);
    fill(c);
    //circle(pt.x,pt.y, 10); 
  }
    
 
  // circle(lab[0].x,lab[0].y, 10); 
   endShape();
   image(capture, 0,0);
  }

 
}



async function startVideo(){
  const displaySize = { width: capture.width, height: capture.height }
  const detectionsWithLandmarks = await faceapi.detectAllFaces(capture.elt,new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })).withFaceLandmarks(true)
  faceapi.matchDimensions(myCanvas, displaySize)
  const resizedDetections = faceapi.resizeResults(detectionsWithLandmarks, displaySize)


detections = resizedDetections


}



var myVar = setInterval(startVideo, 100);


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


// curveVertex(lab[0].x,lab[0].y);




// curveVertex(337.29216345233317,186.0443420346663 )
// ​curveVertex(346.60932946675,181.5473766797361 )
// ​curveVertex(357.16091900246374,178.47987574403874) 
// ​curveVertex(363.56161965090183,180.93555300801447 )
// ​curveVertex(370.3861161556341,179.8706654072931) 
// curveVertex(383.4232009708643,184.48050829950688) 
// curveVertex( 394.6496911236435,189.67509470007315) 
// curveVertex(372.4017328835804,186.69427901249907) 
// curveVertex(363.03629167550906,186.53375657833317) 
// curveVertex(355.5367805706152,186.25851557359775) 
// curveVertex(340.1530520016172,186.2305475360198) 
// curveVertex(345.4353773303934,193.4510539695437) 
// curveVertex(337.29216345233317,186.0443420346663 )





// ​









// 337.29216345233317,186.0443420346663 
// 346.60932946675,181.5473766797361 
// 357.16091900246374,178.47987574403874 
// 363.56161965090183,180.93555300801447 
// 370.3861161556341,179.8706654072931 
// 383.4232009708643,184.48050829950688 
// 394.6496911236435,189.67509470007315 
// 383.2325005461531,195.38309436189186 
// 372.5726874131093,198.7697599617141 
// 363.0334018687778,198.93677171178862 
// 353.8992457725275,197.45812167278166 
// 345.4353773303934,193.4510539695437 
// 340.1530520016172,186.2305475360198 
// 355.5367805706152,186.25851557359775 
// 363.03629167550906,186.53375657833317 
// 372.4017328835804,186.69427901249907 
// 392.8266052548344,188.65172827558797 
// 371.76407121450893,188.57696404441555 
// 363.08290405693765,187.89895457321555 
// 355.22631073142486,186.88099373582526 