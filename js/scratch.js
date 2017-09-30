game.winNum = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [3, 4, 5], [1, 4, 7], [2, 4, 6], [6, 7, 8], [2, 5, 8]];
function ai() {
    if (game.active().ai === 'smart') {
        let oArray = [];
        for (var i = 0; i < $('box-filled-1').length; i++) {
            oArray.push(JSON.parse($('box-filled-1')[i].classList[1]));
            let newArray = game.winNum.filter(value => value != oArray[i]);
        }
        console.log(newArray)
    }
}