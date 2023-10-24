// Array of objects with 'source' and 'letter' properties
const objectsArray = [
    { source: 'https://www.datocms-assets.com/108996/1697556257-letter-z.jpg', letter: 'z' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556226-letter-w.jpg', letter: 'w' },
    { source: 'https://www.datocms-assets.com/108996/1697556038-letter-a.jpg', letter: 'a' },
    { source: 'https://www.datocms-assets.com/108996/1697556100-letter-e.jpg', letter: 'e' },
    { source: 'https://www.datocms-assets.com/108996/1697556078-letter-c.jpg', letter: 'c' },
    { source: 'https://www.datocms-assets.com/108996/1697556219-letter-v.jpg', letter: 'v' },
    { source: 'https://www.datocms-assets.com/108996/1697556192-letter-s.jpg', letter: 's' },
].sort((a, b) => a.letter.localeCompare(b.letter)); // Sorting the array initially

const mainElement = document.querySelector('main');
const gridDiv = document.createElement('div');
gridDiv.className = 'image-grid';
mainElement.appendChild(gridDiv);

function populateImageGrid(imagesArray) {
    gridDiv.innerHTML = ''; // Clearing existing images every time

    imagesArray.forEach(obj => {
        // Image Container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        // Wrapper div for image and overlay
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'img-wrapper';

        // Image Element
        const imgElement = document.createElement('img');
        imgElement.src = obj.source;
        imgElement.classList.add('grid-image', `letter-${obj.letter}`);

        // Text Overlay
        const textOverlay = document.createElement('div');
        textOverlay.className = 'text-overlay';
        textOverlay.textContent = `Letter: ${obj.letter.toUpperCase()}`;

        // Appending
        imgWrapper.appendChild(imgElement);
        imgWrapper.appendChild(textOverlay);
        imgContainer.appendChild(imgWrapper);

        // Description
        if (obj.description) {
            const textDescription = document.createElement('div');
            textDescription.className = 'text-description';
            textDescription.textContent = `Description: ${obj.description}`;
            imgWrapper.appendChild(textDescription);
        }

        gridDiv.appendChild(imgContainer);

        // Attach event listener to each image
        imgElement.addEventListener('click', function() {
            openModal(imgElement.src, `Letter: ${obj.letter.toUpperCase()}`, obj.description ? `Description: ${obj.description}` : null);
        });
    });
}

populateImageGrid(objectsArray);  // Load the images in alphabetical order on page load

function filterImages(letter) {
    // Check if the modal is visible. If yes, return early and don't do anything.
    const modal = document.getElementById('myModal');
    if (modal.style.display === 'block') return;

    const filteredImages = letter === 'all' 
        ? objectsArray
        : objectsArray.filter(obj => obj.letter === letter);

    gridDiv.innerHTML = '';

    if (filteredImages.length) {
        populateImageGrid(filteredImages);
    } else {
        const message = document.createElement('p');
        message.textContent = "No letters explored yet!";
        gridDiv.appendChild(message);
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const letter = button.id;
        filterImages(letter); 
    });
});

// Attach a single event listener to stop propagation for modal content clicks
const modalContent = document.querySelector('.modal-content');
modalContent.onclick = function(e) {
    e.stopPropagation();
}

function openModal(imageSrc, title, description) {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = imageSrc;
    modalTitle.textContent = title;

    if (description) {
        modalDescription.textContent = description;
        modalDescription.style.display = 'block'; // Show it if it was hidden
    } else {
        modalDescription.style.display = 'none'; // Hide it if there's no description
    }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal(event); // Pass the event object
    }
}


