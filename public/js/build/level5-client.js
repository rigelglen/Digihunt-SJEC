"use strict";axios.get("/getLevels/".concat(localStorage.id)).then(function(response){console.log(response.data.userArray.levels),localStorage.levels=JSON.stringify(response.data.userArray.levels),JSON.parse(localStorage.levels)[4]&&(document.querySelector(".completed").style.display="inline")});var button=document.querySelector("#submitCode"),inp=document.querySelector("#code"),resetBtn=document.querySelector("#resetBtn");resetBtn.addEventListener("click",function(){scratchGame.reset(),inp.value=""}),button.addEventListener("click",function(){var val=inp.value.trim();val?scratchGame.evalDirections(val):swal("Error","Incorrect input","error")});function flatten(arr){return arr.reduce(function(flat,toFlatten){return flat.concat(Array.isArray(toFlatten)?flatten(toFlatten):toFlatten)},[])}var scratchGame=function(){function reset(){grid=[[1,1,1,-1,1,1],[1,1,0,-1,1,1],[1,1,1,-1,1,1],[1,1,1,-1,1,1],[5,1,1,-1,1,1],[1,1,1,-1,1,1]],currX=1,currY=2,currDirection=0,x=grid[0].length,renderGrid()}function renderGrid(){var gridItem;document.getElementById("scratch").innerHTML="";for(var rows=0;rows<x;rows++)for(var columns=0;columns<x;columns++)gridItem=document.createElement("div"),gridItem.classList.add("grid"),document.getElementById("scratch").appendChild(gridItem);for(var gridItems=document.querySelectorAll(".grid"),flatGrid=flatten(grid),i=0;i<gridItems.length;i++)gridItems[i].style.width=600/x+"px",gridItems[i].style.height=600/x+"px",1===flatGrid[i]?gridItems[i].style.backgroundColor="green":-1===flatGrid[i]?gridItems[i].style.backgroundColor="red":0===flatGrid[i]||2===flatGrid[i]||3===flatGrid[i]||4===flatGrid[i]?(gridItems[i].style.backgroundColor="yellow",gridItems[i].style.backgroundImage="url('/img/up.png')",gridItems[i].style.backgroundSize="cover",2===flatGrid[i]?gridItems[i].style.transform="rotate(90deg)":3===flatGrid[i]?gridItems[i].style.transform="rotate(180deg)":4===flatGrid[i]&&(gridItems[i].style.transform="rotate(270deg)")):5===flatGrid[i]&&(gridItems[i].style.backgroundColor="darkgreen")}function turnLeft(){0==currDirection?currDirection=4:2==currDirection?currDirection=0:3==currDirection?currDirection=2:4==currDirection&&(currDirection=3),grid[currX][currY]=currDirection,renderGrid()}function turnRight(){0==currDirection?currDirection=2:2==currDirection?currDirection=3:3==currDirection?currDirection=4:4==currDirection&&(currDirection=0),grid[currX][currY]=currDirection,renderGrid()}function handleWin(){document.querySelector(".overlay").style.display="flex",axios.post("/level5/auth",{code:inp.value.trim()}).then(function(response){console.log("Status is ".concat(response.data.message)),console.log("Code is ".concat(response.data.code)),document.querySelector(".overlay").style.display="none",localStorage.setItem("id",response.data.id),localStorage.setItem("levels",JSON.stringify(response.data.userArray.levels)),window.location.href="./level6"}).catch(function(){swal("Error","Wrong code","error"),document.querySelector(".overlay").style.display="none"})}function forward(){var prevX=currX,prevY=currY,win=0,flag=0;try{0==currDirection&&(1===grid[currX-1][currY]||5===grid[currX-1][currY])?(currX-=1,flag=1):2==currDirection&&(1===grid[currX][currY+1]||5===grid[currX][currY+1])?(currY+=1,flag=1):3==currDirection&&(1===grid[currX+1][currY]||5===grid[currX+1][currY])?(currX+=1,flag=1):4==currDirection&&(1===grid[currX][currY-1]||5===grid[currX][currY-1])&&(currY-=1,flag=1)}catch(e){swal("Error","Invalid move","error")}1===flag&&(grid[prevX][prevY]=1,5===grid[currX][currY]&&(win=1),grid[currX][currY]=currDirection),renderGrid(),win&&handleWin()}var grid,currX,currY,currDirection,x;return reset(),renderGrid(),{evalDirections:function(str){var count=0;reset();for(var letter,i=0;i<str.length;i++)if(letter=str.charAt(i),"f"!==letter&&"r"!==letter&&"l"!==letter)return swal("Error","Incorrect input","error"),void(inp.value="");for(var _loop=function(){var letter=str.charAt(i),timeout=void 0;setTimeout(function(){"f"===letter?timeout=forward():"r"===letter?timeout=turnRight():"l"===letter&&(timeout=turnLeft())},400*count),count+=1},i=0;i<str.length;i++)_loop()},reset:reset}}();