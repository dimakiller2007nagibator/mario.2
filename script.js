let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//----------------звуки----------------
let soundStep = new Audio('./sound/step.mp3');
//----------------изображения----------------
let backgroundImage = new Image();

let picPlayerLeft = new Image();
let picPlayerRight = new Image();

let picEnemyLeft = new Image();
let picEnemyRight = new Image();

let picLife = new Image();
let picCoin = new Image();

backgroundImage.src = './pic/background.png';
picLife.src = "./pic/picLife.png";
picPlayerLeft.src = './pic/playerLeft.png';
picPlayerRight.src = './pic/playerRight.png';
picCoin.src = './pic/picCoin.png'
picEnemyLeft.src = './pic/enemyLeft.png';
picEnemyRight.src = './pic/enemyRight.png';

let arrPicPlayer = [];
    arrPicPlayer['right'] = picPlayerRight;
    arrPicPlayer['left'] = picPlayerLeft;

let arrPicEnemy = [];
    arrPicEnemy['right'] = picEnemyRight;
    arrPicEnemy['left'] = picEnemyLeft;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function rescaleImg(img, percent){
    if(img.height > img.width){
        let k = img.height / img.width;
        img.width = window.innerWidth * percent / 100;
        img.height = img.width * k;
    } else {
        let k = img.width / img.height;
        img.height = window.innerHeight * percent / 100;
        img.width = img.height * k;
    }
}

let xPlayer = 60, yPlayer = 475,
    speedPlayer = 5, navigationPlayer = 'right';
    xEnemy = 810, yEnemy = 526, speedEnemy = 15, navigationEnemy = 'left';
    'left', countLife=17, xCoin=0, yCoin=0;
let startGame = false;

function randomPosition(){
    let xRAndom = Math.random()*(innerWidth-pic.width);
    let yRAndom = Math.random()*(innerHeight-pic.height);
    return [xRAndom,yRandom];
}

function hitBox(pic, x, y){
    let picBottom, picRight;
    picRight = x + pic.width;
    picBottom = y + pic.height;
    return [picBottom, picRight];
}
let hitBoxPlayer;
let hitBoxEnemy;

function draw(){
    let picPlayer = arrPicPlayer[navigationPlayer];
    let picEnemy = arrPicEnemy[navigationEnemy];
    rescaleImg(picPlayer, 6);
    rescaleImg(picEnemy, 8);
    rescaleImg(picLife,5);
    hitBoxPlayer = hitBox(picPlayer, xPlayer, yPlayer);
    hitBoxEnemy = hitBox(picEnemy, xEnemy, yEnemy);

    ctx.drawImage(backgroundImage, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height);
    ctx.drawImage(picEnemy, xEnemy, yEnemy, picEnemy.width, picEnemy.height);
    ctx.drawImage(picCoin, xCoin, yCoin, picCoin.width, picCoin.height);
    for(let i=0; i<countLife;i++){
        let xLife = innerWidth*0.05+i*picEnemy.width+0.01;
        let yLife = innerHeight*0.05;
        ctx.drawImage(picLife, xLife, yLife, picLife.width, picLife.height);
    }
    

    function moveEnemy(){
        function collisionEnemy(){
            if(hitBoxPlayer[1]>xEnemy && hitBoxEnemy[1]>xPlayer &&
                yPlayer<hitBoxEnemy[0] && yEnemy<hitBoxPlayer[0]){
                  countLife--;
                    startPosition();
                    if(countLife<=0){
                        soundStep.pause();
                        let newTry = confirm("вы всрали 100000000000000000 БИТКОИНОВ=ВЫ ЛОООООООООХ!!!!!!");
                        if(newTry){
                            countLife = 3;
                        }
                        else{
                            clearTimeout(moveEnemyTimer);
                            return;
                        }
                    }
                }
        }
        collisionEnemy();
        let moveEnemyTimer = setTimeout(()=>{
            if(xEnemy > hitBoxPlayer[1]){
                xEnemy--;
                navigationEnemy='left';
            } else if(hitBoxEnemy[1] >
                 xPlayer){
                xEnemy++;
                navigationEnemy='right';
            } else{
               // добавить звук когда рядом
            }
            draw();
            moveEnemy();
        }, speedEnemy)
    }
    if(startGame){
        startPosition();
        moveEnemy();
        xCoin = randomPosition(picCoin)[0]
        yCoin = randomPosition(picCoin)[1]
        startGame = false;
    }

    function startPosition(){
        xPlayer = window.innerWidth*0.05;
        yPlayer = window.innerHeight*0.78 - picPlayer.height;
        xEnemy = window.innerWidth*0.85;
        yEnemy = window.innerHeight*0.78 - picEnemy.height;
    } 
}

document.addEventListener('keydown',(event)=>{
    let keyPressed = event.code;
    if(keyPressed=="KeyD"){
        xPlayer += speedPlayer;
        navigationPlayer = 'right';
        soundStep.play();
    } else if(keyPressed=="KeyA"){
        xPlayer -= speedPlayer;
        navigationPlayer = 'left';
        soundStep.play();
    } else if(keyPressed=='Enter'){
        startGame = true;
    }
    draw();
});

document.addEventListener('keyup',(event)=>{
    let keyPressed = event.code;
    switch(keyPressed){
        case 'KeyA':
            soundStep.pause();
            break;
        case 'KeyD':
            soundStep.pause();
            break;
    }
})

picLife.onload =backgroundImage.onload = picPlayerRight.onload = picPlayerLeft.onload = picEnemyRight.onload = picEnemyLeft.onload = draw;