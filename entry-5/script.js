// Array of eight objects with empty 'source' and 'letter' properties
const objectsArray = [
    { source: 'https://www.datocms-assets.com/108996/1697556257-letter-z.jpg', letter: 'z' },
    { source: 'https://www.datocms-assets.com/108996/1697556226-letter-w.jpg', letter: 'w' },
    { source: 'https://www.datocms-assets.com/108996/1697556038-letter-a.jpg', letter: 'a' },
    { source: 'https://www.datocms-assets.com/108996/1697556100-letter-e.jpg', letter: 'e' },
    { source: 'https://www.datocms-assets.com/108996/1697556078-letter-c.jpg', letter: 'c' },
    { source: 'https://www.datocms-assets.com/108996/1697556219-letter-v.jpg', letter: 'v' },
    { source: 'https://www.datocms-assets.com/108996/1697556192-letter-s.jpg', letter: 's' },
    { source: '', letter: '' }
];

// Get the <main> element
const mainElement = document.querySelector('main');

// Create a <div> element with class 'image-grid'
const gridDiv = document.createElement('div');
gridDiv.className = 'image-grid';

// Loop through the objectsArray and create image tags
objectsArray.forEach(obj => {
    // Create an <img> element
    const imgElement = document.createElement('img');
    
    // Set 'src' attribute to the 'source' property of the object
    imgElement.src = obj.source;
    
    // Set 'id' attribute to the 'letter' property of the object
    imgElement.id = obj.letter;
    imgElement.className = "grid-image";
    // Append the <img> element to the gridDiv
    gridDiv.appendChild(imgElement);
});

// Append the gridDiv to the <main> element
mainElement.appendChild(gridDiv);
 
//chat gpt modification

// Function to filter and display images based on the button clicked
function filterImages(letter) {
    // Clear existing images from the grid
    gridDiv.innerHTML = '';

    // Filter objectsArray based on the letter or show all images if 'all' is clicked
    const filteredImages = letter === 'all' ? objectsArray : objectsArray.filter(obj => obj.letter === letter);

    // Create image tags for filtered objects and append them to the gridDiv
    filteredImages.forEach(obj => {
        const imgElement = document.createElement('img');
        imgElement.src = obj.source;
        imgElement.id = obj.letter;
        imgElement.className = "grid-image";
        gridDiv.appendChild(imgElement);
    });
}

// Get all button elements
const buttons = document.querySelectorAll('button');

// Add click event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const letter = button.id;
        filterImages(letter); // Call the filterImages function with the button's ID
    });
});

