// // Function to randomly position images
// function positionImages() {
//     var images = document.querySelectorAll('.random-image');

//     // Get viewport dimensions
//     var viewportWidth = window.innerWidth;
//     var viewportHeight = window.innerHeight;

//     images.forEach(function(img) {
//         // Calculate random positions within the viewport
//         var randX = Math.floor(Math.random() * (viewportWidth - img.clientWidth));
//         var randY = Math.floor(Math.random() * (viewportHeight - img.clientHeight));

//         // Apply the positions to the image
//         img.style.left = randX + 'px';
//         img.style.top = randY + 'px';
//     });
// }

// // Position images on load
// window.addEventListener('load', positionImages);

// // Optionally, reposition images on resize for responsiveness
// window.addEventListener('resize', positionImages);

// document.addEventListener('DOMContentLoaded', (event) => {
//     let draggedImg = null;
//     let offsetX = 0;
//     let offsetY = 0;
//     let currentZIndex = 10; // Start z-index for draggable images

//     // Detect the start of a drag event by capturing 'dragstart'
//     document.addEventListener('dragstart', function (e) {
//         draggedImg = e.target;
//         offsetX = e.offsetX;
//         offsetY = e.offsetY;
//         draggedImg.style.opacity = 1;
//         // Bring the dragged image on top by increasing its z-index
//         currentZIndex += 1; // Ensure each subsequent dragged image has a higher z-index
//         draggedImg.style.zIndex = currentZIndex;
//     }, false);

//     // Optional: Highlight drop zone on 'dragover'
//     document.addEventListener('dragover', function (e) {
//         e.preventDefault(); // Prevent default to allow drop
//     }, false);

//     // Handle the drop action
//     document.addEventListener('drop', function (e) {
//         e.preventDefault();

//         // Position the image at the drop location minus the initial click offset
//         draggedImg.style.left = (e.clientX - offsetX) + 'px';
//         draggedImg.style.top = (e.clientY - offsetY) + 'px';

//         // The z-index remains as set during dragstart, keeping this image on top of others
//     }, false);

//     // No need to reset z-index on dragend, the z-index remains as set during dragstart
//     document.addEventListener('dragend', function (e) {
//         // Clear the reference to the dragged image
//         draggedImg = null;
//         offsetX = 0;
//         offsetY = 0;
//     }, false);
// });
//--------

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
  "opt-imgs/i.JPG",
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
