"use strict";axios.get("/getLevels/".concat(localStorage.id)).then(function(response){console.log(response.data.userArray.levels),localStorage.levels=JSON.stringify(response.data.userArray.levels),JSON.parse(localStorage.levels)[3]&&(document.querySelector(".completed").style.display="inline")});var button=document.querySelector("#submitCode"),inp=document.querySelector("#code");button.addEventListener("click",function(){4<inp.value.trim().length?(document.querySelector(".overlay").style.display="flex",axios.post("/level4/auth",{code:inp.value.trim()}).then(function(response){console.log("Status is ".concat(response.data.message)),console.log("Code is ".concat(response.data.code)),document.querySelector(".overlay").style.display="none",localStorage.setItem("id",response.data.id),localStorage.setItem("levels",JSON.stringify(response.data.userArray.levels)),window.location.href="./level5"}).catch(function(){alert("Wrong code"),document.querySelector(".overlay").style.display="none"})):alert("Incorrect input")});