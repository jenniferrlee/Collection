// Function to randomly position images
function positionImages() {
    var images = document.querySelectorAll('.random-image');

    // Get viewport dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    images.forEach(function(img) {
        // Calculate random positions within the viewport
        var randX = Math.floor(Math.random() * (viewportWidth - img.clientWidth));
        var randY = Math.floor(Math.random() * (viewportHeight - img.clientHeight));

        // Apply the positions to the image
        img.style.left = randX + 'px';
        img.style.top = randY + 'px';
    });
}

// Position images on load
window.addEventListener('load', positionImages);

// Optionally, reposition images on resize for responsiveness
window.addEventListener('resize', positionImages);

document.addEventListener('DOMContentLoaded', (event) => {
    let draggedImg = null;
    let offsetX = 0;
    let offsetY = 0;
    let currentZIndex = 10; // Start z-index for draggable images

    // Detect the start of a drag event by capturing 'dragstart'
    document.addEventListener('dragstart', function (e) {
        draggedImg = e.target;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        draggedImg.style.opacity = 1;
        // Bring the dragged image on top by increasing its z-index
        currentZIndex += 1; // Ensure each subsequent dragged image has a higher z-index
        draggedImg.style.zIndex = currentZIndex;
    }, false);

    // Optional: Highlight drop zone on 'dragover'
    document.addEventListener('dragover', function (e) {
        e.preventDefault(); // Prevent default to allow drop
    }, false);

    // Handle the drop action
    document.addEventListener('drop', function (e) {
        e.preventDefault();

        // Position the image at the drop location minus the initial click offset
        draggedImg.style.left = (e.clientX - offsetX) + 'px';
        draggedImg.style.top = (e.clientY - offsetY) + 'px';

        // The z-index remains as set during dragstart, keeping this image on top of others
    }, false);

    // No need to reset z-index on dragend, the z-index remains as set during dragstart
    document.addEventListener('dragend', function (e) {
        // Clear the reference to the dragged image
        draggedImg = null;
        offsetX = 0;
        offsetY = 0;
    }, false);
});
