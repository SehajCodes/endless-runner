function preload() {
    rail = loadImage('assets/rail.png');
    lava = loadImage('assets/lava.png');
    player1 = loadImage('assets/player1.png');
    player2 = loadImage('assets/player2.png');
    // lava1 = loadImage('assets/lava1.png');
    // lava2 = loadImage('assets/lava2.png');
    highScore = 0
}

function setup() {
    framerate = 30
    fr = framerate
    frameRate(fr)
    canvasX = 450
    canvasY = 800
    createCanvas(canvasX, canvasY)
    tilesRows = 5 //including the one that goes off-screen
    tileSpeed = 5 //pixels per frame
    playerX = canvasX/2
    playerY = canvasY*(((tilesRows-1)*2)-2)/((tilesRows-1)*2)
    playerZ = 50
    playerSpeed = 30
    jumpTilesPercentage = 100
    playerAnimationRate = 10 // frames between sprite change
    playerAnimationCount = 0
    // lavaAnimationRate = 7
    lavaAnimationRate = 255
    lavaAnimationCount = 0
    jump = false
    jumpOffset = 0
    score = 0
    initTiles()
    noSmooth()
    rail.resize(canvasX/3, canvasY/(tilesRows-1))
    lava.resize(canvasX/3, canvasY/(tilesRows-1))
    playerImage = player1
    // lava1.resize(canvasX/3, canvasY/(tilesRows-1))
    // lava2.resize(canvasX/3, canvasY/(tilesRows-1))

    lavaAnimationCounts = []
    for (let i = 0; i<tilesRows*3; i++) {lavaAnimationCounts[i] = round(random(0,255))}

    textFont("Helvetica")
    textWrap(CHAR)
}

function draw() {
    background(0)
    moveTiles()
    checkCollision()
    playerMove()
    drawTiles()
    drawPlayer()
    drawHUD()
    // tempi=checkIndex%3
    // tempj=(checkIndex-tempi)/3
    // tempx = tempi*canvasX/3 + canvasX/6
    // tempy = tilesY[checkIndex]
    // fill(3, 4, 255)
    // noStroke()
    // ellipse(tempx, tempy, 50)
}

function initTiles() {
    tilesX = []
    tilesY = []
    tilesType = []
    for (let j = 0; j<tilesRows; j++) {
        for (let i = 0; i<3; i++) {
            tilesX.push(i*canvasX/3)
            tilesY.push(j*canvasY/(tilesRows-1))
            tilesType.push("blank")
        }
    }
    playerRow = tilesRows-2
    // console.log(playerRow)
}

function moveTiles() {
    for (let j = 0; j<tilesRows; j++) {
        for (let i = 0; i<3; i++) {
            index = (j*3) + i
            tilesY[index]+=tileSpeed
            if (tilesY[index] >= canvasY) {
                tempY = 0
                if (index+3>14) {tempY = tilesY[index+3-15]} else {tempY = tilesY[index+3]}
                tilesY[index] = tempY-(canvasY/(tilesRows-1))
                tilesY[index]+=tileSpeed
                if (random(0,100)>jumpTilesPercentage) {type="blank"} else {type="jumpObstacle"}
                tilesType[index]=type
                outOfScreen=true
            } else {outOfScreen=false}
        }
        if (outOfScreen==true) {
            playerRow--
            if (playerRow<0) {playerRow=tilesRows+playerRow}
            // console.log(tilesType[j*3], tilesType[(j*3)+1], tilesType[(j*3)+2])
            if (tilesType[j*3] == "jumpObstacle" && tilesType[(j*3)+1] == "jumpObstacle" && tilesType[(j*3)+2] == "jumpObstacle") {
                tilesType[(j*3)+floor(random(0,2.9999))] = "blank"
            }
            if (tilesType[j*3] == "jumpObstacle" && tilesType[(j*3)+1] == "jumpObstacle" && tilesType[(j*3)+2] == "jumpObstacle") {
                console.log("man this not good i die soon")
            }
        }
    }
}

function drawTiles() {
    fill(255)
    // lavaAnimationCount+=3
    // if (lavaAnimationCount == lavaAnimationRate) {
            // console.log("yeap")
        // lavaAnimationCount = 0
        // if (lavaImage == lava1) {lavaImage = lava2} else {lavaImage = lava1}
    // }
    for (let j = 0; j<tilesRows; j++) {
        for (let i = 0; i<3; i++) {
            index = j*3 + i
            tileX = tilesX[index]
            tileY = tilesY[index]
            tileType = tilesType[index]
            imageMode(CORNER)
            if (tileType=="blank") {
                strokeWeight(0)
                fill(255)
                rect(tileX, tileY, canvasX/3, canvasY/(tilesRows-1))
                image(rail, tileX, tileY)
            } else if (tileType=="jumpObstacle") {
                // fill(255, 0, 0)
                // strokeWeight(0)
                // fill(255, 0, 0)
                // rect(tileX, tileY, canvasX/3, canvasY/(tilesRows-1))
                image(lava, tileX, tileY)

                // image(lavaImage, tileX, tileY)
                // strokeWeight(10)
                // image(lava1, tileX, tileY)
                // tint(255,Math.abs(lavaAnimationCount-128))
                // image(lava2, tileX, tileY)
                // tint(255)
                // noTint()
                // line(tileX, tileY+canvasY/8, tileX+canvasX/3, tileY+canvasY/8)
            }
        }
    }
}

function drawPlayer() {
    fill(0)
    imageMode(CENTER)
    playerAnimationCount+=1
    if (playerAnimationCount == playerAnimationRate) {
        // console.log("yeap")
        playerAnimationCount = 0
        if (playerImage == player1) {playerImage = player2} else {playerImage = player1}
    }
    image(playerImage, playerX, playerY-jumpOffset-60, 83+(jumpOffset/6), 138+(jumpOffset/6))
    
    // strokeWeight(0)
    // ellipse(playerX, playerY-jumpOffset, 10) // player position
}

function drawHUD() {
    fill(80, 255, 255)
    textSize(22)
    text("HIGH SCORE: ", 16, canvasY-16)
    text("Press ESC to pause/resume", 10, 26)
    fill(255, 255, 0)
    text(highScore, 166, canvasY-16)
    fill(80, 255, 20)
    text((floor(score/fr)), playerX-40, playerY+50-jumpOffset)
    score+=1
}