const get = (target)=>{
    return document.querySelector(target)
}

let timerId;

const $progressBar = get('.progress-bar');

const throttle = (callback,time)=>{
    if(timerId) return
    //timerId를 초기화 시켜줌,clearTImeout은 
    timerId = setTimeout(()=>{
        callback()
        timerId=undefined
    },time)
}

const onScroll = () =>{
    const scrollTop = document.documentElement.scrollTop;
    const height = 
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
    const scrollWidth = (scrollTop/height)*100
    $progressBar.style.width = scrollWidth+'%'
}

window.addEventListener('scroll',()=>{
    throttle(onScroll,300)
})