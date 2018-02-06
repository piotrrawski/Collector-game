document.addEventListener("DOMContentLoaded", function() {


    var Game = require('./game.js');

    var game = new Game();

    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function(event) {
        game.turnFurry(event);
    });

    var reload = document.getElementById("reload");
    reload.addEventListener('click', function(){
        console.log("hello");
        location.reload();
    });


});