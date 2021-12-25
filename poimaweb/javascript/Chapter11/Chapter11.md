# 11 객체와 변경불가성

## <u>immutable value</u>
- Boolean
- null
- undefined
- Number
- String
- Symbol(New in ECMAScript 6)
        
```javascript
var statement='I am an immutable value';
var otherStr = statement.slice(8,17);

console.log(otherStr);//'immutable'
console.log(statement);
```
## <u>mutlable value</u>
- 원시 타입 이외의 모든 값.
- 객체(Object) 타입
```javascript
var arr=[];
console.log(arr.length);//0

var v2 = arr.push(2);
console.log(arr.length);//1
```

## <u> 불변 데이터 패턴(immutalbe data pattern)</u>
- 객체의 방어적 복사(defensive copy) -> Object.assign

```javascript
// copy
const obj ={a:1};
const copy = Object.assign({},obj);
console.log(copy);//{a:1}
console.log(obj==copy);//false

//merge
const o1 = {a:1};
const o2 = {b:2};
const o3 = {c:3};

const m1 = Object.assign(o1,o2,o3);
console.log(m1);//{a:1,b:2,c:3}
console.log(o1);//{a:1,b:2,c:3},타겟 객체 변경

//merge
const o4 = {a:1};
const o5 = {b:2};
const o6 = {c:3};

const m2 = Object.assign({},o4,o5,o6);
console.log(m2);//{a:1,b:2,c:3}
console.log(o4);//{a:1}
```

```javascript
const user1 ={
    name:'LEE',
    address:{
        city:'Seoul'
    }
};

const user2 = Object.assign({},user1);
user2.name="kim";
console.log(user1.name);//LEE
console.log(user2.name);//Kim

//객체 내부의 객체는 Shallow copy된다.
user1.address.city='BUSAN';
console.log(user1.address.city);//BUSAN
console.log(user2.address.city);//BUSAN
```

- 불변객체화를 통한 객체 변경 방지 -> Object.freeze
``` javascript
//Object.freeze()를 사용하여 불변객체로 만듬
//but 객체 내부의 객체까지 변경 불가! -> deepfreeze이용.
const user ={
name: 'Lee',
address:{
    city: 'seoul'
}
};

Object.freeze(user);

user.name='kim'//변경안된다.
user.address.city='busan';//변경된다.
console.log(user);//{name:Lee,address:{city:'busan'}}
```