// difficultySelection.js

// Function to redirect to the selected difficulty mode
function redirectToDifficultyMode(difficulty) {
    // Redirect the user to the selected difficulty mode
    window.location.href = `game-${difficulty.toLowerCase()}.html`;
}

// Attach click event handlers to the difficulty buttons
const easyButton = document.getElementById("easy-button");
const mediumButton = document.getElementById("medium-button");
const hardButton = document.getElementById("hard-button");

if (easyButton) {
    easyButton.addEventListener("click", () => redirectToDifficultyMode("Easy"));
}

if (mediumButton) {
    mediumButton.addEventListener("click", () => redirectToDifficultyMode("Medium"));
}

if (hardButton) {
    hardButton.addEventListener("click", () => redirectToDifficultyMode("Hard"));
}
