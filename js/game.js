var Furry = require('./furry.js');
var Coin = require('./coin.js');

var audio = new Audio('./music/background2.wav');

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
audio.play();


var Game = function () {
    var self = this;


    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.speed = 250;


    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[ this.index( this.furry.x, this.furry.y ) ].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        document.querySelector('.furry').classList.remove('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {


        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y - 1;
        }

        this.gameOver();
        this.hideVisibleFurry();

        this.showFurry();


        this.checkCoinCollision();


    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "down";
                break;
            case 38:
                self.furry.direction = "up";
                break;
            default:
        }
    };

    this.checkCoinCollision = function () {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            var scoreCounter = document.querySelector('#score div strong');

            var audio = new Audio('./music/CoinEcho.wav');
            audio.play();

            this.score++;
            scoreCounter.innerHTML = this.score;

            this.coin = new Coin();

            this.showCoin();

        }
    };

    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, this.speed);
    };

    this.gameOver = function() {
        if ( this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9 ) {
            clearInterval(this.idSetInterval);
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.hideVisibleFurry();

            document.querySelector('#board').classList.add('invisible');
            document.querySelector('#score').classList.add('invisible');
            document.querySelector('#over').classList.remove('invisible');

            var yourScore = document.querySelector('#lastScore');
            yourScore.innerHTML = "Your score: " + this.score;


            // alert("GameOver " + "twoj wynik to: " + this.score);
            //
            audio.pause();
            var audio2 = new Audio('./music/Danger2.wav');
            audio2.play();

        }

    }



};


module.exports = Game;