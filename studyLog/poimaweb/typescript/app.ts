let foo: string = 'hello';
let bar: number = 123;

function multiply(x:number,y:number):number{
    return x*y;
}

const multiply2 =(x:number,y:number):number=>x*y


console.log(multiply2(4,4))
console.log(multiply2(6,2))

interface Todo{
    id:number;
    content:string;
    completed:boolean;
}