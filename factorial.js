function factorial(n){
    if(n === 0){
        return 1;
    }else{
        return n * factorial(n-1);
    }
}

function factorial2(n){
    let result = 1;
    for(let i=2;i<=n;i++){
        result *= i;
    }
    return result;
}

console.log(factorial(5));
console.log(factorial2(20));

