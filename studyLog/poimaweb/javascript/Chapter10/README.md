# 객체

## <u>생성자 함수</u>

- 생성자 함수는 일반적으로 대문자로 시작한다.
- this에 연결되어있는 프로퍼티와 메소드는 public
- 생성자 함수 내에서 선언된 일반 변수는 private

```javascript

function Person(name,gender){
    var married=true;
    this.name=name;
    this.gender=gender;
    this.say()=function(){
        console.log(this.name+'입니다.');
    }
}

var p = new Person("lee","male");

console.log(p.gender);//male
console.log(p.married);//undefined


```

## <u>for-in 문</u>

- for in 문 사용시 객체(배열포함)에 포함된 모든 프로퍼티에 대해 루프를 수행 할 수 있다.
- 객체의 프로퍼티에는 순서가 없으므로 순서가 보장 되지않음.
- !!배열 요소들만을 순회하지 않는다!! -> 단점 해결을 위해 ES6에서 for-of문 추가됨

```javascript
//객체의경우 프로퍼티의 이름 반환!, 순서 보장 x
var person{
    name:'lee',
    age:20,
    gender:'male'
};

for(var p in person)
    console.log(p+":"+person[p]);
/*
name:lee
age:20
gender:male
*/

//배열의 경우 인덱스가 반환!

var arr = ['a','b','c'];
arr.name='my';
for(var i in arr)
    console.log(i+":"+arr[i]);
/*
0:a
1:b
2:c
name:my
*/

```

## <u>for of 문</u>
- 직전의 for in문에서 불가능하던 배열의 요소만 순회 할 수 있게 만듬.
```javascript
for(var i in arr)
    console.log(i);
/*
a
b
c
*/
```

## <u>Pass-by-reference</u>
- object type을 객체 타입 또는 참조 타입이라 한다. 참조 타입이란 모든 연산이 실제 값이 아닌 참조값으로 처리됨을 의미한다.
- 따라서 객체 타입은 동적으로 변화할 수 있으므로 어느정도의 메모리 공간을 확보 해야하는지 예측할 수 없어서 런타임에 메모리공간을홥고하고 메모리의힙영역에 저장된다.
```javascript
var foo={
    num:10
}
var boo =foo;
console.log(boo.num===foo.num);//10 10 -> true

boo.num=20;
console.log(boo.num===foo.num);//20 20 -> true
```

## <u>Pass-by-value</u>
- 원시 타입은 값(value)으로 전달된다. 즉 값이 복사되어 전달된다. 원시 타입은 값이 한번 정해지면 변경할 수 없다.
- 이들의 값은 런타임(변수 할당 시점)에 메모리의 스택 영역에 고정된 메모리 영역을 점유하고 저장된다.
```javascript
var a=1;
var b= a;
console.log(a===b);//1,1 true

a=20;
console.log(a===b);//20,1 false
```