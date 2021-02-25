const oScrollContent           = document.querySelector('.scroll_content');
const oLeftNav                 = document.querySelector('.left_nav');
const oContentOne              = document.querySelector('.content_one');
const oContentTwoExpBox        = document.querySelectorAll('.content_two .exp_box');
const oContentTwoMoon          = document.querySelector('.content_two .moon');
const oContentThreeWardInfos   = document.querySelector('.content_three .ward_infos');
const oContentThreeAstronau    = document.querySelector('.content_three .astronau');
const oContentThreeWardWorks   = document.querySelector('.content_three .ward_works');
const oContentThreeWorksSlogan = document.querySelector('.content_three .works_slogan');
const oLeftNavNavBtn           = document.querySelector('.left_nav .nav_btn');


let move = 0;
let moonMove = 50;
let leftNavLock = false;

let windowWidth = window.innerWidth;
let oScrollContentWidth = oScrollContent.scrollWidth;
let maxMoveRight = windowWidth - oScrollContentWidth;
let fontSize = document.documentElement.style.fontSize;
    fontSize = fontSize.slice(0, fontSize.lastIndexOf('px')) * 1;
    maxMoveRight = Math.ceil(maxMoveRight / fontSize);


oScrollContent.addEventListener('transitionend', function () {
    if (move == 0 && leftNavLock) {
        oLeftNav.classList.remove('small');
        leftNavLock = false;
    }
});
window.addEventListener('load', function () {
    oContentOne.classList.add('show');
})
let navBtnFlag
oLeftNavNavBtn.addEventListener('click', function () {

});


// FIREFOX 沒有 ev.wheelDelta 
if (navigator.userAgent.includes('Firefox')) {
    document.addEventListener("DOMMouseScroll", function (ev) {
        ev.preventDefault();
        scroll(ev.detail * -9);
    },false)
} else {
    oScrollContent.addEventListener('wheel', function (ev) {
        ev.preventDefault();
        scroll(ev.wheelDelta);
    })
}


let t = Date.now();
let a = Math.floor(1000 / 60);
function scroll(wheelDelta) {
    let c = Date.now();
    if ((c - t) < a) return ;
    
    move += (wheelDelta / 10);
    
    if (wheelDelta > 0) {
        if (move > 0) {
            move = 0;
            oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`
            return;
        }

        if (move > -40) {
            oContentTwoExpBox.forEach(dom => dom.classList.remove('show'))
        }
        if (move > -200) {
            oContentThreeWardInfos.classList.remove('show');
        }
        if (move > -320) {
            oContentThreeWardWorks.classList.remove('show');
        }

        if (move > -460) {
            oContentThreeWorksSlogan.classList.remove('show');
        }

        if (moonMove !== 50) {
            moonMove += wheelDelta / 30;
            oContentTwoMoon.style.transform = `translate3d(${moonMove}rem, 0, 0)`
            if (move > -150) { 
                moonMove = 50;
            }
        }
    } else {
        
        if (move < maxMoveRight) {
            move = maxMoveRight;
            oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`
            return ;
        }
        if (!leftNavLock) {
            oLeftNav.classList.add('small');
            leftNavLock = true;
        }
        if (move <= -50) {
            oContentTwoExpBox.forEach(dom => dom.classList.add('show'))
        }
        if (move <= -220) {
            oContentThreeWardInfos.classList.add('show');
        }
        if (move <= -320) {
            oContentThreeAstronau.classList.add('show');   
        }
        if (move <= -360) {
            oContentThreeWardWorks.classList.add('show');
        }

        if (move <= -480) {
            oContentThreeWorksSlogan.classList.add('show');
        }
        // // 月亮
        if (move <= -180) {
            moonMove += wheelDelta / 30
            oContentTwoMoon.style.transform = `translate3d(${moonMove}rem, 0, 0)`
        }
    }
    console.log(moonMove);
    t = c;
    oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`
}
