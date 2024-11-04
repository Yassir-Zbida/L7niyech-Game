const themeSelect = document.getElementById('themeSelect');
const gameBoard = document.querySelector('.gameBoard');
const gameheader = document.querySelector('.gameheader');
const headings = document.querySelectorAll('.heading'); // Changed to plural for clarity
const fullScreen = document.getElementById('fullScreen');
fullScreen.addEventListener('click', fullScreenBtn);

// Screen Function
function fullScreenBtn() {
    document.documentElement.requestFullscreen();
}

// Update Theme Color
function updateGameBoardColor() {
    const selectedTheme = themeSelect.value;

    switch (selectedTheme) {
        case 'greenYellow':
            gameBoard.style.backgroundColor = 'yellow';
            gameheader.style.backgroundColor = 'green';
            // Update text color for all headings
            headings.forEach(heading => {
                heading.style.color = 'black'; 
            });
            break;
        case 'blackWhite':
            gameBoard.style.backgroundColor = '#FFFFFF'; 
            gameBoard.style.border = '2px solid #000'; 
            gameheader.style.backgroundColor = 'black';
            headings.forEach(heading => {
                heading.style.color = 'white'; 
            });
            break;
        case 'redBlue':
            gameBoard.style.backgroundColor = 'blue'; 
            gameheader.style.backgroundColor = 'red';
            headings.forEach(heading => {
                heading.style.color = 'black'; 
            });
            break;
        default:
            gameBoard.style.backgroundColor = '#0000FF'; 
            headings.forEach(heading => {
                heading.style.color = 'white'; 
            });
    }
}

themeSelect.addEventListener('change', updateGameBoardColor);
updateGameBoardColor();
