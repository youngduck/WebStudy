# 14 프로토 타입
## 프로토타입 객체
- java,c++과 같은 클래스기반 객체지향프로그래밍 언어와 달리 javascript는 프로토타입 기반 객체지향 프로그래밍언어.
## [[Prototype]] vs prototype 프로퍼티
- 모든 객체는 자신의 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯을 갖으며 상속을 위해 사용된다.
- 함수도 객체 이므로 [[Prototype]]을 갖는다 그런데 함수객체는 일반객체와 달리 prototype 프로퍼티도 소유하게 된다.
```javascript
function Person(name){
    this.name=name;
}

var foo = new Person('lee');

console.dir(Person);//prototype 프로퍼티가 있다.
console.dir(foo);//prototype 프로퍼티가 없다.
```

```javascript
//정리
a.__proto__ : [[Prototype]],프로토타입객체 모든 요소에 다있고 위로 참조하기 위한 존재.
a.prototype : 포로토타입 프로퍼티, 함수 생성시 생기는 요소로 객체에게 전달해주기 위한 존재.
```

## constructor 프로퍼티

- 프로토타입 객체는 cosntructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 객체의 이방에서 자신을 생성한 객체를 가리킨다.
```javascript

function Person(name){
    this.name=name;
}

var foo = new Person('Lee');

//Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(Person.prototype.constructor === Person);

//foo 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(foo.constructor === Person);

//Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
console.log(Person.constructor === Function);
```

## Prototype chain
    - 자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토 타입의 객체의 프로퍼티나 메소드를 차례대로 검색한다. 이것을 프로토타입 체인이라 한다.
```javascript
function Person(name,gender){
    this.name=name;
    this.gender=gender;
    this.sayHello=function(){
        console.log('hi my name is '+this.name);
    };
}

var foo = new Person('lee','male');

console.dir(Person);
console.dir(foo);

console.log(foo.__proto__===Person.prototype);//true
console.log(Person.prototype.__proto__===Object.prototype);//true
console.log(Person.prototype.constructor===Person);//true
console.log(Person.__proto__===Function.prototype);//true
console.log(Function.prototype.__proto__===Object.prototype);//true
```
- foo객체의 프로토타입객체 Person.prototype객체와 Person()생성자 함수의 프로토타입 객체인 Function.prototype의 프로토타입 객체는 Object.prototype 객체이다. 이는 객체 리터럴 방식이나 생성자 함수 방식이나 결국은 모든객체의 부모객체인 Object.prototype 객체에서 프로토타입 체인이 끝나기 때문이다. 이때 Object.prototype객체를 프로토타입체인의 종점이라 한다.

## 프로토타입 객체의 확장
- 프로토타입 객체도 객체이므로 일반 객체와 같이 프로퍼티를 추가/삭제할 수 있다. 그리고 이렇게 추가/삭제된 프로퍼티는 즉시 프로토타입 체인에 반영된다.
```javascript
function Person(name){
    this.name=name;
}

var foo = new Person('lee');

Person.prototype.sayhello=function(){
console.log(this.name);
};

foo.sayhello();
```

## 원시 타입의 확장
- 자바스크립트에서 원시 타입을 제외한 모든것은 객체이다. 그런데 아래 예제를 살펴보면 원시 타입인 문자열이 객체와 유사하게 동작한다.
```javascript
var str = 'test';
console.log(typeof str); //string
console.log(str.constructor === String); //true
console.log(dir(str)); //test

var strObj = new String('test');
console.log(typeof strObj); //object
console.log(strOj.constructor === String);
console.dir(strObj); //{0: "t",1:"e",2:"s",3:"t", length:4,__proto__:String,[[PrimitiveValue]]: "test"}

console.log(str.toUpperCase()); //TEST
console.log(strObj.toUpperCase()); //TEST
```

- 원시타입은 객체가 아니므로 프로퍼티나 메소드를 직접 추가할 수 없다.
```javascript
var str = 'test';
str.myMethod = function(){
    console.log('str.myMethod');
};
str.myMethod(); //에러발생
```
- 하지만 String 객체의 프로토타입 객체에 메소드를 추가하면 원시타입,객체 모두 메소드를 사용 할 수 있다.
```javascript
var str = 'test';

String.prototype.myMethod = function(){
    return 'myMethod';
};

console.log(str.myMethod());//myMethod
console.log('string'.myMethod());//myMethod
console.dir(String.prototype);
```

- 
### 추가로 prototype이해하는데 공부한 사이트.
https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67

