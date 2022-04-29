const img=document.querySelectorAll('.ab')
const txt=document.querySelectorAll('.ac')
const fk=document.querySelector('.fk')
const cc = document.querySelectorAll('.cc')
const balloon=document.querySelectorAll('.balloon')
const b = document.querySelectorAll('.b')
const obj = [1,3,5,1,17]

//서울 지도
for(let i =0; i<img.length; i++){
    txt[i].addEventListener('mouseover',function(){
        img[i].style.fill='black'
        txt[i].style.fill='white'
        balloon[i].style.display='block'
        b[i].style.display='block'
    })
    img[i].addEventListener('mouseover',function(){
        img[i].style.fill='black'
        txt[i].style.fill='white'
        balloon[i].style.display='block'
        b[i].style.display='block'
    })
    img[i].addEventListener('mouseout',function(){
        img[i].style.fill=''
        txt[i].style.fill=''
        balloon[i].style.display=''
        b[i].style.display=''
    })
    txt[i].addEventListener('mouseout',function(){
        img[i].style.fill=''
        txt[i].style.fill=''
        balloon[i].style.display=''
        b[i].style.display=''
    })
}

//메뉴
fk.addEventListener('mouseout',function(){
    for(let i =0; i<cc.length;i++){
        cc[i].style.height='20%'
    }
})

for (let i =0; i<cc.length; i++){
    cc[i].addEventListener('mouseover',function(){
        for(let j = 0;j<cc.length;j++){
            if(i===j){
                cc[j].style.height='150%'
                cc[j].childNodes[3].style.display='block'
                cc[j].childNodes[5].style.display='block'
            }
            else{
                cc[j].childNodes[3].style.display='none'
                cc[j].childNodes[5].style.display=''    
            }
        }
    })
}

for (let i = 0 ; i<cc.length;i++){
    cc[i].addEventListener('mouseover',function(){
        img[obj[i]].style.fill='white'
        txt[obj[i]].style.fill='black'
    })
    cc[i].addEventListener('mouseout',function(){
        img[obj[i]].style.fill=''
        txt[obj[i]].style.fill=''
    })
    
}


//정동길,북한산,회기,남산,위례
//중구1, 종로구3,동대문구5,중구1,송파구17

// jungnang 중랑구
// jung 중구
// seongdong 성동구
// jongno 종로구
// gwangjin 광진구
// dongdaemun 동대문구
// dongjak 동작구
// yeongdeungpo 영등포구
// yangcheon 양천구
// seodaemun 서대문구
// noone 노원구
// yongsan 용산구
// gwanak 관악구
// gangnam 강남구
// seocho 서초구
// geumcheon 금천구
// guro 구로구
// songpa 송파구
// dobong 도봉구
// gangdong 강동구
// gangseo 강서구
// seongbuk 성북구
// gangbuk 강북구
// mapo 마포구
// eunpyeong 은평구