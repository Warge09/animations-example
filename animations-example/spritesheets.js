let canvas = null
let context = null

function runGameLoop() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    gameLoop = new GameLoop();
    gameLoop.start();
    gameLoop.run();

}

dialogues = [
    {text:"Hello",
    options:[
        {prompt: 'Rumors', response: 'Have you heard of the high elves?'},
        {prompt: 'bye', response: 'farewell'}
    ]},
    {text:"blah blah",
        options:[
            {prompt: 'Option 1', response: 'Have you heard of the high elves?'},
            {prompt: 'Option 2', response: 'farewell'}
    ]}
        
]

class Sprite {
    constructor(image) {
        this.image = new Image(32, 32);
        this.image.src = image
    }

    draw(x, y) {
        context.drawImage(this.image, 0, 0, 32, 32, x, y, 64, 64);
    }
}

class SpriteSheet extends Sprite {
    constructor(image, nFrames) {
        super(image)

        this.nframes = nFrames
        this._currentFrame = 0
        this._timer = 0;
        this._updateRate = 0.05
    }

    draw(x, y) {
        context.drawImage(this.image, this._currentFrame * 32, 0, 32, 32, x, y, 64, 64);
    } 

    update(deltaTime) {
        this._timer += deltaTime;
        if (this._timer > this._updateRate) {
            this._timer = 0;
            this._currentFrame = (this._currentFrame + 1) % this.nframes
        }
    }
}




class NPC {
    constructor(character) {
        this.width = 32;
        this.sprite = new Sprite('character.png');
        this._x = 250;
        this._y = canvas.height - this.width;
        this.character = character
    }

    draw() {
        this.sprite.draw(this._x, this._y - 32)

        if (this.character.response == null) {
            context.font = "bold 18px serif";
            context.fillText(dialogues[0].text, this._x, this._y - 64)

        } else {
            context.font = "bold 18px serif";
            context.fillText(dialogues[0].options[this.character.response].response, this._x, this._y - 60)
        }

    }
}

class Character {
    constructor() {
        this.sprite = new SpriteSheet('Idle (32x32).png', 11)
        this.speed = 500;
        this.width = 64;
        this._x = 50;
        this._y = canvas.height - this.width;
        this.horizontal_force = 0
        this.vertical_force = 0
        this.response = null

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.horizontal_force = -this.speed;
               
            }
            if (event.key === 'ArrowRight') {
                this.horizontal_force = this.speed;
            }
            if (event.key === 'ArrowUp') {
                this.vertical_force = -this.speed;
               
            }
            if (event.key === 'ArrowDown') {
                this.vertical_force = this.speed;
            }
        });
        
        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                this.horizontal_force = 0;
            }
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' ) {
                this.vertical_force = 0;
            }
        });
    }
    
    draw() {
        this.sprite.draw(this._x, this._y);

        if (this.response != null) {
            context.font = "bold 18px serif";

            context.fillText(dialogues[0].options[this.response].prompt, this._x, this._y - 60)
        }
    }
    update(deltaTime) {
        this._x += this.horizontal_force * deltaTime;
        this._y += this.vertical_force * deltaTime;
        this.sprite.update(deltaTime)
    }

}


class GameLoop {
    constructor() {
        this.keep_running = true;
        this.lastFrameTime = new Date().getMilliseconds();

        this.character = new Character();
        this.npc = new NPC(this.character);
        this.buttons = document.getElementById("dialogueBox");
    }

    start() {
        console.log(canvas.width);
        console.log(canvas.height);

        for (let i = 0; i < dialogues[0].options.length; i++) {
            const button = document.createElement('button');
            for (range = 0; i <inrange )
            button.style.visibility = "visible";
            button.textContent = `Button ${i}`;
            
            // Add an event listener to each button
            button.addEventListener('click', () => {
                this.character.response = i
                console.log(this.character.response)
            });
            
            this.buttons.appendChild(button);
        }

    }
    update(deltaTime) {

        this.character.update(deltaTime);
    }
    drawDialogue() {

    }
    run() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        this.update(deltaTime);
        
        this.character.draw();
        this.npc.draw();

        this.lastFrameTime = currentTime; 

        requestAnimationFrame(() => { this.run(); });
    }
    get keepAlive() {
        return this.keep_running;
    }

    quit() {
        alert('bye')
    }
}
