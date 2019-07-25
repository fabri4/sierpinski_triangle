var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const aBaseCoord = {
    x: 500,
    y: 100
};
const bBaseCoord = {
    x: 200,
    y: 500
};
const cBaseCoord = {
    x: 800,
    y: 500
};
let startBaseCoord = {
    x: null,
    y: null
};

function getDiceValue() {
    return 1 + Math.floor( Math.random() * 6);
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    startBaseCoord.x = event.clientX - rect.left;
    startBaseCoord.y = event.clientY - rect.top;
}

function setStartBase(event) {
    getCursorPosition(canvas, event);
    ctx.fillRect(startBaseCoord.x, startBaseCoord.y, 1, 1);
    canvas.removeEventListener('mousedown', setStartBase);
    drawLines();
}

canvas.addEventListener('mousedown', setStartBase);

function drawBases() {
    var aBase = canvas.getContext("2d");
    aBase.beginPath();
    aBase.arc(aBaseCoord.x, aBaseCoord.y, 3, 0, 2 * Math.PI);
    aBase.stroke();
    
    var bBase = canvas.getContext("2d");
    bBase.beginPath();
    bBase.arc(bBaseCoord.x, bBaseCoord.y, 3, 0, 2 * Math.PI);
    bBase.stroke();
    
    var cBase = canvas.getContext("2d");
    cBase.beginPath();
    cBase.arc(cBaseCoord.x, cBaseCoord.y, 3, 0, 2 * Math.PI);
    cBase.stroke();
}

function drawLines() {
    for (var i = 0; i < 10000; i++) {
        drawNextDot();
    }
    function drawNextDot() {
        let diceValue = getDiceValue();
        let pathCoord = {};
        let newDotCoord = {};

        switch (diceValue) {
            case 1:
            case 2:
                pathCoord = aBaseCoord;
                break;
            case 3:
            case 4:
                pathCoord = bBaseCoord;
                break;
            default:
                pathCoord = cBaseCoord;
                break;
        }
        if (startBaseCoord.x === pathCoord.x) {
            newDotCoord.x = startBaseCoord.x;
        } else if (startBaseCoord.x > pathCoord.x) {
            newDotCoord.x = (startBaseCoord.x - pathCoord.x) / 2 + pathCoord.x;
        } else if (startBaseCoord.x < pathCoord.x) {
            newDotCoord.x = (pathCoord.x - startBaseCoord.x) / 2 + startBaseCoord.x;
        }
        if (startBaseCoord.y === pathCoord.y) {
            newDotCoord.y = startBaseCoord.y;
        } else if (startBaseCoord.y > pathCoord.y) {
            newDotCoord.y = (startBaseCoord.y - pathCoord.y) / 2 + pathCoord.y;
        } else if (startBaseCoord.y < pathCoord.y) {
            newDotCoord.y = (pathCoord.y - startBaseCoord.y) / 2 + startBaseCoord.y;
        }
        // setTimeout(function() {
        // }, 500);
        ctx.fillRect(newDotCoord.x, newDotCoord.y, 1, 1);
        startBaseCoord = newDotCoord;
    }
}

drawBases();