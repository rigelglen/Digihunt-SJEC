"use strict";/*
JavaScript function to create a simple puzzle with an image in canvas
By MarPlo: http://coursesweb.net/javascript/ | http://www.marplo.net/
Receives:
 id_p = ID of element that will contains <canvas>
 im = object (or string URL) with image
 cols = number of columns
 rows = number of rows
 wg = canvas width (optional)
 hg = canvas height (optional)
*/function PuzzleImg(id_p,im,cols,rows,wg,hg){//nr clicks
//set <canvas> in $div, and properties: $cnv, $cnt, $img, $p_size, $tl_size
function setElms(id_p,im){img=im,""==width&&(width=img.width),""==height&&(height=img.height);//add canvas and solve button
var parent=document.getElementById(id_p);id_solv=id_p+"_solv",parent.innerHTML="<canvas id=\""+id_p+"_cnv\" width=\""+width+"\" height=\""+height+"\" class=\"puzcnv\"></canvas>",parent.style.width=width+2+"px";//set2 properties
var cnv=document.getElementById(id_p+"_cnv");//set image pieces
//register click event
//on mousemove
cnt=cnv.getContext("2d"),p_size={w:img.naturalWidth/cols,h:img.naturalHeight/rows},tl_size={w:width/cols,h:height/rows},setImP(),cnv.addEventListener("click",function(ev){if(0==solv){me.clicks++;var x=ev.offsetX,y=ev.offsetY;//detect clicked tile from $tl_p
for(var id in tl_p)if(y>tl_p[id].ty&&y<tl_p[id].ty+tl_size.h&&x>tl_p[id].tx&&x<tl_p[id].tx+tl_size.w){//if 1st tile, add id in $tl_c and draw border, else, swap tiles
if(-1==tl_c)tl_c=id,drawB(2,"#f00",id);else{var tl2={tx:tl_p[id].tx,ty:tl_p[id].ty,ord:tl_p[id].ord};//data of 2nd tile to be added in 1st tile
//2nd tl
//1st tl
tl_p[id]={px:tl_p[id].px,py:tl_p[id].py,tx:tl_p[tl_c].tx,ty:tl_p[tl_c].ty,ord:tl_p[tl_c].ord,id:id},tl_p[tl_c]={px:tl_p[tl_c].px,py:tl_p[tl_c].py,tx:tl2.tx,ty:tl2.ty,ord:tl2.ord,id:tl_c},drawTL(tl_p),tl_c=-1}break}}}),cnv.addEventListener("mousemove",function(ev){if(0==solv){//if not completed
var x=ev.offsetX,y=ev.offsetY;//detect clicked tile from $tl_p
for(var id in tl_p)if(y>tl_p[id].ty&&y<tl_p[id].ty+tl_size.h&&x>tl_p[id].tx&&x<tl_p[id].tx+tl_size.w){tl_h!=id&&(tl_h=id,drawTL(tl_p),-1!=tl_c&&drawB(2,"#f00",tl_c),drawB(2,"#f8f900",id));break}}})}//get image pieces from $img and set it in $im_p
function setImP(){for(var i=0;i<cols*rows;++i){var c=Math.floor(i/rows),r=i%rows;//current column /rom of piece in img
//add in $im_p object with positions of pieces in image
im_p.push({px:c*p_size.w,py:r*p_size.h,tx:c*tl_size.w,ty:r*tl_size.h,id:i})}for(var j,x,i=im_p.length;i;j=Math.floor(Math.random()*i),x=im_p[--i],im_p[i]=im_p[j],im_p[j]=x);//shuffle array
setTL()}//set tiles in $tl_p from $im_p
function setTL(){for(var i=0;i<im_p.length;i++){var c=Math.floor(i/rows),r=i%rows;//current column /rom of tile in canvas
tl_p[im_p[i].id]={px:im_p[i].px,py:im_p[i].py,tx:c*tl_size.w,ty:r*tl_size.h,ord:i}}drawTL(tl_p)}//draw tiles from $tls
function drawTL(tls){for(var id in tl_p)cnt.drawImage(img,tls[id].px,tls[id].py,p_size.w,p_size.h,tls[id].tx,tls[id].ty,tl_size.w,tl_size.h);checkPuzzle()}//check if tiles are in correct order, else 0
function checkPuzzle(){var re=1;if(0==solv)for(var id in tl_p)if(id!=tl_p[id].ord){re=0;break}1==re&&(cnt.drawImage(img,0,0,width,height),0==solv&&(solv=1,me.solved()))}//to draw border with size $sz and color $cl around tile with $id
function drawB(sz,cl,id){cnt.lineWidth=sz,cnt.strokeStyle=cl,cnt.strokeRect(tl_p[id].tx+1,tl_p[id].ty+1,tl_size.w-2,tl_size.h-2)}//remove button that solves the puzzle
var me=this,img="",cnt="",width=wg?wg:"",height=hg?hg:"",id_solv="",cols=cols,rows=rows,p_size="",tl_size="",im_p=[],tl_p=[],tl_h=-1,tl_c=-1,solv=0;//1 when puzzle is solved, -1 when is solved from button
//called when puzzle is completed
me.clicks=0,me.delSolve=function(){document.getElementById(id_solv).outerHTML="",id_solv=""},me.solved=function(){0<me.clicks&&alert("Congratulations, you solved the puzzle in "+me.clicks+" clicks")},"string"==typeof im?(img=new Image,img.onload=function(){setElms(id_p,img)},img.src=im):(im.outerHTML="<div id=\""+id_p+"e\" class=\"puzelm\"></div>",setElms(id_p+"e",im))}/*
This function uses PuzzleImg() to replace images in webpage with a puzzle game
Receives:
 slc = selector (CSS syntax) for images in page
 cols = number of columns
 rows = number of rows
 solve = if 0, will remove the button that solves the puzzle
 callback = a function called when the puzzle is completed
*/function imgToPuzzle(slc,cols,rows,solve,callback){for(var ob_puz,ims=document.querySelectorAll(slc),i=0;i<ims.length;i++)ob_puz=new PuzzleImg("puz"+i,ims[i],cols,rows),0==solve&&ob_puz.delSolve(),callback&&(ob_puz.solved=callback)}var puz1=new PuzzleImg("puz1","/img/jigsaw.jpg",6,7,600,450);puz1.solved=function(){swal("Success","The name of the dragon is "+"Kilgarah","info")};