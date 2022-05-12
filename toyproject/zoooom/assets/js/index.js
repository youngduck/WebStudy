const get = (target)=>document.querySelector(target)

const $add_btn = get('.prop-add')
const $name = get('.prop-name')
const $address = get('.prop-address')
const $btnList = get('.btn-list')

let num= localStorage.length;

const loadItem =()=>{
    $btnList.innerHTML=''
    for(let i = 1; i<=num; i++){
        $btnList.innerHTML+=JSON.parse(localStorage.getItem(`${i}`))
    }
}

const makeBtn = ()=>{
    const name = $name.value
    const address = $address.value
    let btnHtml=`<a href="${address}" target='blank'>
                    <button class="btn-item">${name}</button>
                </a>` 
    num++
    localStorage.setItem(`${num}`,JSON.stringify(btnHtml))
    loadItem()
}


const init = ()=>{
    $add_btn.addEventListener('click',makeBtn)
    loadItem()
    console.log('hi')
}

init()