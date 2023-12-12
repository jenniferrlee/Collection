document.addEventListener("DOMContentLoaded", function () {
  const images = ["opt-imgs/z3.JPG",
  "opt-imgs/w.JPG",
  "opt-imgs/a2.JPG",
  "opt-imgs/e.JPG",
  "opt-imgs/e2.JPG",
  "opt-imgs/c.JPG",
  "opt-imgs/v.JPG",
  "opt-imgs/s.JPG",
  "opt-imgs/U2.JPG",
  "opt-imgs/c2.JPG",
  "opt-imgs/I.JPG",
  "opt-imgs/m.JPG",
  "opt-imgs/q.JPG",
  "opt-imgs/x.JPG",
  "opt-imgs/a1.JPG",
  "opt-imgs/o.JPG",
  "opt-imgs/u.JPG",
  "opt-imgs/x2.JPG",
  "opt-imgs/z.JPG",
  "opt-imgs/d2.JPG",
  "opt-imgs/k.JPG",
  "opt-imgs/n2.JPG",
  "opt-imgs/n.JPG",
  "opt-imgs/r.JPG",
  "opt-imgs/y.JPG"
];
  loadImages(images);
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadImages(images) {
  const imageContainer = document.getElementById("imageContainer");
  const shuffledImages = shuffleArray(images).slice(0, 10);

  shuffledImages.forEach((imageUrl, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.style.top = `${getRandomNumber(0, 80)}%`;
    wrapper.style.left = `${getRandomNumber(0, 80)}%`;

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `letter ${index + 1}`;
    image.className = "random-image";
    image.draggable = true;

    wrapper.appendChild(image);
    imageContainer.appendChild(wrapper);

    makeDraggable(wrapper);
  });
}

function makeDraggable(element) {
  let offsetX, offsetY, isDragging = false;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;

    element.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "grab";
  });
}
