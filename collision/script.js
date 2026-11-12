let board;
let led;

// a variable to store the bodyPose model 
let bodyPose; 
// we cretate a variable to store the webcam
let video;
// a variable to store the detected poses
let poses = []; 

// out target 
let target = {
    x: 300, 
    y: 200, 
    d: 50,  //diametro
}

target.x

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    led = new five.Led(3); 

    
    video = createCapture(VIDEO);  // we open the webcam
    video.size(700, 500);          // we set the video size
    video.hide();                  // we hide the video
     

    bodyPose = await ml5.bodyPose();
    // start the detection   
    bodyPose.detectStart(video, function(results){
        poses = results;
    })

}

function draw() {
   image (video, 0, 0);   // the image is displayed on the canvas 

   // make sure at least one person is detected.  
   if (poses.length > 0) {
       let rw = poses[0].right_wrist; //right wrist coordinates

       // get the distance 
       let distance = dist(rw.x, rw.y, target.x, target.y); 

       // is a boolean value true if it collides
       let isColliding = distance < target.d;    // solo dice si si o no esta colliding 

       // debug
       textSize(40);
       text(isColliding, 20, 60);

       // if collision change circle color
       if(isColliding){
        fill("#FF0000");
       }else{
        fill("#00FF00");
       }

        // display the target
        circle(target.x, target.y, target.d)
   }

}
