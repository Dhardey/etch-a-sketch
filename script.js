const SIZEDEFAULT = 16;
const MODEDEFAULT = "color";
const COLORDEFAULT = "#EFBDBD"

const slider = document.getElementById("range");
var output = document.getElementById("value");

const gridContainer = document.getElementById("grid-container");

let currentGridSize = SIZEDEFAULT;
let currentMode = MODEDEFAULT;
let currentColor = COLORDEFAULT;

function currentSize(inputSize) {
    currentGridSize = inputSize;
}

slider.onmousemove = (e) => updateSize(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);



let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    updateSize(value);
    reloadGrid();
}

function setCurrentSize(changeSize) {
    currentGridSize = changeSize;
}

function updateSize(value) {
    output.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    gridSetUp(currentGridSize);
}

function clearGrid() {
    gridContainer.innerHTML = "";
}

function gridSetUp(size)
{
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add("grid-box");
        gridBox.addEventListener("mouseover", color);
        gridContainer.appendChild(gridBox);
    }
}

//For Buttons
const colorBtn = document.getElementById("color");
const rgbValue = document.getElementById("rgb");
const rainbowBtn = document.getElementById("rainbow");
const eraserBtn = document.getElementById("eraser");
const resetBtn = document.getElementById("reset");

rgbValue.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode("color");
rainbowBtn.onclick = () => setMode("rainbow");
eraserBtn.onclick = () => setMode("eraser");
resetBtn.onclick = () => reloadGrid();


function color(e) {
    //this method changes the color of the grid boxes
    if(currentMode === "color")
    {
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === "rainbow"){
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    else if(currentMode === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

function setColor(newColor) {
    currentColor = newColor;
}

function setMode(newMode) {
    btnMode(newMode);
    currentMode = newMode;
}

function btnMode(newMode)
{
    //need to remove current mode and set the new one
    if(currentMode === 'color') {
        colorBtn.classList.remove('active');
    }
    else if(currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    }
    else if(currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if(newMode === 'color') {
        colorBtn.classList.add('active');
    }
    if(newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    }
    if(newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    gridSetUp(SIZEDEFAULT);
    btnMode(MODEDEFAULT);
}