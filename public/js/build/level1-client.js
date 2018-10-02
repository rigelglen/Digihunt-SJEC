"use strict";

axios.get("/getLevels/".concat(localStorage.id)).then(function (response) {
  console.log(response.data.userArray.levels);
  localStorage.levels = JSON.stringify(response.data.userArray.levels);

  if (localStorage.levels && JSON.parse(localStorage.levels)[0]) {
    document.querySelector('.completed').style.display = 'inline';
  }
});
var button = document.querySelector('#submitCode');
var inp = document.querySelector('#code');
button.addEventListener('click', function () {
  if (inp.value.trim().length > 4) {
    document.querySelector(".overlay").style.display = 'flex';
    axios.post('/level1/auth', {
      code: inp.value.toLowerCase().trim()
    }).then(function (response) {
      console.log("Status is ".concat(response.data.message));
      console.log("Code is ".concat(response.data.code));
      document.querySelector(".overlay").style.display = 'none';
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
      window.location.href = './level2';
    }).catch(function (err) {
      swal('Error', 'Wrong code', 'error');
      document.querySelector(".overlay").style.display = 'none';
    });
  } else {
    swal('Error', 'Incorrect input', 'error');
  }
});