
const animals = [
    {
        animalName: 'African Forest Elephant',
        mp3FileName: 'african_forest_elephant.mp3',
        options: ['Animal 1', 'Animal 2'],
        correctOption: 'Animal 1',
        imagePath:'../animalImages/african_forest_elephant.png',
    },

    {
        animalName: 'Amazon River Dolphin',
        mp3FileName: 'amazon_river_dolphin.mp3',
        options: ['Animal 1', 'Animal 2'],
        correctOption: 'Animal 1'
    },
    // Add more objects for other animals and options
];

let currentSoundIndex = 0;
let score = 0;
const audio = document.getElementById('animal-sound'); // Get the single audio element
const nextButton = document.getElementById('next-button');



function initializeGame() {
    // Initialize the "clicked" property for each animal
    animals.forEach(animal => {
        animal.clicked = false;
    });

    // Load the first sound
    loadSound(currentSoundIndex);

    // Add event listeners to option buttons
    const optionButtons = document.querySelectorAll('.btn-option');
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });

    // Add event listeners to the "Previous" and "Next" buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);

    // Initially hide the "Previous" button
    if (currentSoundIndex === 0) {
        prevButton.style.display = 'none';
    }

    // Optionally hide the "Next" button for the last animal
    // Adjust as needed based on your requirements
    if (currentSoundIndex === animals.length - 1) {
        nextButton.style.display = 'none';
    }
}



function loadSound(index) {
    const animal = animals[index];
    const mp3Path = 'animalSounds/' + animal.mp3FileName;
    audio.src = mp3Path;
    audio.currentTime = 0;

    // Display options on the page, randomizing their order
    const optionButtons = document.querySelectorAll('.btn-option');
    const shuffledOptions = shuffleArray(animal.options);

    optionButtons.forEach((button, i) => {
        // Hide the text content of all buttons
        button.textContent = '';

        if (shuffledOptions[i] === animal.correctOption) {
            // Create an image element for the correct option
            const imgElement = document.createElement('img');
            imgElement.src = animal.imagePath; // Set the image path dynamically
            imgElement.alt = 'Animal Image';

            // Append the image element to the button
            button.appendChild(imgElement);
        } else {
            // For other options, display the text content
            button.textContent = shuffledOptions[i];
        }
    });
}


function handleOptionClick(event) {
    // Check if the user has already clicked an option for the current animal
    if (currentSoundIndex >= animals.length) {
        return;
    }

    const clickedElement = event.target;
    const currentAnimal = animals[currentSoundIndex];

    // Check if the clicked element is the image or the button
    const clickedButton = clickedElement.tagName.toLowerCase() === 'img'
        ? clickedElement.parentElement  // If the image was clicked, get the parent button
        : clickedElement;  // If the button was clicked, use it directly

    // Check if the button has an image child
    const hasImage = clickedButton.querySelector('img') !== null;

    if (hasImage && currentAnimal.correctOption === 'Animal 1') {
        // Correct answer, increase score only if the user hasn't clicked an option for this animal before
        if (!currentAnimal.clicked) {
            // Update the score on the page
            score++;
            const scoreElement = document.getElementById('score');
            scoreElement.textContent = `Score: ${score}`;
        }

        // Mark the current animal as clicked
        currentAnimal.clicked = true;
    }
}



function handleNextButtonClick() {
    // Load the next sound when the "Next" button is clicked
    currentSoundIndex++;

    // Show or hide the "Previous" and "Next" buttons based on the index
    updateButtonVisibility();
    
    if (currentSoundIndex < animals.length) {
        loadSound(currentSoundIndex);
    } else {
        // All sounds have been played, end the game
        endGame();
    }
}

function handlePrevButtonClick() {
    // Load the previous sound when the "Previous" button is clicked
    currentSoundIndex--;

    // Show or hide the "Previous" and "Next" buttons based on the index
    updateButtonVisibility();
    
    if (currentSoundIndex >= 0) {
        loadSound(currentSoundIndex);
    } else {
        // If at the first animal, do nothing or handle it as you wish
    }
}

function updateButtonVisibility() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // Show or hide the "Previous" button based on the index
    if (currentSoundIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block'; // or 'block' based on your styling
    }

    // Optionally show or hide the "Next" button for the last animal
    // Adjust as needed based on your requirements
    if (currentSoundIndex === animals.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block'; // or 'block' based on your styling
    }
}

function endGame() {
    // Remove event listeners from option buttons
    const optionButtons = document.querySelectorAll('.btn-option');
    optionButtons.forEach(button => {
        button.removeEventListener('click', handleOptionClick);
    });

    // Display the user's score
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;

    // Reset the game if needed
    // You can add a button or some logic here to reset the game
}

// Shuffle an array randomly
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

window.addEventListener('load', initializeGame);