// Array of objects with 'source' and 'letter' properties
const objectsArray = [
    { source: 'https://www.datocms-assets.com/108996/1697556257-letter-z.jpg', letter: 'z' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556226-letter-w.jpg', letter: 'w' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556038-letter-a.jpg', letter: 'a' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556100-letter-e.jpg', letter: 'e' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556078-letter-c.jpg', letter: 'c' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556219-letter-v.jpg', letter: 'v' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556192-letter-s.jpg', letter: 's' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556211-letter-u.jpg', letter: 'u' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556085-letter-c2.jpg', letter: 'c', description: 'I found this with my friend Freddy.' },
    { source: 'https://www.datocms-assets.com/108996/1698741795-letter-i.jpeg', letter: 'i', description: 'I found this with my friend Freddy.' },
    { source: 'https://www.datocms-assets.com/108996/1698741815-letter-m.jpeg', letter: 'm' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1698741864-letter-q.jpeg', letter: 'q', description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556246-letter-x.jpg', letter: 'x', description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1697556059-letter-a2.jpg', letter: 'a', description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1699947191-o.jpeg', letter: 'o', description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1699947200-u.jpeg', letter: 'u', description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1699947210-x.jpeg', letter: 'x' , description: 'I found this with my friend Freddy.'},
    { source: 'https://www.datocms-assets.com/108996/1699947224-z.jpeg', letter: 'z', description: 'I found this with my friend Freddy.'}

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
        textOverlay.textContent = `${obj.letter.toUpperCase()}`;

        // Appending
        imgWrapper.appendChild(imgElement);
        imgWrapper.appendChild(textOverlay);
        imgContainer.appendChild(imgWrapper);

        // Description
            const textDescription = document.createElement('div');
            textDescription.className = 'text-description';
            textDescription.textContent = `Description: ${obj.description}`;
            imgWrapper.appendChild(textDescription);

        gridDiv.appendChild(imgContainer);

        // Attach event listener to each image
        imgElement.addEventListener('click', function() {
            openModal(imgElement.src, `${obj.letter.toUpperCase()}`, `Description: ${obj.description}`);
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

    modalDescription.textContent = description; 


    // if (description) {
    //     modalDescription.textContent = description;
    //     modalDescription.style.display = 'block'; // Show it if it was hidden
    // } else {
    //     modalDescription.style.display = 'none'; // Hide it if there's no description
    // }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

document.querySelector('.modal-content').addEventListener('click', closeModal);

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal(event); // Pass the event object
    }
}

function myFunction() {
    var x = document.getElementById("navbutton");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function appearText() {
    let aboutText = document.querySelector(".aboutText");
    let aboutContainer = document.querySelector(".about-container");

    // Toggle the visibility of aboutText
    aboutText.style.display = (aboutText.style.display === "none" || aboutText.style.display === "") ? "block" : "none";

    // Toggle the background color class for the ABOUT section
    aboutContainer.classList.toggle("about-active", aboutText.style.display === "block");
}

let aboutContainer = document.querySelector(".about-container");
aboutContainer.addEventListener("click", appearText);