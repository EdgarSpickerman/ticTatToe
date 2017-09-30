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
    } //Player Constructor

    function Match() {
        this.active = () => $('header ul li#player1').hasClass('active') ? game.player1 : game.player2;
        this.tie = $('div.screen-win-tie')[0].outerHTML;
        this.p1message = $('div.screen-win-one')[0].outerHTML;
        this.p2message = $('div.screen-win-two')[0].outerHTML;
        this.player1 = new Player('player1')
        this.player2 = new Player('Spaz')
        this.map = new Map();
        this.board = $('#board')[0].outerHTML;
        this.events = () => {
            for (var i = 0; i < 9; i++) {
                $('.box')[i].addEventListener('click', setFillBox);
                $('.box')[i].addEventListener('mouseover', setBackGround);
                $('.box')[i].addEventListener('mouseout', removeBackGround);
                $('.box')[i].classList.add(i);
            }
        };
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
        };
        this.randomMove = () => {
            if (game.active().move === 'control') {
                var thinking = true;
                var randomGuess = Math.floor(Math.random() * 9);
                do {
                    if (!$(`.${randomGuess}`).hasClass('box-filled-1') && !$(`.${randomGuess}`).hasClass('box-filled-2')) {
                        thinking = false;
                        $('.box').eq(randomGuess).click();
                    } else {
                        var randomGuess = Math.floor(Math.random() * 9);
                    }
                } while (thinking);
            }
        }
    } //Match or game Constructor

    function setFillBox() {
        $(this).addClass(game.active().boxClass);
        game.winner();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        this.removeEventListener('click', setFillBox);
        this.removeEventListener('mouseout', removeBackGround);
        this.removeEventListener('mouseover', setBackGround);
        game.randomMove();
    } //what happens when a user clicks a button

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
    }//validates and stores the names

    function newGame(type1, type2, state) {
        $('body div').replaceWith(state);
        $('header ul li#player1').addClass('active');
        $('#player1 p.names').html(game.player1Name);
        $('#player2 p.names').html(game.player2Name);
        game.player1.setType(type1);
        game.player2.setType(type2);
        game.events();
    } //what happens after a user clicks any new Game.

    function startGame(state) {
        var message = $('.active').attr('id') === 'player1' ? game.player1Name : game.player2Name;
        $('body div').replaceWith(state);
        $('p.message').html(`${message} is the Winner!!!`)
        $('h3 input').css('display', 'none');
        $('.button').eq(0).click(() => nameCheck(1, 2, game.board));
        $('.button').eq(1).click(() => nameCheck(1, 3, game.board));
        $('.button').eq(2).click(() => nameCheck(1, 3, game.board));
    }// changes html to the start screen

    const start = $('div#start')[0].outerHTML;
    var game = new Match();
    $('body div').remove();
    $('body').children().first().before('<div></div');
    startGame(start);
}();