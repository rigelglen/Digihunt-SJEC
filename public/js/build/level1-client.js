"use strict";axios.get("/getLevels/".concat(localStorage.id)).then(function(response){localStorage.levels=JSON.stringify(response.data.userArray.levels),localStorage.levels&&JSON.parse(localStorage.levels)[0]&&(document.querySelector(".completed").style.display="inline")});var button=document.querySelector("#submitCode"),inp=document.querySelector("#code");button.addEventListener("click",function(){4<inp.value.trim().length?(document.querySelector(".overlay").style.display="flex",axios.post("/level1/auth",{code:inp.value.toLowerCase().trim()}).then(function(response){document.querySelector(".overlay").style.display="none",localStorage.setItem("id",response.data.id),localStorage.setItem("levels",JSON.stringify(response.data.userArray.levels)),window.location.href="./level2"}).catch(function(){swal("Error","Wrong code","error"),document.querySelector(".overlay").style.display="none"})):swal("Error","Incorrect input","error")});