document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    let width = 10;
    let height = 10;
    //stores the location of the bombs
    let bombPlots = [];
    let visited = {};

    function createBoard() {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
            const plot = document.createElement('div');
            plot.addEventListener('click',function(e) {
                clicked(j,i);
            })
            plot.setAttribute('id', `${j}-${i}`);
            gameBoard.appendChild(plot);
            }
        }
    }

    function fillPlots(noBombs){
        for (let i = 0; i < noBombs; i++){
            let xCoord = Math.floor(Math.random() * width);
            let yCoord = Math.floor(Math.random() * height);

            bombPlots.push([xCoord,yCoord]);
        }
    }

    function gameOver(){
        alert("game voer");
    }

    function isBomb(xCoord, yCoord){
        let flag = false;
        bombPlots.forEach(plot => {
            if (plot[0] == xCoord && plot[1] == yCoord) {
                flag = true;
            }
        });
        return flag;
    }

    function clicked(xCoord, yCoord){
        let bound = [];
        let yBound = [];
        let count =0;
        let stack = [];

        console.log("Clicked" , xCoord, yCoord);
        visited[`${xCoord}-${yCoord}`] = 1;

        console.log(visited);

        if (isBomb(xCoord, yCoord)){
            gameOver();
        } else {
            if (xCoord == 0){
                bound.push([0, 1]);
            } else if (xCoord == width -1 ) {
                bound.push([-1, 0]);
            } else {
                bound.push([-1, 1]);
            }

            if (yCoord == 0){
                bound.push([0, 1]);
            } else if (yCoord == height-1 ) {
                bound.push([-1, 0]);
            } else {
                bound.push([-1, 1]);
            }
            
           for(let i = bound[0][0]; i <= bound[0][1]; i++ ){
               for (let j = bound[1][0]; j <= bound[1][1]; j++) {
                   let futureX = xCoord + i;
                   let futureY = yCoord + j;
                   if (!visited.hasOwnProperty(`${futureX}-${futureY}`)) {
                        stack.push([futureX, futureY]);
                        if (isBomb(futureX, futureY)) {
                            count ++;
                        }
                   }
               }
           }
           
           if (count == 0) {
                while(stack.length > 0) {
                    coord = stack.pop();
                    clicked(coord[0], coord[1]);
                }
           }

           const plot = document.getElementById(`${xCoord}-${yCoord}`);
           plot.innerHTML = `${count}`;
            
        }

    }
    createBoard();
    fillPlots(5);
    console.log(bombPlots);
})