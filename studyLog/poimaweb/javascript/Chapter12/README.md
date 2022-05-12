# 12 함수

## 함수 정의 방식
- 함수 선언문
- 함수 표현식
- Function 생성자 함수 <- 잘 사용하지 않음

 ## <u>함수 선언문</u>

```javascript
//함수 선언문
function square(number){
    return number*number;
}

```

 ## <u>함수 표현식</u>

 ```javascript
 //기명 함수 표현식
 var foo = function multiply(a,b){
     return a*b;
 };
 //익명 함수 표현식
 var xoo=function (a,b){
     return a+b;
 }

 console.log(foo(10,5));//50
 console.log(multiply(10,5));//multiply is not defined
 //함수표현식에서 사용한 함수명은 외부코드에서 접근 불가능하다.
 ```

 ## <u>Function 생성자 함수</u>
 ```javascript
 var square = new Function('number','return number*number');
 console.log(square(10));//100
 ```

 ## <u>함수 호이스팅 </u>
- <u>함수 선언문</u>의 경우 자바스크립트 엔진이 스크립트가 로딩되는 시점에 바로 초기화 하고 이를 VO(variable object)에 저장한다. 즉 함수선언, 초기화,할당이 한번에 이루어진다.
``` javascript
var res = square(5);
//함수선언문 -> 함수 호이스팅 진행!
function square(number){
    return number*number;
}
```
- <u>함수 표현식</u>의 경우 함수 호이스팅이 아니라 변수 호이스팅이 발생한다.
- 변수 호이스팅은 변수 생성및 초기화와 할당이 분리되어 진행된다. 호이스팅된 변수는 undefined로 초기화 되고 실제값의할당은 할당문에서 이루어진다.
- 로딩시점에 변수객체(VO)에 함수를 할당하지 않고 runtime에 해석 되고 실행되므로 이 두가지를 구분하는 것은 중요함. -> js저자는 함수표현식만을 사용할 것을 권고함.

## First-class object (일급 객체)
- 일급 객체란 생성,대입,연산,인자 또는 반환값으로서의 전달 등 프로그래밍 언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.
- 다음 조건을 만족하면 일급 객체로 간주한다.
    - 무명의 리터럴로 표현이 가능하다.
    - 변수나 자료구조(객체,배열 등)에 저장 할 수 있다.
    - 함수의 매개변수에 전달할 수 있다.
    - 반환값으로 사용할 수 있다.

```javascript
// 1.무명의 리터럴료 표현이 가능하다.
// 2.변수나 자료 구조에 저장 할 수 있다.
var increase = function (num){
    return ++num;
}
var decrease = function(num){
    return --num;
}
var predicates={increase,decrease};
// 3.함수의 매개변수에 전달 할 수 있다.
// 4.반환값으로 사용할 수 있다.
function makeCounter(predicate){
    var num = 0;

    return function(){
        num = predicate(num);
        return num;
    };
}

var increaser = makeCounter(predicates.increase);
console.log(increaser());// 1
console.log(increaser());// 2

var decreaser = makeCounter(predicates.decrease);
console.log(decreaser());//-1
console.log(decreaser());//-2
```
- javascript의 함수는 일급객체이다. 따라서 js의 함수는 흡사 변수와 같이 사용할 수 있으며 코드의 어디에서든지 정의할 수 있다.
- 함수와 다른 객체를 구분짓는 특징은 호출할 수 있다는 것이다.

## Call-by-value
- 원시타입 인수는 callbyvalue로 동작
```javascript
function foo(primitive){
    primitive+=1;
    return primitive;
}

var x = 0;

console.log(foo(x));//1
console.log(x);//0
```

## Call-by-reference
- 객체형 인수는 callbyvreference로 동작함.
```javascript
function changeVal(primitive,obj){
    primitive+=100;
    obj.name='kim';
    obj.gender='female';
}

var num = 100;
var obj={
    name:'lee';
    gender:'male';
};

console.log(num);//100
console.log(obj);//Object {name:'lee',gender:'male'}

changeVal(num,obj);

console.log(num);//100
console.log(obj);//Object {name:'kim',gender:'female'}
```

## 함수 객체의 프로퍼티
함수는 객체이다. 따라서 함수도 프로퍼티를 가질 수 있다.
- arguments 프로퍼티 -> 유사 배열객체
- caller 프로퍼티 -> 자신을 호출한 함수 의미
- length 프로퍼티 -> 함수 정의시 작성된 매개변수 갯수를 의미.
- name 프로퍼티 -> 기명함수: 함수명, 익명함수: 빈문자열
- __proto__접근자 프로퍼티 -> 모든 객체는 [[Prototype]]이라는 내부 슬롯이 있다. 프로토 타입 객체란 프로토타입 기반 객체 지향 프로그래밍의 근간을 이루는 객체로서 객체간의 상속을 구혆기 위해 사용된다. 즉 프로토타입 객체는 다른 객체에 공유 프로퍼티를 제공하는 객체를 말한다. 내부슬롯에는 직접접근할 수 없고 __proto__접근자를통해 간접적으로 프로토 타입 객체에 접근 할 수 있다.
- prototype 프로퍼티 -> 함수 객체만이 소유하는 프로퍼티이다. 일반객체에는 prototype 프로퍼티가 없다.

## 즉시 실행 함수
- 함수의 정의와 동시에 실행되는 함수를 즉시 실행 함수라함.
- 최초 한번만 호출되며 다시 호출할 수 는 없다.
```javascript
//기명 즉시 실행 함수
(function muFunction(){
    var a = 3;
    var b = 5;
    return a*b;
}());

//익명 즉시 실행 함수
(function (){
    var a = 3;
    var b = 5;
    return a*b;
}());
```

## 콜백 함수
- 콜백 함수는 함수를 명시적으로 호출하는 방식이 아니라 특정 이벤트가 발생했을 때 시스템에 의해 호출되는 함수를 말한다.
```html
<html>
    <body>
        <button id = "Mybutton">click!</button>
        <script>
           var b=document.getElementById('Mybutton');
           b.addEventListner('click',function(){
               console.log("buton clicked");
           });
        </script>
        
    </body>
</html>
```