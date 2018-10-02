"use strict";axios.get("/getLevels/".concat(localStorage.id)).then(function(response){localStorage.levels=JSON.stringify(response.data.userArray.levels),JSON.parse(localStorage.levels)[2]&&(document.querySelector(".completed").style.display="inline")});var mySnakeBoard=new SNAKE.Board({boardContainer:"snakeGame",fullScreen:!1,width:600}),button=document.querySelector("#submitCode"),inp=document.querySelector("#code");button.addEventListener("click",function(){4<inp.value.trim().length?(document.querySelector(".overlay").style.display="flex",axios.post("/level3/auth",{code:inp.value.trim()}).then(function(response){console.log("Status is ".concat(response.data.message)),console.log("Code is ".concat(response.data.code)),document.querySelector(".overlay").style.display="none",localStorage.setItem("id",response.data.id),localStorage.setItem("levels",JSON.stringify(response.data.userArray.levels)),window.location.href="./level4"}).catch(function(){swal("Error","Wrong code","error"),document.querySelector(".overlay").style.display="none"})):swal("Error","Incorrect input","error")});