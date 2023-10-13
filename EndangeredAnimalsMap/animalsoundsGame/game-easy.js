const prompt = document.getElementById('prompt');
const promptText = document.getElementById('prompt-text');
const promptClose = document.getElementById('prompt-close');
const promptOverlay = document.getElementById('prompt-overlay');

//  event listener for the close button
promptClose.addEventListener('click', closePrompt);

//  event listener for the overlay to close the prompt when clicked
promptOverlay.addEventListener('click', closePrompt);


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
        correctOption: 'Animal 1',
        imagePath:'../animalImages/amazon_river_dolphin.png'
    },
    {
        animalName: 'Amur Leopard',
        mp3FileName: 'amur_leopard.mp3',
        options: ['Animal 1', 'Animal 2'],
        correctOption: 'Animal 1',
        imagePath:'../animalImages/amur_leopard.png'
    },
    // Add more objects for other animals and options
];

let currentSoundIndex = 0;
let score = 0;
const audio = document.getElementById('animal-sound'); // Get the single audio element
const nextButton = document.getElementById('next-button');

// Array containing paths to animal images
const animalImages = [
    '../animalImages/african_forest_elephant.png',
    '../animalImages/amazon_river_dolphin.png',
    '../animalImages/amur_leopard.png',
    '../animalImages/black_rhino.png',
    '../animalImages/galapagos_penguin.png',
    '../animalImages/giant_panda.png',    
    "../animalImages/grauer's_gorilla.png",
    '../animalImages/polar_bear.png',
    '../animalImages/tiger.png',
    '../animalImages/whale_shark.png',
    // animals image path
];

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
    const optionContainers = document.querySelectorAll('.option-container');
    const shuffledOptions = shuffleArray(animal.options);

    optionContainers.forEach((container, i) => {
        const button = container.querySelector('.btn-option');
        const animalName = container.querySelector('.animal-name');

        // Hide the text content of the button and animal name
        button.textContent = '';
        animalName.textContent = '';

        if (shuffledOptions[i] === animal.correctOption) {
            // Create an image element for the correct option
            const imgElement = document.createElement('img');
            imgElement.src = animal.imagePath; // Set the image path dynamically
            imgElement.alt = 'Animal Image';

            // Append the image element to the button
            button.appendChild(imgElement);

            // Set the data-correct attribute based on whether it's the correct option
            button.setAttribute('data-correct', 'true');

            // Extract the animal name from the image file name
            const nameFromImage = extractAnimalName(animal.imagePath);

            // Display the correct animal name below the option image
            animalName.textContent = capitalizeFirstLetter(nameFromImage);
        } else {
            // For other options, display a random animal image and name
            const randomImage = getRandomAnimalImage(animal.imagePath);
            const imgElement = document.createElement('img');
            imgElement.src = randomImage;
            imgElement.alt = 'Animal Image';

            // Append the image element to the button
            button.appendChild(imgElement);

            // Set the data-correct attribute to false for incorrect options
            button.setAttribute('data-correct', 'false');

            // Extract the animal name from the random image file name
            const nameFromImage = extractAnimalName(randomImage);

            // Display the random animal name below the option image
            animalName.textContent = capitalizeFirstLetter(nameFromImage);
        }
    });
}

// Function to extract the animal name from the image file name
function extractAnimalName(imagePath) {
    const fileName = imagePath.split('/').pop(); // Get the file name from the path
    const nameWithoutExtension = fileName.split('.')[0]; // Remove the file extension
    const nameWithSpaces = nameWithoutExtension.replace(/_/g, ' '); // Replace underscores with spaces
    return nameWithSpaces;
}

function capitalizeFirstLetter(string) {
    // Replace underscores with spaces
    const stringWithSpaces = string.replace(/_/g, ' ');

    // Capitalize the first letter of each word
    const stringWithCapitals = stringWithSpaces.replace(/\b\w/g, c => c.toUpperCase());

    // Find the position of the apostrophe
    const apostropheIndex = stringWithCapitals.indexOf("'");

    // Check if an apostrophe is found and if it's not the last character in the string
    if (apostropheIndex !== -1 && apostropheIndex !== stringWithCapitals.length - 1) {
        // Replace the 's' after the apostrophe with a lowercase 's'
        const stringWithApostropheLowercased =
            stringWithCapitals.substring(0, apostropheIndex + 1) +
            's' +
            stringWithCapitals.slice(apostropheIndex + 2);

        return stringWithApostropheLowercased;
    } else {
        return stringWithCapitals;
    }
}






function getRandomAnimalImage(excludeImagePath) {
    // Get a random image path excluding the provided one
    const filteredImages = animalImages.filter(image => image !== excludeImagePath);
    const randomIndex = Math.floor(Math.random() * filteredImages.length);
    return filteredImages[randomIndex];
}




function handleOptionClick(event) {
    // Check if the user has already clicked an option for the current animal
    if (currentSoundIndex >= animals.length) {
        return;
    }

    const clickedButton = event.target.closest('.btn-option');
    const prompt = document.getElementById('prompt');
    const promptText = document.getElementById('prompt-text');

    if (clickedButton) {
        const isCorrectOption = clickedButton.getAttribute('data-correct') === 'true';

        // Show a prompt based on whether the option is correct or not
        if (isCorrectOption) {
            if (!animals[currentSoundIndex].clicked) {
                score++;
                const scoreElement = document.getElementById('score');
                scoreElement.textContent = `Score: ${score}`;

                // Set the prompt text and display the prompt
                promptText.textContent = 'Correct! Well done!';
                prompt.style.display = 'block';
            }
            animals[currentSoundIndex].clicked = true;
        } else {
            // Set the prompt text and display the prompt
            promptText.textContent = 'Oops! That\'s not correct. Try again!';
            prompt.style.display = 'block';
        }
    }
}


    function showPrompt(message) {
        const promptElement = document.getElementById('prompt');
        promptElement.textContent = message;
        promptElement.style.display = 'block';
    
        // Add a click event listener to the document to hide the prompt on background click
        document.addEventListener('click', hidePrompt);
    }
    
    // Function to hide the prompt
    function hidePrompt() {
        const promptElement = document.getElementById('prompt');
        promptElement.style.display = 'none';
    
        // Remove the click event listener after hiding the prompt
        document.removeEventListener('click', hidePrompt);


}
    
// Function to close the prompt
function closePrompt() {
    prompt.style.display = 'none';
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

// Function to get a random animal image excluding the correct answer
function getRandomAnimalImage(correctImagePath) {
    const availableImages = animalImages.filter(image => image !== correctImagePath);
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

window.addEventListener('load', initializeGame);
