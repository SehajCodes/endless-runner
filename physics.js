moveLeft=false
moveRight=false
jump=false

function keyPressed() {
    if (keyCode==ESCAPE) {
        if (fr == framerate) {
            fr = 0
            frameRate(fr)
        } else if (fr == 0) {
            fr = framerate
            frameRate(framerate)
        }
    }
    if (fr == 0) {
        return
    }
    if (keyCode==LEFT_ARROW && moveLeft==false) {
        moveLeft=true
        moveRight=false
    }
    if (keyCode==RIGHT_ARROW && moveRight==false) {
        moveLeft=false
        moveRight=true
    }
    if (keyCode==32 || keyCode==UP_ARROW) {
        jump=true
    }
}

f = 0
frames = 240
function playerMove() {
    if (moveLeft==true) {
        if (playerX>canvasX/6 && playerX<=canvasX*5/6) {
            playerX-=playerSpeed
            if (playerX==canvasX/2) {
                moveLeft=false
            }
        } else {
            moveLeft=false
        }
    }
    if (moveRight==true) {
        if (playerX>=canvasX/6 && playerX<canvasX*5/6) {
            playerX+=playerSpeed
            if (playerX==canvasX/2) {
                moveRight=false
            }
        } else {
            moveRight=false
        }
    }
    if (jump==true) {
        if (f<frames/2) {jumpOffset = f} else {jumpOffset = Math.abs(frames-f)}
        f+=10
        if (f>frames) {
            jumpOffset=0
            f=0
            jump=false
        } else {
            // jumpOffset=0
        }
        // console.log(playerZ+jumpOffset)
    }
}

function checkCollision() {
    i=int(playerX/(canvasX/3))
    j=playerRow
    checkIndex = (j*3)+i
    if (tilesType[checkIndex]=="jumpObstacle" && jump==false) {
        moveLeft = false
        moveRight = false
        jump = false
        if (floor(score/fr) > highScore) {highScore = floor(score/fr)}
        frameRate(0)
        setTimeout(setup, 1000)
    }
    
    // console.log(tilesType[checkIndex])
}