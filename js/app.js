!function () {
    'use strict';
    function Player(name) {
        this.name = name;
        this.setType = (type) => {
            type === 1 ? this.icon = 'o.svg' : this.icon = 'x.svg';
            type === 1 ? this.boxClass = 'box-filled-1' : this.boxClass = 'box-filled-2';
            type === 1 ? this.message = game.p1message : this.message = game.p2message;
            type === 3 ? this.move = 'control' : this.move = '';
        };
    } //Player Constructor also has a set type to set the properties of the players

    function Match() {
        this.active = () => $('header ul li#player1').hasClass('active') ? game.player1 : game.player2;
        this.tie = $('div.screen-win-tie')[0].outerHTML;
        this.p1message = $('div.screen-win-one')[0].outerHTML;
        this.p2message = $('div.screen-win-two')[0].outerHTML;
        this.player1 = new Player('player1');
        this.player2 = new Player('Spaz');
        this.map = new Map();
        this.board = $('#board')[0].outerHTML;
        this.events = () => {
            for (var i = 0; i < 9; i++) {
                $('.box')[i].addEventListener('click', setFillBox);
                $('.box')[i].addEventListener('mouseover', setBackGround);
                $('.box')[i].addEventListener('mouseout', removeBackGround);
                $('.box')[i].classList.add(i);
            }
        }; //generates the events on the board
        this.winner = () => {
            game.winNum = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [3, 4, 5], [1, 4, 7], [2, 4, 6], [6, 7, 8], [2, 5, 8]];
            let arr = [];
            for (var i = 0; i < $(`.${game.active().boxClass}`).length; i++) {
                arr.push(JSON.parse($(`.${game.active().boxClass}`)[i].classList[1]));
                for (var j = 0; j < 8; j++) {
                    if (arr.includes(game.winNum[j][0]) && arr.includes(game.winNum[j][1]) && arr.includes(game.winNum[j][2])) {
                        startGame(game.active().message);
                    }
                }/*end of j loop*/
            }/*end of i loop*/
            if ($(`.${game.active().boxClass}`).length >= 5) {
                startGame(game.tie);
            }
        };//determines if there is a win or tie and advances the board accordingly
        this.randomMove = () => {
            if (game.active().move === 'control') {
                var thinking = true;
                var randomGuess = Math.floor(Math.random() * 9);
                do {
                    if (!$(`.${randomGuess}`).hasClass('box-filled-1') && !$(`.${randomGuess}`).hasClass('box-filled-2')) {
                        thinking = false;
                        $('.box').eq(randomGuess).click();
                    } else {
                        randomGuess = Math.floor(Math.random() * 9);
                    }
                } while (thinking);
            }
        }; //makes computer click a random empty spot
    } //match constructor generates the match with various methods and properties

    function setFillBox() {
        $(this).addClass(game.active().boxClass);
        game.winner();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        this.removeEventListener('click', setFillBox);
        this.removeEventListener('mouseout', removeBackGround);
        this.removeEventListener('mouseover', setBackGround);
        game.randomMove();
    } //1) adds active class to active player, 2)checks to see if win/tie, 3)switches player after click,
    //4)determines if player is computer, 5)removes events on click spots

    function setBackGround() {
        this.style.backgroundImage = `url('img/${game.active().icon}')`;
    } //defines mouse overs

    function removeBackGround() {
        this.style.backgroundImage = '';
    } //defines what happens on mouseouts

    function nameCheck(player1, player2, state) {
        $('.button').css('display', 'none');
        $('input').eq(player1 - 1).css('display', '');
        $('input').eq(player2 - 1).css('display', '');
        $('input').change(() => {
            game.player1Name = $('input').eq(0).val();
            game.player2Name = $('input').eq(1).val();
            game.player1Name.length > 0 && game.player2Name.length > 0 ? newGame(player1, player2, state) : '';
            game.player2Name === '' ? game.player2Name = 'Spaz' : '';
            game.player1Name.length > 0 && player2 !== 2 ? newGame(player1, player2, state) : '';
        });
    }//1) hides buttons, 2)shows approriate inputs for players,3)validates the input

    function playAgain(state) {
        $('body div').replaceWith(state);
        $('header ul li#player1').addClass('active');
        $('#player1 p.names').html(game.player1Name);
        $('#player2 p.names').html(game.player2Name);
        game.events();
    }//what happens when a player clicks play again

    function newGame(type1, type2, state) {
        playAgain(state);
        game.player1.setType(type1);
        game.player2.setType(type2);
        game.events();
    } //what happens after a user clicks any new Game.

    function startGame(state) {
        let message = $('.active').attr('id') === 'player1' ? game.player1Name : game.player2Name;
        $('body div').replaceWith(state);
        state === game.tie ? $('p.message').html("It's a tie!!!") : $('p.message').html(`${message} is the Winner!!!`);
        $('h3 input').css('display', 'none');
        $('.button').eq(0).click(() => nameCheck(1, 2, game.board));
        $('.button').eq(1).click(() => nameCheck(1, 3, game.board));
        $('.button').eq(2).click(() => playAgain(game.board));
    }// changes html to the start screen

    const start = $('div#start')[0].outerHTML;
    let game = new Match();
    $('body div').remove();
    $('body').children().first().before('<div></div');
    startGame(start);
}();