// Code source: written with the help of chatGPT and also some CD tutors!

// Array of objects with 'source' and 'letter' properties
const objectsArray = [
    { source: 'https://www.datocms-assets.com/108996/1697556257-letter-z.jpg', letter: 'z' , location: '328 Bleecker St'},
    { source: 'https://www.datocms-assets.com/108996/1697556226-letter-w.jpg', letter: 'w' , location: '320 Bleecker St'},
    { source: 'https://www.datocms-assets.com/108996/1697556038-letter-a.jpg', letter: 'a' , location: '40 Bond St'},
    { source: 'https://www.datocms-assets.com/108996/1697556100-letter-e.jpg', letter: 'e' , location: 'USM Modular Furniture'},
    { source: 'https://www.datocms-assets.com/108996/1697556078-letter-c.jpg', letter: 'c' , location: 'in front of 66W 12th St'},
    { source: 'https://www.datocms-assets.com/108996/1697556219-letter-v.jpg', letter: 'v' , location: 'Near 14 St-Union Sq Station'},
    { source: 'https://www.datocms-assets.com/108996/1697556192-letter-s.jpg', letter: 's' , location: 'somewhere on Greenwich Ave, W 10th St'},
    { source: 'https://www.datocms-assets.com/108996/1697556211-letter-u.jpg', letter: 'u' , location: 'somewhere on Greenwich Ave, W 10th St'},
    { source: 'https://www.datocms-assets.com/108996/1697556085-letter-c2.jpg', letter: 'c', location: '40 Bond St' },
    { source: 'https://www.datocms-assets.com/108996/1698741795-letter-i.jpeg', letter: 'i', location: '535 LaGuardia Place' },
    { source: 'https://www.datocms-assets.com/108996/1698741815-letter-m.jpeg', letter: 'm' , location: 'somewhere near the intersection of Cleveland Pl and Kenmare St'},
    { source: 'https://www.datocms-assets.com/108996/1698741864-letter-q.jpeg', letter: 'q', location: 'In front of 66 West 12th'},
    { source: 'https://www.datocms-assets.com/108996/1697556246-letter-x.jpg', letter: 'x', location: 'Broadway 11th St'},
    { source: 'https://www.datocms-assets.com/108996/1697556059-letter-a2.jpg', letter: 'a', location: '40 Bond St'},
    { source: 'https://www.datocms-assets.com/108996/1699947191-o.jpeg', letter: 'o', location: 'Nearby 66 West 12th'},
    { source: 'https://www.datocms-assets.com/108996/1699947200-u.jpeg', letter: 'u', location: 'UC toilet'},
    { source: 'https://www.datocms-assets.com/108996/1699947210-x.jpeg', letter: 'x' , location: 'Lobby of Johnson/Kaplan 66 West 12th'},
    { source: 'https://www.datocms-assets.com/108996/1699947224-z.jpeg', letter: 'z', location: 'Johnson/Kaplan 66 West 12th room #615'}

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
        textOverlay.textContent = `${obj.location}`;

        // Appending
        imgWrapper.appendChild(imgElement);
        imgWrapper.appendChild(textOverlay);
        imgContainer.appendChild(imgWrapper);
        
        // Location
        const textLocation = document.createElement('div');
        textLocation.className = 'text-location';
        textLocation.textContent = `📍 ${obj.location}`;
        imgWrapper.appendChild(textLocation);
        
        gridDiv.appendChild(imgContainer);
        
        // Attach event listener to each image
        imgElement.addEventListener('click', function() {
        openModal(imgElement.src, `${obj.letter.toUpperCase()}`, `📍 ${obj.location}`);
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
        enableButtons(); // Enable buttons when there are images
    } else {
        const message = document.createElement('p');
        message.textContent = "No images found for the selected letter!";
        gridDiv.appendChild(message);
        disableButtons(); // Disable buttons when there are no images
    }
}

function enableButtons() {
    buttons.forEach(button => {
        const letter = button.id;
        if (letter !== 'all') {
            const hasImages = objectsArray.some(obj => obj.letter === letter);
            button.classList.toggle('disabled', !hasImages);
        }
    });
}

function disableButtons() {
    buttons.forEach(button => {
        if (button.id !== 'all') {
            button.classList.add('disabled');
        }
    });
}



const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const letter = button.id;
        filterImages(letter); 
    });
});

document.getElementById('all').click(); // Trigger click on the 'All' button


// Attach event listener to close the modal when clicking on modal content
document.getElementById('myModal').addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-content')) {
        closeModal();
    }
});


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

document.querySelector('.modal .close').addEventListener('click', closeModal);

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
};


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