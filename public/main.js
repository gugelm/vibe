//click audio

function play() {
    var audio = document.getElementById('drop');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

//forms

const form = document.getElementById('vote-form');

form.addEventListener('submit', e=>{
    e.preventDefault();
});

