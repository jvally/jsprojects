/* Get our elements */

/*video player*/
const player = document.querySelector('.player');

/*players control */
const video = player.querySelector('.viewer');

/*progress*/
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

/*skip buttons(-10/+25)*/
const skipButtons = player.querySelectorAll('[data-skip]');
console.log(skipButtons);

/*sliders (volume, playback rate)*/
const ranges = player.querySelectorAll('.player__slider');
console.log(ranges);

/*toggle play/pause*/
const toggle = player.querySelector('.player__button.toggle');

/*fullscreen*/
const fullscreen = player.querySelector('.player__button.fullscreen');

/*build our functions*/
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('update the button');
}

function skip(){
    console.log("this.dataset.skip");
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;
    console.log("value is changing");
    
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

function changeScreenSize(){
    if (video.requestFullscreen){
        video.requestFullscreen();
    }
    else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
    }
    else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }
    else if(video.msRequestFullscreen){
        video.msRequestFullscreen();
    }
    else{
        console.log("Fullscreen not supported");
    }
}

/*eventlisteners*/
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',rangeUpdate));

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e));
;

progress.addEventListener('mousedown',()=>mousedown = true);
progress.addEventListener('mouseup',()=>mousedown = false);

fullscreen.addEventListener('click',changeScreenSize);