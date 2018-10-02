"use strict";

var button = document.querySelector('#submitCode');
var inp = document.querySelector('#code');
button.addEventListener('click', function () {
  if (inp.value.trim().length > 2) {
    document.querySelector(".overlay").style.display = 'flex';
    axios.post('/genID', {
      uid: inp.value.trim()
    }).then(function (response) {
      console.log("Response is ".concat(response.data));
      console.log("ID generated is ".concat(response.data.id));
      document.querySelector(".overlay").style.display = 'none';
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
      window.location.href = '/level1';
    }).catch(function (err) {
      document.querySelector(".overlay").style.display = 'none';
    });
  } else {
    swal('Error', 'Incorrect input', 'error');
  }
});