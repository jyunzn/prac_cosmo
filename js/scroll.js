const oScrollContent           = document.querySelector('.scroll_content');
// 最上面那條 progress bar
const oTopPro                  = document.querySelector('.top_pro');
const oTopRocket               = oTopPro.querySelector('.top_rocket');
const aTopProProgeass          = oTopPro.querySelectorAll('.progress');

const oContentOne              = document.querySelector('.content_one');
const oContentTwo              = document.querySelector('.content_two');
const oContentTwoExpBox        = oContentTwo.querySelectorAll('.exp_box');
const oContentTwoMoon          = oContentTwo.querySelector('.moon');
const oContentThree            = document.querySelector('.content_three');
const oContentThreeWardInfos   = oContentThree.querySelector('.ward_infos');
const oContentThreeAstronau    = oContentThree.querySelector('.astronau');
const oContentThreeWardWorks   = oContentThree.querySelector('.ward_works');
const oContentThreeWorksSlogan = oContentThree.querySelector('.works_slogan');
const oContentFour             = document.querySelector('.content_four');

const oLeftNav                 = document.querySelector('.left_nav');
const oLeftNavNavBtn           = oLeftNav.querySelector('.nav_btn');
const oMenu                    = document.querySelector('.menu');
const oNews                    = oMenu.querySelector('.news');


function getMaxMoveRight() {

}
window.onresize = function () { 
    console.log(document.documentElement.clientWidth);
    getMaxMoveRight();
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 140 + 'px';
}
window.onresize();

let move = 0;
let moonMove = 50;
let leftNavLock = false;

let windowWidth         = window.innerWidth;
let oScrollContentWidth = oScrollContent.scrollWidth;
let oTopRocketWidth     = oTopRocket.scrollWidth;

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

// 按鈕點擊

let btnFlag = true;
oLeftNavNavBtn.addEventListener('click', function () {
    if (btnFlag) {
        oMenu.classList.add('open');
        oMenu.classList.add('show');
        oLeftNav.classList.add('click');
        oLeftNav.classList.add('small');
    } else {
        oMenu.classList.add('close');
        oMenu.classList.remove('show');
        oLeftNav.classList.remove('click');
        oLeftNav.classList.add('slow');
        oLeftNav.classList.remove('small');
        leftNavLock = false;
    }
    btnFlag = !btnFlag;
});

oNews.addEventListener('transitionend', function () {
    oMenu.classList.remove('open');
});

oNews.addEventListener('transitionend', function () {
    oMenu.classList.remove('close');
});
oLeftNav.addEventListener('transitionend', function () {
    oLeftNav.classList.remove('slow');
});


// FIREFOX 沒有 ev.wheelDelta 

function handleWheel(ev) {
    ev.preventDefault();
    scroll(ev.wheelDelta);
}
function handleFFWheel() {
    ev.preventDefault();
    scroll(ev.detail * -9);
}
if (navigator.userAgent.includes('Firefox')) {
    document.addEventListener("DOMMouseScroll", handleFFWheel, false);
} else {
    oScrollContent.addEventListener('wheel', handleWheel, false);
}

let topRocketMove = 0;

let t = Date.now();
let a = Math.floor(1000 / 60);
function scroll(wheelDelta) {
    let c = Date.now();
    if ((c - t) < a) return ;
    
    let moveStep = wheelDelta / 10;
    topRocketMove += ((wheelDelta / 10) * oTopRocketWidth) / maxMoveRight;
    move += moveStep;
    
    if (wheelDelta > 0) {
        if (move > 0) {
            move = 0;
            topRocketMove = 0;
            oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`
            oTopRocket.style.transform = `translate3d(${topRocketMove}px, 0, 0)`;
            return;
        }

        if (move > -40) {
            oTopPro.classList.remove('show');
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
            topRocketMove = oTopRocketWidth;
            oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`
            oTopRocket.style.transform = `translate3d(${topRocketMove}px, 0, 0)`;
            return ;
        }
        if (!leftNavLock) {
            oLeftNav.classList.add('small');
            leftNavLock = true;
        }
        if (move <= -50) {
            oTopPro.classList.add('show');
            oContentTwoExpBox.forEach(dom => dom.classList.add('show'))
        }

        if (move <= -180) {
            moonMove += wheelDelta / 30
            oContentTwoMoon.style.transform = `translate3d(${moonMove}rem, 0, 0)`
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
        
    }
    t = c;
    oScrollContent.style.transform = `translate3d(${move}rem, 0, 0)`;
    oTopRocket.style.transform = `translate3d(${topRocketMove}px, 0, 0)`;
}