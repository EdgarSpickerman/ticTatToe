!function() {
    'use strict';

    function Player() {
        this.name = name;
        this.setType = (type) => {
            type === 1 ? this.icon = 'o.svg' : this.icon = 'x.svg';
            type === 1 ? this.boxClass = 'box-filled-1' : this.boxClass = 'box-filled-2';
            type === 1 ? this.message = game.p1message : this.message = game.p2message;
            type === 3 ? this.move = 'control' : this.move = '';
        };
    }

    function Map() {
        this.board = $('#board')[0].outerHTML;
        this.events = () => {
            for (var i = 0; i < 9; i++) {
                $('.box')[i].addEventListener('click', setFillBox);
                $('.box')[i].addEventListener('mouseover', setBackGround);
                $('.box')[i].addEventListener('mouseout', removeBackGround);
                $('.box')[i].classList.add(i);
            }
        };
    }

    function Match() {
        this.start = $('div#start')[0].outerHTML;
        this.tie = $('div.screen-win-tie')[0].outerHTML;
        this.p1message = $('div.screen-win-one')[0].outerHTML;
        this.p2message = $('div.screen-win-two')[0].outerHTML;
        this.player1 = new Player('player1');
        this.player2 = new Player('player2');
        this.map = new Map();
        this.winner = () => {
            game.winNum = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [3, 4, 5], [1, 4, 7], [2, 4, 6], [6, 7, 8], [2, 5, 8]];
            let arr = [];
            for (var i = 0; i < $(`.${game.active().boxClass}`).length; i++) {
                arr.push(JSON.parse($(`.${game.active().boxClass}`)[i].classList[1]));
                for (var j = 0; j < 8; j++) {
                    if (arr.includes(game.winNum[j][0]) && arr.includes(game.winNum[j][1]) && arr.includes(game.winNum[j][2])) {
                        $('body div').replaceWith(game.active().message);
                        $('.button').eq(0).click(() => continueGame(1, 2, game.map.board));
                        $('.button').eq(1).click(() => continueGame(1, 3, game.map.board));
                        $('.button').eq(2).click(() => continueGame(1, 4, game.map.board));
                    }
                }/*end of j loop*/
            }/*end of i loop*/
            if ($(`.${game.active().boxClass}`).length >= 5) {
                $('body div').replaceWith(game.tie);
                $('.button').eq(0).click(() => continueGame(1, 2, game.map.board));
                $('.button').eq(1).click(() => continueGame(1, 3, game.map.board));
                $('.button').eq(2).click(() => continueGame(1, 4, game.map.board));
            }
        };
        this.active = () => $('header ul li#player1').hasClass('active') ? game.player1 : game.player2;
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
    }
    function setFillBox() {
        $(this).addClass(game.active().boxClass);
        game.winner();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        this.removeEventListener('click', setFillBox);
        this.removeEventListener('mouseout', removeBackGround);
        this.removeEventListener('mouseover', setBackGround);
        game.randomMove();
    }

    function setBackGround() {
        this.style.backgroundImage = `url('img/${game.active().icon}')`;
    }

    function removeBackGround(){
        this.style.backgroundImage = '';
    }

    function continueGame(type1,type2,state) {
        var game = Object.assign({}, gameInstance);
        $('body div').replaceWith(state);
        $('header ul li#player1').addClass('active');
        game.player1.setType(type1);
        game.player2.setType(type2);
        game.map.events();
    }

    var gameInstance = new Match();
    $('body div').remove();
    var game = Object.assign({}, gameInstance);
    $('body').children().first().before($(game.start));
    $('.button').eq(0).click(() => continueGame(1, 2, game.map.board));
    $('.button').eq(1).click(() => continueGame(1, 3, game.map.board));
    $('.button').eq(2).click(() => continueGame(1, 4, game.map.board));
}();