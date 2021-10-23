//STEP 4
let socket = io();
let r;
let g;
let b;
let size;

//Listen for confirmation of connection
socket.on('connect', () => {
  console.log('Connected');
});

//STEP 8. Listen for data
socket.on('data', (data) => {
  console.log(data);
  drawObj(data);
});

socket.on('colorChange', (data) =>{
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(50);
});

//STEP 1
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  //STEP 9.1. Give each user a random color
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(50);
}

function mouseMoved() {
  // fill(0);
  // ellipse(mouseX, mouseY, 10,10);
  //grab the mouse position values
  let mousePos = {
    x: mouseX,
    y: mouseY,
    "red": r,
    "green": g,
    "blue": b,
    "size": size
  }
  console.log(mousePos);
  //STEP 5. Emit the mousePos data
  socket.emit('data', mousePos);
}

function drawObj(obj) {
  // console.log(pos);
  noStroke();
  fill(obj.red, obj.green, obj.blue);
  ellipse(obj.x, obj.y, obj.size);
}

//STEP 9.2. change color on mouseClick
function mousePressed(){
  //send an event trigger to the server
  socket.emit('colorChange', {msg: "Change color"});
}

