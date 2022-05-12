var foo = 'hello';
var bar = 123;
function multiply(x, y) {
    return x * y;
}
var multiply2 = function (x, y) { return x * y; };
console.log(multiply2(4, 4));
console.log(multiply2(6, 2));
