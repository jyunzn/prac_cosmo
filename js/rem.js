window.onresize = function () { 
    // let cleWidth = document.documentElement.clientWidth
    // cleWidth = cleWidth > 1400 ? 1400 : cleWidth;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 140 + 'px';
}
window.onresize();
