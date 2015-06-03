

function getBaseLog(base ,number) {
  return Math.log(number) / Math.log(base);
}


String.score = function score(n ,time ,wrongs){
    var s = 2000 - 150 * getBaseLog(2,n);
    var temp = Math.max( 1/4 , 1 - (time / 500) - (wrongs / 50));
    return Number(Math.floor( s * temp )) ;
}

// console.log(String.score(3,105,0));
