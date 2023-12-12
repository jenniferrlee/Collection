// Code source: written with the help of chatGPT and also some CD tutors!

// Array of objects with 'source' and 'letter' properties
const objectsArray = [
  {
    source: "opt-imgs/p.JPG",
    letter: "p",
    location: "Little Island",
  },
  {
    source: "opt-imgs/t.JPG",
    letter: "t",
    location: "Subway - L train",
  },
  {
    source: "opt-imgs/z3.JPG",
    letter: "z",
    location: "Unknown",
  },
  {
    source: "opt-imgs/w.JPG",
    letter: "w",
    location: "320 Bleecker St",
  },
  {
    source: "opt-imgs/a2.JPG",
    letter: "a",
    location: "40 Bond St",
  },
  {
    source: "opt-imgs/e.JPG",
    letter: "e",
    location: "USM Modular Furniture",
  },
  {
    source: "opt-imgs/e2.JPG",
    letter: "e",
    location: "40 Bond St",
  },
  {
    source: "opt-imgs/c.JPG",
    letter: "c",
    location: "in front of 66W 12th St",
  },
  {
    source: "opt-imgs/v.JPG",
    letter: "v",
    location: "Near 14 St-Union Sq Station",
  },
  {
    source: "opt-imgs/s.JPG",
    letter: "s",
    location: "somewhere on Greenwich Ave, W 10th St",
  },
  {
    source: "opt-imgs/U2.JPG",
    letter: "u",
    location: "somewhere on Greenwich Ave, W 10th St",
  },
  {
    source: "opt-imgs/c2.JPG",
    letter: "c",
    location: "40 Bond St",
  },
  {
    source: "opt-imgs/I.JPG",
    letter: "i",
    location: "535 LaGuardia Place",
  },
  {
    source: "opt-imgs/m.JPG",
    letter: "m",
    location: "somewhere near the intersection of Cleveland Pl and Kenmare St",
  },
  {
    source: "opt-imgs/q.JPG",
    letter: "q",
    location: "In front of 66 West 12th",
  },
  {
    source: "opt-imgs/x.JPG",
    letter: "x",
    location: "Broadway 11th St",
  },
  {
    source: "opt-imgs/a1.JPG",
    letter: "a",
    location: "40 Bond St",
  },
  {
    source: "opt-imgs/o.JPG",
    letter: "o",
    location: "Nearby 66 West 12th",
  },
  {
    source: "opt-imgs/u.JPG",
    letter: "u",
    location: "UC toilet",
  },
  {
    source: "opt-imgs/x2.JPG",
    letter: "x",
    location: "Lobby of Johnson/Kaplan 66 West 12th",
  },
  {
    source: "opt-imgs/z.JPG",
    letter: "z",
    location: "Johnson/Kaplan 66 West 12th room #615",
  },
  {
    source: "opt-imgs/d2.JPG",
    letter: "d",
    location: "14th St 8th Ave Station",
  },
  {
    source: "opt-imgs/k.JPG",
    letter: "k",
    location: "40.73555° N, 73.99654° W",
  },
  {
    source: "opt-imgs/n2.JPG",
    letter: "n",
    location: "40.73509° N, 73.99548° W",

  },
  {
    source: "opt-imgs/n.JPG",
    letter: "n",
    location: "Eastern Pkwy-Brooklyn Museum",
    
  },
  {
    source: "opt-imgs/r.JPG",
    letter: "r",
    location: "40.73714° N, 74.00054° W",
  },
  {
    source: "opt-imgs/y.JPG",
    letter: "y",
    location: "Somewhere on Greenwich Ave, 10th St",
  }

].sort((a, b) => a.letter.localeCompare(b.letter)); // Sorting the array initially

const mainElement = document.querySelector("main");
const gridDiv = document.createElement("div");
gridDiv.className = "image-grid";
mainElement.appendChild(gridDiv);

// Function to populate the image grid
// Function to populate the image grid
function populateImageGrid(imagesArray) {
    gridDiv.innerHTML = ""; // Clearing existing images every time
  
    var randomizedArray = imagesArray.slice().sort(function () {
      return 0.5 - Math.random();
    });
  
    randomizedArray.forEach((obj) => {
      // Image Container
      const imgContainer = document.createElement("div");
      imgContainer.className = "image-container";
  
      // Wrapper div for image and overlay
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "img-wrapper";
  
      // Image Element
      const imgElement = document.createElement("img");
      imgElement.src = obj.source;
      imgElement.classList.add("grid-image", `letter-${obj.letter}`);
  
      // Appending
      imgWrapper.appendChild(imgElement);
      imgContainer.appendChild(imgWrapper);
  
      gridDiv.appendChild(imgContainer);
  
      // Attach event listener to each image
      imgElement.addEventListener("click", function () {
        imgContainer.classList.toggle("selected");
        openModal(
          imgElement.src,
          `${obj.letter.toUpperCase()}`,
          `📍 ${obj.location}`
        );
      });
    });
  }
  
  populateImageGrid(objectsArray); // Load the images in alphabetical order on page load
  
  // Function to filter images based on letter
  function filterImages(letter) {
    // Check if the modal is visible. If yes, return early and don't do anything.
    const modal = document.getElementById("myModal");
    if (modal.style.display === "block") return;
  
    const filteredImages =
      letter === "all"
        ? objectsArray
        : objectsArray.filter((obj) => obj.letter === letter);
  
    gridDiv.innerHTML = "";
  
    if (filteredImages.length) {
      populateImageGrid(filteredImages);
      enableButtons(); // Enable buttons when there are images
    } else {
      const message = document.createElement("p");
      message.textContent = "No images found for the selected letter!";
      gridDiv.appendChild(message);
      disableButtons(); // Disable buttons when there are no images
    }
  }
  
  // Function to enable buttons based on available images
  function enableButtons() {
    buttons.forEach((button) => {
      const letter = button.id;
      if (letter !== "all") {
        const hasImages = objectsArray.some((obj) => obj.letter === letter);
        button.classList.toggle("disabled", !hasImages);
      }
    });
  }
  
  // Function to disable buttons when no images are available
  function disableButtons() {
    buttons.forEach((button) => {
      if (button.id !== "all") {
        button.classList.add("disabled");
      }
    });
  }
  
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const letter = button.id;
      filterImages(letter);
    });
  });
  
  document.getElementById("all").click(); // Trigger click on the 'All' button
  
  // Attach a single event listener to stop propagation for modal content clicks
  const modalContent = document.querySelector(".modal-content");
  modalContent.onclick = function (e) {
    e.stopPropagation();
  };
  
  // Function to open the modal
  function openModal(imageSrc, title, description) {
    let currentIndex = objectsArray.findIndex((obj) => obj.source === imageSrc);
  
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
  
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
  
    modal.style.display = "block";
  
    // Event listener for arrow key navigation within the modal
    document.addEventListener("keydown", function (e) {
      // Check if the modal is open and the key pressed is an arrow key
      if (
        modal.style.display === "block" &&
        ["ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        if (e.key === "ArrowLeft") {
          // Move to the previous image
          currentIndex =
            (currentIndex - 1 + objectsArray.length) % objectsArray.length;
        } else if (e.key === "ArrowRight") {
          // Move to the next image
          currentIndex = (currentIndex + 1) % objectsArray.length;
        }
  
        // Update the modal content with the new image
        const nextImage = objectsArray[currentIndex];
        openModal(
          nextImage.source,
          `${nextImage.letter.toUpperCase()}`,
          `📍 ${nextImage.location}`
        );
      }
    });
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
  document.querySelector(".modal .close").addEventListener("click", closeModal);
  
  // Close modal when clicking outside the modal
  window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
      closeModal();
    }
  };
  