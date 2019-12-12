class Game {
    constructor() {
        this.getBtn();
        this.secuence = [];
        this.delay = 1200;
        this.buttons = [
            this.btnGreen,
            this.btnRed,
            this.btnYellow,
            this.btnBlue,
        ];
        this.score = 0;
        this.playerSecuencePosition = 0;
        this.btnStart.addEventListener('click', () => {
            this.lblStart.innerText = "reset";
            this.init();
        });

        this.click = this.click.bind(this);
    }
    random(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
    getBtn(){
        this.lblScore = document.getElementById('score');
        this.btnGreen = document.getElementById('green');
        this.btnRed = document.getElementById('red');
        this.btnYellow = document.getElementById('yellow');
        this.btnBlue = document.getElementById('blue');

        this.lblStart = document.getElementById('start-lbl');
        this.btnStart = document.getElementById('start');
    }
    increaseScore() {
        this.score++;
        const scoreStr = this.score.toString();
        const scoreFormat = scoreStr.length < 3 ? '0'.repeat(3 - scoreStr.length) + scoreStr: scoreStr;
        this.lblScore.innerText = scoreFormat.length >= 7 ? scoreFormat.substr(0, 6) + '+' : scoreFormat;
    }
    init() {
        this.score = 0;
        this.lblScore.innerText = "000";
        this.delay = 1200;
        this.secuence = [];
        this.levelUp();
    }
    turnOnColor(index) {
        this.buttons[index].classList.add('active');
    }
    turnOffColor(index) {
        this.buttons[index].classList.remove('active');
    }
    addControls() {
        this.buttons.forEach((item) => {
            item.classList.remove('disabled');
            item.addEventListener('click', this.click);
        });
    }
    removeControls() {
        this.buttons.forEach((item) => {
            item.classList.add('disabled');
            item.removeEventListener('click', this.click);
        });
    }
    lost() {
        alert('You lost');
        this.lblStart.innerText = 'start';
        this.removeControls();
    }
    levelUp() {
        const interval = 300;
        if (this.delay > interval) {
            this.delay -= this.secuence.length * 3;
        }
        let end = 0;
        let start = 0;
        this.playerSecuencePosition = 0;
        const next = this.random(0, 3);
        this.secuence.push(next);
        this.removeControls();
        setTimeout(() => {
            this.secuence.forEach((i, idx) => {
                const intervalFlag = idx === 0 ? 0 : interval;
                end = this.delay * (idx + 1);
                start = idx === 0 ? 0 :  end - this.delay;
                // On
                setTimeout(() => {
                    this.turnOnColor(i);
                }, start + intervalFlag);
                // Off
                setTimeout(() => {
                    this.turnOffColor(i);
                }, end);
            });
            setTimeout(() => {
                this.addControls();
            }, end + interval / 2);
        }, interval);
    }
    click({ target }) {
        const { item } = target.dataset;
        const pPos = this.playerSecuencePosition;

        if (this.secuence[pPos] === parseInt(item, 10)) {
            this.increaseScore();
            if (pPos >= this.secuence.length - 1) {
                this.levelUp();
            } else {
                this.playerSecuencePosition++;
            }
        } else {
            this.lost();
        }
    }
}

window.onload = () => {
    new Game();
};
 module.exports = Game;