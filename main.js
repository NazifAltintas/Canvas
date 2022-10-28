const canvas = document.getElementById("canvas");
const contex = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas dims
const bw = window.innerWidth - 20;
const bh = window.innerHeight - 20;
const lw = 1; // box border
const boxRow = 100; // how many boxes
const box = bw / boxRow; // box size

let rTimeout = null;
let draw_color = "red";
let restore_array = [];

function drawBoard() {
  contex.lineWidth = lw;
  contex.strokeStyle = "grey";
  for (let x = 0; x < bw; x += box) {
    for (let y = 0; y <= bh; y += box) {
      contex.strokeRect(x, y, box, box);
    }
  }
}

function startPosition(event) {
  painting = true;

  const rect = canvas.getBoundingClientRect();
  const xCursorPosition = event.clientX - rect.left;
  const yCursorPosition = event.clientY - rect.top;
  const cy = (yCursorPosition + (box - (yCursorPosition % box))) / box;
  const cx = (xCursorPosition + (box - (xCursorPosition % box))) / box;

  if (
    restore_array.some(
      (row) => JSON.stringify(row) === JSON.stringify([cy, cx]) //Js 2D Array Includes
    )
  ) {
    const context2 = canvas.getContext("2d");
    context2.beginPath();
    context2.fillStyle = "white";
    context2.fillRect((cx - 1) * box + 1, (cy - 1) * box + 1, box - 2, box - 2);
  }
}

function getCursorPositionThanPaint(event) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const context2 = canvas.getContext("2d");
  const xCursorPosition = event.clientX - rect.left;
  const yCursorPosition = event.clientY - rect.top;
  const cy = (yCursorPosition + (box - (yCursorPosition % box))) / box;
  const cx = (xCursorPosition + (box - (xCursorPosition % box))) / box;
  const exist = [cy, cx];
  restore_array.push(exist);

  context2.beginPath();
  context2.fillStyle = draw_color;
  context2.fillRect((cx - 1) * box + 1, (cy - 1) * box + 1, box - 2, box - 2);
  // remove duplicated element
  restore_array
    .map(JSON.stringify)
    .filter((e, i, a) => i === a.indexOf(e))
    .map(JSON.parse);
}

function finishedPosition() {
  painting = false;
}

function change_color(element) {
  draw_color = element.style.background;
  modal.style.display = "none";
}

function clear_canvas() {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  modal.style.display = "none";
}

function downloadImage(data, filename = "untitled.jpeg") {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function save_paint() {
  var dataURL = canvas.toDataURL("image/jpeg", 1.0);
  downloadImage(dataURL, "my-canvas.jpeg");
  modal.style.display = "none";
}

drawBoard();

window.addEventListener("resize", (e) => {
  clearTimeout(rTimeout);
  contex.clearRect(0, 0, window.innerWidth, window.innerHeight);
  rTimeout = setTimeout(() => {
    drawBoard();
  }, 30);
});

canvas.addEventListener("mousedown", (e) => {
  switch (e.button) {
    case 0:
      startPosition(e);
  }
});
canvas.addEventListener("mouseup", (e) => {
  switch (e.button) {
    case 0:
      finishedPosition();
  }
});
canvas.addEventListener("mousemove", (e) => {
  switch (e.button) {
    case 0:
      getCursorPositionThanPaint(e);
  }
});

$("#canvas").contextmenu(function (e) {
  e.preventDefault();
  $("div:hidden").first().fadeIn("slow");
});

$("a").click(function () {
  modal.style.display = "none";
});
