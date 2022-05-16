class Stopwatch{
    constructor(element){
        this.timer = element
        this.defaultTime = '00:00.00'
        this.startTime = 0
        this.elapsedTime = 0
        this.interval = null
    }

    print(text){
        this.timer.innerHTML=text
    }

    addZero(number){
        if(number<10){
            return '0'+number
        }
        if(number>99){
            return number.toString().slice(0,-1)
        }
        return number
    }

    timeToString(time) {
        const date = new Date(time)
        const minutes = date.getUTCMinutes()
        const seconds = date.getUTCSeconds()
        const millisecond = date.getUTCMilliseconds()
        return `${this.addZero(minutes)}:${this.addZero(seconds)}:${this.addZero(millisecond)}`
    }

    
}




const get =(target)=>document.querySelector(target)

const $timer = get('.timer')
const $startButton = get('.timer_button.start')
const $stopButton = get('.timer_button.stop')
const $resetButton = get('.timer_button.reset')

const stopwatch = new Stopwatch($timer)
