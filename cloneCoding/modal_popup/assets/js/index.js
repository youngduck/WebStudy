const get = (target)=>{
    return document.querySelector(target)
}


const body = get('body')
const open_btn=get('.modal_open_button')
const modal = get('.modal')
const confirm = get('.modal_button.confirm')
const cancel = get('.modal_button.cancel')


const toggleView =()=>{
    modal.classList.toggle('show')
    body.classList.toggle('scroll-lock')
}

open_btn.addEventListener('click',()=>toggleView())

confirm.addEventListener('click',()=>toggleView())

cancel.addEventListener('click',()=>toggleView())


window.addEventListener('click',(e)=>{
    if(e.target===modal){
        toggleView()
    }

})