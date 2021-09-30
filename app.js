
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const playListBtn = document.querySelector("#playlist");
const musicList = document.querySelector(".music-list");
const udL = document.querySelector("ul");





//set a music 
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerHTML = "00:00";
    music.addEventListener('loadeddata', () => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
  })
}





//formatting the time
const formatTime = (time)=>{
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}
// playbutton
playBtn.addEventListener('click',()=>{
    if(playBtn.className.includes('pause')){
        music.play();
        console.log("play");
        
    }else{
        music.pause();
    }
    playBtn.classList.toggle("pause");
    disk.classList.toggle("play");
})

//seekbar

setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML=formatTime(music.currentTime)
},500)

seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value;
})
// forwardbutton
forwardBtn.addEventListener("click",() => {
    if(currentMusic >= songs.length -1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.remove("pause");
    disk.classList.add("play");
});
// backwardbutton
backwardBtn.addEventListener("click",()=>{
    if(currentMusic <= 0){
        currentMusic = songs.length -1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.remove("pause");
    disk.classList.add("play");
});
//function to play song



setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(music.loop == true){
            music.currentTime = 0;
        }else{
        forwardBtn.click();
        }
    }
}, 500)
//function to loop song
let repIcon = document.querySelector('#loopbutton')
    function handleRepeat() {
        console.log(music.loop);
        if (music.loop == true) {
            music.loop = false;
            repIcon.classList.toggle('active');
        }
        else {
            music.loop = true;
            repIcon.classList.toggle('active');
            
            
        }
    }
// function to set volume 
function thisVolume(volume_value)
    {
        music.volume = volume_value / 100;
    }


// playlist button
playListBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show");
    playListBtn.classList.toggle("active");
    
});



//songs will be displayed in the playlist
for(let i = 0;i < songs.length;i++){
    
    let listTag = `<li  class="list" onclick="clicked(${i})">${songs[i].name}<span>${" - "+songs[i].artist}</span></li>`;
    udL.insertAdjacentHTML("beforeend",listTag);
}
// song will be played when clicked from the playlist
  function clicked(songNo){
    
   let musicIndex = songNo; //updating current song index with clicked li index
    setMusic(musicIndex);
    music.play();
     playBtn.classList.remove("pause");
     disk.classList.add("play");
   }

   setMusic(0);



