document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    let width = 10;
    //stores the location of the bombs
    let bombPlots = [];

    function createBoard() {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
            const plot = document.createElement('div');
            plot.setAttribute('id', `${i}-${j}`);
            gameBoard.appendChild(plot);
            }
        }
    }

    function fillPlots(noBombs){
        for (let i = 0; i < noBombs; i++){
            let coord = Math.floor(Math.random() * 100);
            let xCoord = Math.floor(coord/10);
            let yCoord = coord % 10;

            bombPlots.push([xCoord,yCoord]);
        }
    }

    function clicked(plot){
        

    }
    createBoard();
    fillPlots(5);
})