let bullets: Array<Bullet> = []
let enemies: Array<Enemy> = []

class Enemy {
    xPos: number;
    yPos: number;

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
        led.plot(xPos, yPos)
    }

    flyDown() {
        led.unplot(this.xPos, this.yPos)
        this.yPos++
        led.plot(this.xPos, this.yPos)
    }
}

class Ship {
    xPos: number;
    yPos: number;
    hp: number;

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
        this.hp = 10
    }

    moveRight() {
        if (this.xPos < 4) {
            led.unplot(this.xPos, this.yPos)
            this.xPos++
        }
    }

    moveLeft() {
        if (this.xPos > 0) {
            led.unplot(this.xPos, this.yPos)
            this.xPos--
        }
    }

    pewPew() {
        bullets.push(new Bullet(this.xPos, this.yPos - 1, true))
    }
}

class Bullet {
    xPos: number;
    yPos: number;
    flySpeed: number;
    isUserBullet: boolean;

    constructor(xPos: number, yPos: number, isUserBullet: boolean) {
        this.xPos = xPos
        this.yPos = yPos
        this.isUserBullet = isUserBullet
        this.flySpeed = 1
        led.plot(this.xPos, this.yPos)
    }

    flyUp() {
        led.unplot(this.xPos, this.yPos)
        this.yPos--
        led.plot(this.xPos, this.yPos)
    }
}

input.onButtonPressed(Button.AB, function () {
    userSpaceShip.pewPew()
})
input.onButtonPressed(Button.B, function () {
    userSpaceShip.moveRight()
})
input.onButtonPressed(Button.A, function () {
    userSpaceShip.moveLeft()
})

let i = 0
let enemiesMoveCounter = 0
let userSpaceShip = new Ship(2, 4);

function updateScreen() {
    led.plot(userSpaceShip.xPos, userSpaceShip.yPos)
    for (i = 0; i < bullets.length; i++) {
        bullets[i].flyUp()
    }

    checkCollisions()

    enemiesMoveCounter++
    if (enemiesMoveCounter == 9) {
        for (i = 0; i < enemies.length; i++) {
            enemies[i].flyDown()
        }
        enemiesMoveCounter = 0
    }

    basic.pause(120)
}

function checkCollisions() {
    for (i = 0; i < bullets.length; i++) {
        for (e = 0; e < enemies.length; e++) {
            if (bullets[i].xPos == enemies[e].xPos && bullets[i].yPos == enemies[e].yPos) {
                led.unplot(bullets[i].xPos, bullets[i].yPos)
                bullets.removeAt(i)
                enemies.removeAt(e)
            }
        }
    }
}

let e = 0
function spawnEnemies(height: number) {
    for (e = 0; e < 5; e++) {
        if (e % 2 == 0) {
            enemies.push(new Enemy(e, height + 1))
        } else {
            enemies.push(new Enemy(e, height))
        }
    }
}

spawnEnemies(0)

basic.forever(function () {
    updateScreen()
})