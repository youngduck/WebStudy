# 클로저

## 1.클로저의 개념
클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(얼랭,스칼라,하스켈,리스프...)에서 사용되는 중요한 특성이다.

클로저는 자바스크립트의 개념이 아니므로 ECMAScript 명세에 클로저의 정의가 등장하지 않는다. 클로저에 대해 MDN은 아래와 같이 정의하고 있다.

"A closure is the combination of a function and the lexical environment within which that function was declared."
클로저는 함수와 그함수가 선언됐을때의 렉시컬 환경과의 조합이다.

여기서 중요한 키워드는 "함수가 선언됐을때의 렉시컬환경"이다.

```javascript
function outerFunc(){
    var x = 10;
    var innerFunc = function(){console.log(x);};
    innerFunc();
}

outerFunc();//10
```

내부함수 innerFunc가 호출되면 자신의 실행 컨텍스트가 실행컨텍스트 스택에 쌓이고 변수 객체와 스코프체인 그리고 this에 바인딩할 객체가 결정딘다. 이때 스코프 체인은 전역 스코프를 가리키는 전영객체와 함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성객체 그리고 함수 자신의 스코프를 가리키는 활성객체를 순차적으로 바인딩한다. 스코프 체인이 바인딩한 객체가 바로 렉시컬 스코프의 실체이다.

이번에는내부함수innerFunc를 함수 outerFunc 내에서 호출하는 것이 아니라 반환하도록 변경해 보자.
```javascript
function outerFunc(){
    var x = 10;
    var innerFunc = function(){console.log(x);};
    return innerFunc;
}

/**
함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
**/
var inner = outerFunc();
inner(); //10
```
함수 outerFunc는 내부함수 innerFunc를 반환하고 생을 마감했다. 즉, 함수 outerFunc는 실행된 이후 콜스택(실행컨텍스트 스택)에서 제거되었으므로 함수 outerFunc의 변수 x또한 더이상 유효하지 않게 되어 변수 x에 접근할 수 있는 방법은 달리 없어보인다. 그러나 위코드이 실행 결과는 변수 x의 값인 10 이다. 이미 life-cycle이 종료되어 실행 컨텍스트 스택에서 제거된 함수 outerFunc의 지역변수 x가 다시 부활이라도 한 듯이 동작하고 있다. 뭔가 특별한 일이 일어나고 있는 것 같다.

이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(Closure)라고 부른다.

## 2.클로저의 활용
클로저는 자신이 생성될 때의 환경(렉시컬)을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다. 하지만 클로저는 자바스크립트의 강력한 기능으로 이를 적극적으로 사용해야 한다. 클로저가 유용하게 사용되는 상황에 대해 살펴보자.

### 2.1 상태유지
클로저가 가장 유용하게 사용되는 상황은 현재 상태를 기억하고 변경된 최신 상태를 유지하는 것이다. 아래 예제를 살펴보자.

```html
<html>
<head>
</head>
<body>
    <button class="toggle">toggle</button>
    <div class="box" style="width:100px; height:100px; background-color:red;"></div>

    <script>
        var box = document.querySelector('.box');
        var toggleBtn = document.querySelector('.toggle');

        var toggle=(function(){
            var isShow=false;

            //1.클로저를 반환
            return function(){
                box.style.display=isShow ? 'block' : 'none';
                //3.상태 변경
                isShow = !isShow;
            };
        })();

        //2.이벤트 프로퍼티에 클로저를 할당
        toggleBtn.onclick=toggle;
    </script>
</body>
</html>
```
1.즉시실행함수는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경에 속한 변수 isShow를 기억하는 클로저다. 클로저가 기억하는 변수 isShow는 box요소의 표시 상태를 나타낸다.

2.클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 다시 말해 현재 상태를 기억한다.

3.버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 .box요소의 표시상태를 나타내는 변수 isShow의 값이 변경된다. isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 상태를 계속해서 유지한다.

만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다. 전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

### 2.2 전역 변수의 사용 억제
직접짠 closure예제
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <p>전역 변수를 사용한 Counting</p>
    <button id="inclease">+</button>
    <p id="count">0</p>
    <script>
        var incleaseBtn = document.getElementById('inclease');
        var count = document.getElementById('count');

        var counter=(function(){
            var num = 0;
            return function(){
                num=num+1;
                count.innerHTML=num;
            };
        }());

        incleaseBtn.onclick=counter;
    </script>
</body>
</html>
```
변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다. 상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.

아래는 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제이다.

```javascript
// 함수를 인잘 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 클로저로서 카운트 상태를 유지하기 위한 자유 변수 counter를 기억한다

function makeCounter(predicatte){
    //카운트 상태를 유지하기 위한 자유변수
    var counter = 0;
    //클로저를 반환
    return function(){
        counter = predicate(counter);
        return counter;
    }
}

//보조 함수 1
function increase(n){
    return ++n;
}

//보조 함수 2
function decrease(n){
    return --n;
}

//함수로 함수를 생성한다.
//makeCounter 함수는 보조 함수를 인자로 전달받아 함수를 반환한다.

const increaser = makeCounter(increase);
console.log(increaser()); //1
console.log(increaser()); //2

//increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다!!!!!
const decreaser = makeCounter(decrease);
console.log(decreaser()); //-1
console.log(decreaser()); //-2
```

함수 makeCounter는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수이다. 함수 makeCounter가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter의 스코프의 속한 변수 counter를 기억하는 클로저다. 함수 makeCounter는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다.
이때 주의해야할 것은 함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다. 이는 함수를 호출하면 그때마다 새로운 렉시컬 환경이 생성되기 때문이다. 위 예제에서 변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동하지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다!!!!

### 2.3 정보의 은닉
이번에는 생성자 함수 Counter를 생성하고 이를 통해 counter 객체를 만들어보자.

```javascript
function Counter(){
    // 카운트를 유지하기 위한 자유 변수
    var counter = 0;

    //클로저
    this.increase = function(){
        return ++counter;
    }

    this.decrease = function (){
        return --counter;
    }
}

const counter = new Counter();
console.log(counter.increase()); //1
console.log(counter.decrease()); //0
```

생성자 함수 Counter는 increase,decrease 메소드를 갖는 인스턴스를 생성한다. 이 메소드들은 모두 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 스코프에 속한 변수 counter를 기억하는 클로저이며 렉시컬 환경을 공유한다. 생성자 함수가 생성한 객체의 메소드는 객체의 프로퍼티에만 접근할 수 있는 것이 아니며 자신이 기억하는 렉시컬 환경의 변수에도 접근할 수 있다.

이때 생성자 함수 Counter의 변수 counter는 this에 바인딩된 프로퍼티가 아니라 변수다! counter가 this에 바인딩 된 프로퍼티라면 생성자 함수가 생성한 인스턴스를 통해 외부에서 접근이 가능한 public 프로퍼티가 되지만 생성자 함수 Counter 내에서 선언된 변수 counter는 생성자 함수 Counter 외부에서 접근할 수 없다. 하지만 생성자 함수 Counter가 생성한 인스턴스의 메소드인 increase,decrease는 클로저이기 때문에 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 변수counter에 접근할 수 있다. 이러한 클로저의 특징을 사용해 클래스 기반 언어의 private 키워드를 흉내낼 수 있다.

