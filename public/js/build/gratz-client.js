"use strict";

axios.get("/getLevels/".concat(localStorage.id)).then(function (response) {
  console.log(response.data.userArray.levels);
  localStorage.levels = JSON.stringify(response.data.userArray.levels);
});