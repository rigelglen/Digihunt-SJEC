"use strict";

axios.get("/getLevels/".concat(localStorage.id)).then(function (response) {
  localStorage.levels = JSON.stringify(response.data.userArray.levels);

  if (JSON.parse(localStorage.levels)[2]) {
    document.querySelector('.completed').style.display = 'inline';
  }
});
var mySnakeBoard = new SNAKE.Board({
  boardContainer: "snakeGame",
  fullScreen: false,
  width: 600
});
var button = document.querySelector('#submitCode');
var inp = document.querySelector('#code');
button.addEventListener('click', function () {
  if (inp.value.trim().length > 4) {
    document.querySelector(".overlay").style.display = 'flex';
    axios.post('/level3/auth', {
      code: inp.value.trim()
    }).then(function (response) {
      console.log("Status is ".concat(response.data.message));
      console.log("Code is ".concat(response.data.code));
      document.querySelector(".overlay").style.display = 'none';
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
      window.location.href = './level4';
    }).catch(function (err) {
      swal('Error', 'Wrong code', 'error');
      document.querySelector(".overlay").style.display = 'none';
    });
  } else {
    swal('Error', 'Incorrect input', 'error');
  }
});