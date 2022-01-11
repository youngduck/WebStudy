# 6 데이터 타입과 변수
## 데이터 타입
### undefined
- undefined의 타입의 값은 undefined가 유일하다 선언이후 값을 할당하지 않은 변수는 undefined 값을 가진다. 즉, 선언은 되었지만 값을 할당하지 않은 변수에 접근하거나 존재하지 않는 객체 프로퍼티에 접근할 경우 undefined가 반한된다.
- 이는 변수 선언에의해 확보된 메모리 공간을 처음 할당이 이루어질때까지 빈상태로 내버려 두지않고 자바스크립트 엔진이 undefined로 초기화 하기 때문이다.
```javascript
var foo;
console.log(foo);//undefined
```
- 개발자가 변수의 값이없다는 것을 명시하고 싶은 경우 undefined를 할당하는 것이아니라 null을 할당한다.

### null
- null 타입의 값은 null이 유일하다. 자바스크립트는 대소문자를 구별하므로 null은 Null,NULL등과 다르다.
- 의도적으로 변수에 값이 없다는 것을 명시할때 사용 한다. 이는 변수가 기억하는 메모리어드레스의 참조 정보를 제거하는 것을 의미하며 자바스크립트 엔진은 누구도 참조하지 않는 메모리 영역에 대해 가비지 콜렉션을 수행할 것이다.
```javascript
var foo = 'lee';
foo = null; //참조정보가 제거됨

var element = document.querySelector('.myElemen');
//HTML문서에 myElem 클래스를 갖는 요소가 없다면 null을반환한다.
console.log(elelment);//null
```

- 타입을 나타내는 문자열을 반환하는 typeof 연산자로 null값을 연산해보면 null이아닌 object가 나오는데 이는 자바스크립트설계상 오류.
```javascript
var foo = null;
console.log(typeof foo); //object
```
- 따라서 null타입을 확인할때 typeof연산자를 사용하면 안되고 일치연산자(===)를 사용하여야 한다.

```javascript
var foo = null;
console.log(typeof foo === null); //false
console.log(foo===null)//true
```

## 변수
### 변수 호이스팅(Variable Hoisting)
```javascript
console.log(foo); //undefined
var foo = 123;
console.log(foo); //123

{
    var foo = 456;
}
console.log(foo); //456
```
- 호이스팅이란 var 선언문이나 function선언문등 모든 선언문이 해당 scope의 선두로 옮겨진 것처럼 동작하는 특성을 말한다.
- 즉,자바스크립트는 모든 선언문이 선언되기 이전에 참조 가능하다.
- var 키워드로 선언된 변수는 선언단계와 초기화 단계가 한번에 이루어진다. 즉, 스코프에 변수가 등록되고 변수는 메모리에 공간을 확보한후 undefined로 초기화 된다. 이러한현상을 변수 호이스팅이라 한다.
### var 키워드로 선언된 변수의 문제점
- 함수레벨 스코프
    - 전역 변수의 남발 
    - for loop 초기화 식에서 사용한 변수를 for loop 외부 또는 전역에서 참조가능 
- var 키워드 생략 허용
    - 의도치 않은 변수의 전역화
- 중복 선언 허용
    - 의도하지 않은 변수값 변경
- 변수 호이스팅
    - 변수를 선언하기 전에 참조가 가능하다.
    
대부분의 문제는 전역변수로 인해 발생한다. 변수의 유효범위(scope)는 좁을 수록 좋다!