"use strict";

axios.get("/getLevels/".concat(localStorage.id)).then(function (response) {
  localStorage.levels = JSON.stringify(response.data.userArray.levels);

  if (JSON.parse(localStorage.levels)[1]) {
    document.querySelector('.completed').style.display = 'inline';
  }
});
var button = document.querySelector('#submitCode');
var inp = document.querySelector('#code');
button.addEventListener('click', function () {
  if (inp.value.trim().length > 3) {
    document.querySelector(".overlay").style.display = 'flex';
    axios.post('/level2/auth', {
      code: inp.value.trim()
    }).then(function (response) {
      console.log("Status is ".concat(response.data.message));
      console.log("Code is ".concat(response.data.code));
      document.querySelector(".overlay").style.display = 'none';
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
      window.location.href = './level3';
    }).catch(function (err) {
      swal('Error', 'Wrong code', 'error');
      document.querySelector(".overlay").style.display = 'none';
    });
  } else {
    swal('Error', 'Incorrect input', 'error');
  }
});