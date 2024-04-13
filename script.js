let canvas = document.getElementById("myCanvas");
let context = canvas.getContext('2d');
let selectedColor = 'black'
let selectedWidth = 2;




function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% of the window width
    canvas.height = window.innerHeight * 0.9; // 90% of the window height
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener("touchstart", function (event) {
    startDrawing(event.touches[0]);
});
canvas.addEventListener("touchmove", function (event) {
    draw(event.touches[0]);
});
canvas.addEventListener("touchend", stopDrawing);
// context.fillStyle = 'green';
// context.fillRect(50,50,200,100)

// context.beginPath();
// context.arc(60,60,30,0,2*Math.PI);
// context.fillStyle = 'blue';
// context.fill();




// context.font = "20px Arial";
// context.fillStyle = 'black';
// context.fillText("Akarsh Jha",80,80);

// context.moveTo(500, 100); // Move pen to starting point
// context.lineTo(300, 100); // Draw line to second point
// context.lineTo(200, 180); // Draw line to third point
// context.closePath();
// context.fillStyle = 'blue'; // Fill color
//     context.fill(); // Fill the path with color
//     context.strokeStyle = 'orange'; // Outline color
//     context.lineWidth = 2; // Outline width
//     context.stroke(); 

let colorInputs = document.querySelectorAll("#buttonsBox input[type='color']");

colorInputs.forEach(input => {
    input.addEventListener("input", function() {
        selectedColor = this.value;
        console.log("Selected Color:", selectedColor);
        context.strokeStyle = selectedColor;
        console.log("Stroke Style Set:", context.strokeStyle);
    });
});

let penWidthInput = document.getElementById("penWidth");
penWidthInput.addEventListener("input", function () {
    selectedWidth = parseInt(this.value);
    document.querySelector("label").textContent = this.value;
});

let eraserBtn = document.querySelector("#eraserBtn");
eraserBtn.addEventListener("click",function(){
    selectedColor = 'white'
})


let lastX = 0;
let lastY = 0;
let isDrawing = false;

canvas.addEventListener("mousedown",startDrawing);

function startDrawing(event) {
    isDrawing = true;
    [lastX, lastY] = [event.clientX, event.clientY];
}

canvas.addEventListener("mousemove",Draw);

function draw(event) {
    if (!isDrawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.clientX, event.clientY);
    context.strokeStyle = selectedColor;
    context.lineWidth = selectedWidth;
    context.lineCap = 'round';
    context.stroke();
    [lastX, lastY] = [event.clientX, event.clientY];
}


canvas.addEventListener("mouseup",stopDrawing);
canvas.addEventListener("mouseout",stopDrawing);

function stopDrawing(){
    isDrawing = false;
}

document.querySelector("#ClrBtn").addEventListener("click",function(){
context.clearRect(0,0,canvas.width,canvas.height);
});

