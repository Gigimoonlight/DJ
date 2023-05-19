musga="";
lwX=0;
lwY=0;
rwX=0;
rwY=0;
function setup(){
    canvas=createCanvas(600, 485);
    canvas.center();
    cam=createCapture(VIDEO);
    cam.hide();
    poseNet=ml5.poseNet(cam, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(cam, 0, 0, 599, 484);
    fill(25, 25, 112);
    circle(lwX, lwY, 30);
    fill(25, 25, 112);
    circle(rwX, rwY, 30);

    nc=Number(lwY);
    na=floor(nc);
    vol=na/500;
    document.getElementById("volume").innerHTML="Volume: "+vol;
    musga.setVolume(vol);

    if(rwY>0 && rwY<100){
        document.getElementById("speed").innerHTML="Velocidade: 0,5x";
        musga.rate(0.5);
    }
    if(rwY>=100 && rwY<200){
        document.getElementById("speed").innerHTML="Velocidade: 1x";
        musga.rate(1);
    }
    if(rwY>=200 && rwY<300){
        document.getElementById("speed").innerHTML="Velocidade: 1,5x";
        musga.rate(1.5);
    }
    if(rwY>=300 && rwY<400){
        document.getElementById("speed").innerHTML="Velocidade: 2x";
        musga.rate(2);
    }
    if(rwY>=400 && rwY<500){
        document.getElementById("speed").innerHTML="Velocidade: 2,5x";
        musga.rate(2.5);
    }
}
function preload(){
    musga=loadSound("music.mp3");
}

function play(){
    musga.play();
    musga.setVolume(1);
    musga.rate(1);
}

function modelLoaded(){
    console.log("x_x");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lwX=results[0].pose.leftWrist.x;
        lwY=results[0].pose.leftWrist.y;
        rwX=results[0].pose.rightWrist.x;
        rwY=results[0].pose.rightWrist.y;
    }
}