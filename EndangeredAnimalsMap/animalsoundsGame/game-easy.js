
const animals = [
    {
        animalName: 'African Forest Elephant',
        mp3FileName: 'african_forest_elephant.mp3',
        options: ['Animal 1', 'Animal 2'],
        correctOption: 'Animal 1'
    },
    // Add more objects for other animals and options
];

let currentSoundIndex = 0;
let score = 0;
const audio = new Audio();

function initializeGame() {
    // Load the first sound
    loadSound(currentSoundIndex);

    // Add event listeners to option buttons
    const optionButtons = document.querySelectorAll('.btn-option');
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });
}

function loadSound(index) {
    const animal = animals[index];
    const mp3Path = 'animalSounds/' + animal.mp3FileName;
    audio.src = mp3Path;

    // Display options on the page, randomizing their order
    const optionButtons = document.querySelectorAll('.btn-option');
    const shuffledOptions = shuffleArray(animal.options);
    optionButtons.forEach((button, i) => {
        button.textContent = shuffledOptions[i];
    });
}

function handleOptionClick(event) {
    const selectedOption = event.target.textContent;
    const currentAnimal = animals[currentSoundIndex];

    if (selectedOption === currentAnimal.correctOption) {
        // Correct answer, increase score
        score++;
    }

    // Load the next sound
    currentSoundIndex++;

    if (currentSoundIndex < animals.length) {
        loadSound(currentSoundIndex);
    } else {
        // All sounds have been played, end the game
        endGame();
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

