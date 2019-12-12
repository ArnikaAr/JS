const simonGame = require('./game');
let game = null;

beforeEach(() => {
    document.body.innerHTML = ` <main id="main">
    <div class="game-wrapper">
      <div class="gameboard">
        <button
          id="green"
          title="Green"
          class="game-item up left disabled"
          data-item="0"
        ></button>
        <button
          id="red"
          title="Red"
          class="game-item up right disabled"
          data-item="1"
        ></button>
        <button
          id="yellow"
          title="Yellow"
          class="game-item down left disabled"
          data-item="2"
        ></button>
        <button
          id="blue"
          title="Blue"
          class="game-item down right disabled"
          data-item="3"
        ></button>
        <div class="decoration horizontal"></div>
        <div class="decoration vertical"></div>
        <div class="decoration circle">
          <div class="game-dashboard">
            <div id="score" class="score">
              000
            </div>
            <div class="controls">
              <div class="btn-wrapper">
                <span id="start-lbl">
                  start
                </span>
                <button id="start" class="start"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>`;


    game = new simonGame();
});

describe('test for game', () => {
    it("Testing get random", () => {
        expect(typeof game.random()).toBe("number");
    });
    it('testing increaseScore', () => {
        const preScore = game.score;
        game.increaseScore();
        expect(game.score).toBeGreaterThan(preScore)
    });
    it('testing init', () => {
        game.init();
        expect(game).toMatchObject({
            score: 0,
            delay: 1200,
            secuence: []
        })
    });
    it("Testing for turnOn color", () => {
        game.turnOnColor(1);
        expect(game.buttons[1].classList.contains('active')).toBe(true);
    });

    it("Testing for turnOff color", () => {
        game.turnOffColor(1);
        expect(game.buttons[1].classList.contains('active')).toBe(false);
    });
    it("Testing for addControls funk", () => {
        game.addControls();
        game.buttons.forEach(elem => {
            expect(elem.classList.contains('disabled')).toBe(false);
        })
    });
    it("Testing for removeControls funk", () => {
        game.removeControls();
        game.buttons.forEach(elem => {
            expect(elem.classList.contains('disabled')).toBe(true);
        })
    });
    it("Testing for lost funk", () => {
        const jsdomAlert = window.alert;
        window.alert = () => {
        };
        return
        game.lost();
        expect(game.lblStart.innerText).toBe("start");
        window.alert = jsdomAlert;
    });
    it("Testing for level up", () => {
        game.levelUp();
        expect(game.playerSecuencePosition).toBe(0);
        expect(game.secuence.length).toBeGreaterThan(0);
    });


});