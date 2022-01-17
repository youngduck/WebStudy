# 함수 호출 방식에 의해 결정되는 this
자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받는다.
```javascript
function square(number){
    console.log(arguments);
    console.log(this);

    return number*number;
}

square(2);
```
자바스크립트의 this키워드는 java와같은 익숙한 언어의 개념과 달라 개발자에게 혼란을준다.
자바스크립트의경우 this에 바인딩되는 객체는 한가지가 아니라 함수 호출 방식에 따라 this에 바인딩 되는 객체가 달라진다.

## 함수 호출 방식과 this 바인딩
자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정된다. 다시 말해, 함수를 선언 할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 <u>호출</u>할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
    
    함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수를 선언할 때 결정된다. this 바인딩과 혼동하지 않도록 주의하기 바란다.
함수의 호출하는 방식은 아래와 같이 다양하다.

        1.함수 호출
        2.메소드 호출
        3.생성자 함수 호출
        4.apply/call/bind 호출
```javascript
var foo = function(){
 console.dir(this);
};

//1. 함수 호출
foo(); //window
//window.foo();

//2. 메소드 호출
var obj = {foo:foo};
obj.foo(); //obj

//3. 생성자 함수 호출
var instance = new foo(); //instance

// 4. apply/call/bind 호출
var bar = {name: 'bar'};
foo.call(bar); //bar
foo.apply(bar); //bar
foo.bind(bar)(); //bar
```

## 1. 함수호출
전역객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window, Server-side(Node.js)에서는 global 객체를 의미한다.
```javascript
// in browser console
this === window //true

// in Terinal
node
this === global //true
```

전역객체는 전역스코프를 갖는 전역변수를 프로퍼티로 소유한다. 글로벌 영역에 선언한 함수는 전역객체의 프로퍼티로 접근할 수 있는 전역 변수의 메소드이다.
```javascript
var ga = 'global variable';
console.log(ga);
console.log(window.ga);

function foo(){
    console.log("hi");
}

window.foo();
```
기본적으로 this는 전역객체에 바인딩된다. 전역함수는 물론이고 심지어 내부함수의경우도 this는 외부함수가 아닌 전역객체에 바인딩 된다.
```javascript
function foo(){
    console.log("foo`s this:",this); //window
    function boo(){
        console.log("boo`s this:",this); //window
    }
    boo();
}
foo();
```
또한 메소드의 내부함수일 경우에도 this는 전역객체에 바인딩된다.
```javascript
var value = 1;

var obj = {
    value: 100,
    foo: function(){
        console.log("foo`s this: ",this); //obj
        console.log("foo`s this.value:",this.value);//100
        function bar(){
            console.log("bar`s this: ",this) //window
            console.log("bar`s this.value",this.value);//1
        }
        bar();
    }
};
obj.foo();
```
콜백함수의 경우에도 this는 전역객체에 바인딩된다.
```javascript
var value = 1;

var obj = {
    value:100,
    foo:function(){
        setTimeout(function(){
            console.log("callback`s this: ",this); //window
            console.log("callback`s this.value",this.value);//1
        },100);
    }
};

obj.foo();
```
내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 this는 전역객체를 바인딩한다. 더글라스 크락포드는 "이것은 설계단계의 결함으로 메소드가 내부함수를 사용하여 자신의 작업을 돕게 할 수 없다는 것을 의미한다" 라고 말한다. 내부함수의 this가 전역 객체를 참조하는 것을 회피하는 방법은 아래와 같다.
```javascript
var value = 1;

var obj = {
    value: 100,
    foo: function(){
        var that = this; 


        console.log("foo`s this: ",this); //obj
        console.log("foo`s this.value:",this.value);//100
        function bar(){
            console.log("bar`s this: ",this); //window
            console.log("bar`s this.value",this.value);//1

            console.log("bar`s that: ",that); //obj
            console.log("bar`s that.value: ", that.value);//100
        }
        bar();
    }
};
obj.foo();
```
위 방법 이외에도 자바스크립트는this를 명시적으로 바인딩할 수 있는 apply,call,bind 메소드를 제공한다.

```javascript
var value = 1;

var obj={
    value :100,
    foo:function(){
        console.log("foo`s this: ",this);//obj
        console.log("foo`s this.value: ",this);//100
        function bar(a,b){
            console.log("bar`s this: ", this); //obj
            console.log("bar`s this.value: ", this.value);//100
            console.log("bar`s arguments: ",arguments);
        }
    bar.apply(obj,[1,2]);
    bar.call(obj,1,2);
    bar.bind(obj)(1,2);
    }
};
obj.foo();
```

## 2.메소드 호출
함수가 객체의 프로퍼티 값이면 메소드로서 호출된다. 이때 메소드 내부의 this는 해당 메소드를 소유한 객체, 즉 해당 메소드를 호출한 객체에 바인딩된다.
```javascript
var obj1={
    name:'lee',
    sayName:function(){
        console.log(this.name);
    }
}

var obj2={
    name:'kim'
}

obj2.sayName=obj1.sayName;

obj1.sayName();
obj2.sayName();
```
프로토타입 객체도 메소드를 가질 수 있다. 프로토타입 객체 메소드 내부에서 사용된 this도 일반 메소드 방식과 마찬가지로 해당 메소드를 호출한 객체에 바인딩 된다.
```javascript
function Person(name){
    this.name=name;
}

Person.prototype.getName=function(){
    return this.name;
}

var me = new Person("lee");
console.log(me.getName());

Person.prototype.name='kim';
console.log(Person.prototype.getName());
```
## 3.생성자 함수 호출

자바스크립트의 생성자 함수는 말 그대로 객체를 생성하는 역할을 한다. 하지만 자바와 같은 객체지향 언어의 생성자 함수와는 다르게 그 형식이 정해져 있는 것이 아니라 기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.

이는 반대로 생각하면 생성자 함수가 아닌 일반 함수에 new연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다. 따라서 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을한다.

```javascript
//생성자함수
function Person(name){
    this.name=name;
}

var me = new Person('Lee');
console.log(me); //Person&nbsp;{name:"Lee"}

//new연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person('Kim');
console.log(you); //undefined
```
### 3.1생성자 함수 동작 방식
- new연산자와 함께 생성자함수를 호출하면 this바인딩이 메소드나 함수호출때와 다르게 동작한다.
- new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 수순으로 동작한다.
    
        - 1. 빈 객체 생성 및 this 바인딩
        생성자 함수의 코드가 실행되기 전 빈 객체가 생성된다. 이 빈 객체가 생성자 함수가 새로 생성하는 객체이다. 이후 생성자 함수 내에서 사용되는 this는 이 빈 객체를 가리킨다. 그리고 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.
        - 2. this를 통한 프로퍼티 생성
        생성된 빈 객체에 this를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있다. this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메소드는 새로 생성된 객체에 추가된다.
        - 3. 생성된 객체 반환
        반환문이 없는경우: this에바인딩된 새로 생성한 객체가 반환된다. 명시적으로this를 반환하여도 결과는 같다.

        반환문이 this가 아닌 다른 객체를 명시적으로 반환하는 경우, this가 아닌 해당 객체가 반환된다. 이때 this를 반환하지 않은 함수는 생성자 함수로서의 역할을 수행하지 못한다. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않는다.
```javascript
function Person(name){
    //생성자 함수 코드 실행 전 ----------1
    this.name=name; //------------------2
    //생성된 함수 반환  -----------------3
}
var me = new Person('kim');
console.log(me.name);
```
### 3.2 객체 리터럴 방식과 생성자 함수 방식의 차이
```javascript
//객체 리터럴 방식
var foo ={
    name:'foo',
    gender:'male'
}

console.ldir(foo);

//생성자 함수 방식
function Person(name,gender){
    this.name=name;
    this.gender=gender;
}

var me = new Person('Lee','male');
console.dir(me);

var you = new Person('Kim','female');
console.dir(you);
```
객체 리터럴 방식과 생성자 함수 방식의 차이는 프로토타입 객체에 있다.
- 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype이다.
- 생성자 함수 방식의 경우, 생성된 프로토타입 객체는 Person.prototype이다.

### 3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우
일반 함수를 호출하면 this는전역객체에 바인딩 되지만 new연산자와 함께 생성자 함수를 호출하면 this는 생성자 함수가 암묵적으로 생성한 빈 객체에 바인딩된다.
```javascript
function Person(name){
    //new 없이 호출하는 경우, 전역객체에 name 프로퍼티를 추가
    this.name = name;
};

// 일반 함수로서 호출되었기 때문에 객체를 암묵적으로 생성하여 반환하지 않는다.
//일반 함수의 this는 전역객체를 가리킨다.

var me = Person('Lee');

console.log(me);//undefined
console.log(window.name);//Lee
```

일반함수와 생성자 함수에 특별한 형식적 차이는 없기 때문에 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을한다. 그러나 이러한 규칙을 사용한다 하더라도 실수는 발생할 수 있다.
이러한 위험성을 회피하기 위해 사용되는 패턴(Scope-Safe Constructor)은 다음과 같다. 이 패턴은 대부분의 라이브러리에서 광범위하게 사용된다.

참고로 대부분의 빌트인 생성자(Object,Regex,Array 등)는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.
```javascript
// Scope-Safe Constructor Pattern
function A(arg) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.

  /*
  this가 호출된 함수(arguments.callee, 본 예제의 경우 A)의 인스턴스가 아니면 new 연산자를 사용하지 않은 것이므로 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환한다.
  arguments.callee는 호출된 함수의 이름을 나타낸다. 이 예제의 경우 A로 표기하여도 문제없이 동작하지만 특정함수의 이름과 의존성을 없애기 위해서 arguments.callee를 사용하는 것이 좋다.
  */
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arg);
  }

  // 프로퍼티 생성과 값의 할당
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```
