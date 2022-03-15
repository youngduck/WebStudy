
const get = (target)=>document.querySelector(target)




const init = ()=>{
    get('form').addEventListener('submit',(event)=>{
        playGame(event)
    })
    setPassword()
}

const baseball = {
    limit:10,
    digit:4,
    trial:0,
    end:false,
    $result:get('.ball_result'),
    $answer:get('.ball_answer'),
    $input:get('.ball_input'),
}

//destructuring
const {limit, digit,$result,$answer,$input}=baseball
let {trial,end}=baseball

const setPassword = ()=>{
    const gameLimit = Array(limit).fill(false)
    let password = ''
    while (password.length<digit){
        const random = parseInt(Math.random() * 10,10)

        if(gameLimit[random]){
            continue
        }
        password += random
        gameLimit[random]=true
    }
 
    baseball.password=password
}

const onPlayed = (number,hint)=>{
    //시도했을때
    return `<em>${trial}차 시도</em>: ${number},${hint}`
}


const isCorrect = (number,answer)=>{
    //같은가?
    return number === answer;
}

const isDupilicate = (number)=>{
    //중복번호가 있는가?
    return [...new Set(number.split(''))].length !== digit
}

const getStrikes = (number,answer)=>{
    let strike = 0;
    const nums = number.split('')

    nums.map((digit,index)=>{
        if(digit === answer[index]){
            strike++
        }
    })
    return strike
}

const getBalls = (number,answer)=>{
    let ball = 0;
    const nums = number.split('')
    const gameLimit = Array(limit).fill(false)

    answer.split('').map((num)=>{
        gameLimit[num] = true
    })

    nums.map((num,index)=>{
        if(answer[index] !== num && gameLimit[num]){
            ball++
        }
    })

    return ball
}

const getResult = (number,answer) =>{
    if(isCorrect(number,answer)){
        end=true
        $answer.innerHTML=baseball.password
        return '정답!'
    }

    const strikes = getStrikes(number,answer)
    const balls = getBalls(number,answer)
    
    return `STRIKE:${strikes} Ball:${balls}`
}

const playGame = (event) =>{
    event.preventDefault();

    if(!!end){
        return
    }

    const inputNumber = $input.value
    const {password} =baseball

    if (inputNumber.length !== digit){
        alert(`${digit}자리 숫자를 입력해주세요`)
    }
    else if(isDupilicate(inputNumber)){
        alert('중복 숫자가 있습니다.')
    }
    else{
        trial+=1
        const result = onPlayed(inputNumber,getResult(inputNumber,password))
        $result.innerHTML+=`<span>${result}</span>`
    }

    if(limit<=trial && !isCorrect(inputNumber,password)){
        alert('아웃ㅋ')
        end = true
        $answer.innerHTML=password
    }

    $input.value=''
    $input.focus()
}

init()
