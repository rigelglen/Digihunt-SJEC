axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
    if (JSON.parse(localStorage.levels)[3]) {
        document.querySelector('.completed').style.display = 'inline';
    }

});

let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');
let resetBtn = document.querySelector("#resetBtn");


resetBtn.addEventListener('click', () => {
    scratchGame.reset();
    inp.value = '';
});

button.addEventListener('click', () => {
    let val = inp.value.trim();
    if (val) {
        scratchGame.evalDirections(val);
    } else {
        swal('Error', 'Incorrect input', 'error');
    }
});

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}


const scratchGame = (() => {
    let grid;
    let currX;
    let currY;
    let currDirection;
    let x;
    let t = [];
    let isReset = false;

    function reset() {
        grid =
            [
                [-1, -1, -1, -1, 3, -1, 5, -1, -1],
                [1, 1, 1, -1, 1, -1, 1, -1, -1],
                [1, -1, 1, 1, 1, -1, 1, 1, 1],
                [1, -1, -1, -1, -1, -1, -1, -1, 1],
                [1, 1, 1, -1, -1, -1, -1, -1, 1],
                [-1, -1, 1, -1, -1, 1, 1, 1, 1],
                [-1, 1, 1, -1, -1, 1, -1, 1, 1],
                [-1, 1, -1, -1, 1, 1, -1, -1, -1],
                [-1, 1, 1, 1, 1, -1, -1, -1, -1]
            ]

        // 0 means up, 2 means right, 3 means down, 4 means left
        // 1 means allowed
        // -1 means not allowed
        // 5 means final solution
        currX = 0;
        currY = 4;
        currDirection = 3;
        x = grid[0].length;
        renderGrid();
        isReset = true;
        if (t) {
            for (var i = 0; i < t.length; i++) {
                clearInterval(t[i]);
            }
        }
    }

    function renderGrid() {
        let gridItem;
        document.getElementById('scratch').innerHTML = '';
        for (var rows = 0; rows < x; rows++) {
            for (var columns = 0; columns < x; columns++) {
                gridItem = document.createElement('div');
                gridItem.classList.add('grid');
                document.getElementById('scratch').appendChild(gridItem);
            };
        };
        let gridItems = document.querySelectorAll('#scratch .grid');
        let flatGrid = flatten(grid);
        isReset = false;
        for (var i = 0; i < gridItems.length; i++) {
            gridItems[i].style.width = 600 / x + "px";
            gridItems[i].style.height = 600 / x + "px";

            if (flatGrid[i] === 1) {
                gridItems[i].style.backgroundColor = "green";
            } else if (flatGrid[i] === -1) {
                gridItems[i].style.backgroundColor = "red";
            } else if (flatGrid[i] === 0 || flatGrid[i] === 2 || flatGrid[i] === 3 || flatGrid[i] === 4) {
                gridItems[i].style.backgroundColor = "yellow";
                gridItems[i].style.backgroundImage = "url('/img/up.png')";
                gridItems[i].style.backgroundSize = "cover";
                if (flatGrid[i] === 2) {
                    gridItems[i].style.transform = "rotate(90deg)";
                } else if (flatGrid[i] === 3) {
                    gridItems[i].style.transform = "rotate(180deg)";
                } else if (flatGrid[i] === 4) {
                    gridItems[i].style.transform = "rotate(270deg)";
                }
            } else if (flatGrid[i] === 5) {
                gridItems[i].style.backgroundColor = "#013801";
            }

        }
    }

    function evalDirections(str) {
        let count = 0;
        reset();

        str = str.replace(/ /g, '').toLowerCase();

        for (var i = 0; i < str.length; i++) {
            let letter = str.charAt(i);
            if (!(letter === 'f' || letter === 'r' || letter === 'l')) {
                swal('Error', 'Incorrect input', 'error');
                inp.value = '';
                return;
            }
        }

        for (var i = 0; i < str.length; i++) {
            let letter = str.charAt(i);
            let timeout;
            t.push(setTimeout(_ => {
                if (letter === 'f') {
                    timeout = forward();
                }
                else if (letter === 'r') {
                    timeout = turnRight();
                }
                else if (letter === 'l') {
                    timeout = turnLeft();
                }
                if (isReset) {
                    clearTimeout(t);
                }

            }, 400 * count));
            count += 1;
        }
    }

    function turnLeft() {
        if (currDirection === 0) {
            currDirection = 4;
        } else if (currDirection === 2) {
            currDirection = 0;
        } else if (currDirection === 3) {
            currDirection = 2;
        } else if (currDirection === 4) {
            currDirection = 3;
        }
        grid[currX][currY] = currDirection;
        renderGrid();
    }



    function turnRight() {
        if (currDirection === 0) {
            currDirection = 2;
        } else if (currDirection === 2) {
            currDirection = 3;
        } else if (currDirection === 3) {
            currDirection = 4;
        } else if (currDirection === 4) {
            currDirection = 0;
        }
        grid[currX][currY] = currDirection;
        renderGrid();
    }

    function handleWin() {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level4/auth', {
            code: "fddFfg46@rfdfd"
        }).then((response) => {
            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = './level5';
        }).catch((err) => {
            swal('Error', 'Wrong code', 'error');
            document.querySelector(".overlay").style.display = 'none';
        });
    }

    function forward() {
        let prevX = currX;
        let prevY = currY;
        let win = 0;
        let flag = 0;
        try {
            if (currDirection === 0 && (grid[currX - 1][currY] === 1 || grid[currX - 1][currY] === 5)) {
                currX -= 1;
                flag = 1;
            }
            else if (currDirection === 2 && (grid[currX][currY + 1] === 1 || grid[currX][currY + 1] === 5)) {
                currY += 1
                flag = 1;
            }
            else if (currDirection === 3 && (grid[currX + 1][currY] === 1 || grid[currX + 1][currY] === 5)) {
                currX += 1
                flag = 1;
            }
            else if (currDirection === 4 && (grid[currX][currY - 1] === 1 || grid[currX][currY - 1] === 5)) {
                currY -= 1;
                flag = 1;
            } else {
                swal('Error', 'Invalid move', 'error');
                reset();
            }
        } catch (e) {
            swal('Error', 'Invalid move', 'error');
            reset();
        }


        if (flag === 1) {
            grid[prevX][prevY] = 1;

            if (grid[currX][currY] === 5) {
                win = 1;
            }
            grid[currX][currY] = currDirection;
        }
        renderGrid();

        if (win) {
            handleWin();
        }
    }

    reset();
    renderGrid();

    return { evalDirections, reset };
})();