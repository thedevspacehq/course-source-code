const svg = document.getElementById("drawingBoard");

function drawStar(x, y) {
  const size = 30;
  const spikes = 5;

  const star = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );

  const points = [x + size * Math.cos(0), y + size * Math.sin(0)];
  for (let i = 1; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const factor = i % 2 === 0 ? size : size / 2;
    points.push(x + factor * Math.cos(angle), y + factor * Math.sin(angle));
  }

  star.setAttribute("points", points.join(" "));
  star.setAttribute("fill", "black");

  svg.appendChild(star);
}

function removeStar(x, y) {
  const elements = document.elementsFromPoint(x, y);

  for (let element of elements) {
    if (
      element.tagName === "polygon" &&
      element.getAttribute("fill") === "black"
    ) {
      element.remove();
      break;
    }
  }
}

svg.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    drawStar(event.clientX, event.clientY);
  } else if (event.button === 2) {
    removeStar(event.clientX, event.clientY);
  }
});

svg.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
