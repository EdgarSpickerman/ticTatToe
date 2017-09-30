
function loopChecker(arr, fillClass, posArray,winArray) {
    for (var i = 0; i < $(fillClass).length; i++) {
        arr.push($(fillClass)[i].classList[1]);
        posArray = posArray.filter((val)=> val!== arr[i]);
        checkForWinner(arr,winArray);
    }
}
function checkForWinner(arr, winArray) {
    for (var j = 0; j < 8; j++) {
        if (arr.includes(winArray[j][0]) && arr.includes(winArray[j][1]) && arr.includes(winArray[j][2])) {
            arr === oArray ? score -= 10 - xArray.length : score += 10 - xArray.length;
            break
        }
    }
}
function nextOpenSpot(arr, plusOneArray,winArray) {
    arr.push(plusOneArray[0]);
    plusOneArray.filter((val) => val !== arr[arr.length - 1]);
    checkForWinner(arr, winArray);
}
function ai() {
    let posArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let winArray = [
        ['0', '1', '2'], ['0', '3', '6'], ['0', '4', '8'], ['3', '4', '5'],
        ['1', '4', '7'], ['2', '4', '6'], ['6', '7', '8'], ['2', '5', '8']
    ];
    let oArray = [];
    let xArray = [];
    loopChecker(oArray, '.box-filled-1', posArray, winArray);
    loopChecker(xArray, '.box-filled-2', posArray, winArray);

    for (var j = 0; j < posArray.length; j++) {
        let scorePos = {};
        let resultArray = [];
        let score = 0;
        xArray.push(posArray[j]);
        posArray = posArray.filter((val) => val !== xArray[xArray.length - 1]);
        checkForWinner(xArray,winArray);
        let plusOneArray = posArray;
        //do {
            nextOpenSpot(oArray, plusOneArray, winArray)
            nextOpenSpot(xArray, plusOneArray, winArray)
            console.log(plusOneArray);
            console.log(xArray);
            console.log(oArray);

        //} while (plusOneArray.length > 0);
        //scorePos.score = score;
        //scorePos.pos = h;
        //resultArray.push(scorePos);
        //console.log(scorePos)
    }
}