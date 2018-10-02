axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    console.log(response.data.userArray.levels);
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
    if (JSON.parse(localStorage.levels)[2]) {
        document.querySelector('.completed').style.display = 'inline';
    }
});


const mySnakeBoard = new SNAKE.Board({
    boardContainer: "snakeGame",
    fullScreen: false,
    width: 600
});

let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');

button.addEventListener('click', () => {
    if (inp.value.trim().length > 4) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level3/auth', {
            code: inp.value.trim()
        }).then((response) => {
            console.log(`Status is ${response.data.message}`);
            console.log(`Code is ${response.data.code}`);

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = './level4'
        }).catch((err) => {
            swal('Error', 'Wrong code', 'error');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        swal('Error', 'Incorrect input', 'error');
    }
});