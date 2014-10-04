function randomRange(e,t){return Math.random()*(t-e)+e}function hexToR(e){return parseInt(cutHex(e).substring(0,2),16)}function hexToG(e){return parseInt(cutHex(e).substring(2,4),16)}function hexToB(e){return parseInt(cutHex(e).substring(4,6),16)}function cutHex(e){return e.charAt(0)=="#"?e.substring(1,7):e}function getMousePos(e,t){var n=e.getBoundingClientRect();var r=document.documentElement;var i=t.clientX-n.top-r.scrollTop;var s=t.clientY-n.left-r.scrollLeft;return{x:i,y:s}}function createParticle(){var e={};switch(POSITION){case"mouse":e.x=mousePosX;e.y=mousePosY;break;case"center":e.x=window.innerWidth/2;e.y=window.innerHeight/2;break;case"random":e.x=randomRange(0,window.innerWidth);e.y=randomRange(0,window.innerHeight);break}e.xSpeed=randomRange(-1*VELOCITY,VELOCITY);e.ySpeed=randomRange(-1*VELOCITY,VELOCITY);var t;if(RANDOM_SIZE==1){t=randomRange(1,MAX_SIZE)}else{t=PARTICLE_SIZE}e.size=t;return e}function init(){canvas=document.getElementById("canvas");c=canvas.getContext("2d");c.canvas.width=window.innerWidth;c.canvas.height=window.innerHeight;canvas.addEventListener("mousemove",function(e){var t=getMousePos(canvas,e);mousePosX=t.x;mousePosY=t.y},false);generateParticles();animate()}function generateParticles(){for(var e=0;e<MAX_PARTICLES;e++){particleArray.push(createParticle())}}function draw(){c.clearRect(0,0,window.innerWidth,window.innerHeight);c.fillStyle=BACK_COLOR;c.fillRect(0,0,window.innerWidth,window.innerHeight);for(var e=0;e<NOW_PARTICLES;e++){var t=particleArray[e];var n=COLOR;if(RANDOM_COLOR==1){var r=Math.random()*255>>0;var i=Math.random()*255>>0;var s=Math.random()*255>>0;n="rgba("+r+", "+i+", "+s+", "+OPACITY+")"}else{n="rgba("+hexToR(n)+", "+hexToG(n)+", "+hexToB(n)+", "+OPACITY+")"}c.beginPath();c.lineWidth=STROKE_SIZE;c.fillStyle=n;if(SHADOW_BLUR>0){c.shadowBlur=SHADOW_BLUR;c.shadowOffsetX=1;c.shadowOffsetY=1;c.shadowColor="rgba(100, 100, 100, 1)"}else{c.shadowBlur=null;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor="rgba(100, 100, 100, 0)"}var o="rgba("+hexToR(STROKE_COLOR)+", "+hexToG(STROKE_COLOR)+", "+hexToB(STROKE_COLOR)+", "+OPACITY+")";c.strokeStyle=o;switch(TYPE_PARTICLE){case"rect":c.fillRect(t.x,t.y,t.size,t.size);if(STROKE_SIZE>0){c.strokeRect(t.x,t.y,t.size,t.size)}break;case"circle":var u=t.size/2;c.arc(t.x,t.y,u,0,2*Math.PI,false);c.fill();if(STROKE_SIZE>0){c.stroke()}break;case"triangle":c.moveTo(t.x,t.y);c.lineTo(t.x+t.size*2,t.y);c.lineTo(t.x+t.size,t.y-t.size);c.lineTo(t.x,t.y);c.fill();if(STROKE_SIZE>0){c.stroke()}break}c.closePath();t.x=t.x+t.xSpeed;t.y=t.y+t.ySpeed;if(DEAD_PARTICLE==1){t.size=t.size*(.9+randomRange(1,10)/100);if(t.size<=.25){particleArray[e]=createParticle()}}else{if(t.x<-t.size||t.y<-t.size||t.x>window.innerWidth+t.size||t.y>window.innerHeight+t.size){particleArray[e]=createParticle()}}}}function animate(){requestAnimationFrame(animate);draw()}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()}var MAX_PARTICLES=50;var NOW_PARTICLES=50;var COLOR="#ffffff";var TYPE_PARTICLE="circle";var POSITION="random";var RANDOM_COLOR=0;var VELOCITY=.5;var BACK_COLOR="transparent";var MAX_SIZE=20;var STROKE_SIZE=3;var STROKE_COLOR="#ffffff";var OPACITY=.15;var RANDOM_SIZE=1;var PARTICLE_SIZE=5;var DEAD_PARTICLE=1;var SHADOW_BLUR=0;var mousePosX=window.innerWidth/2;var mousePosY=window.innerHeight/2;var stats;var canvas;var c;var particleArray=[];$(function(){init()});$(window).resize(function(){var e=document.getElementById("canvas");e.width=window.innerWidth;e.height=window.innerHeight})
