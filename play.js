
function thisVolume(volume_value)
    {
       
        
        myvideo.volume = volume_value / 100;
        
    }
    
    function playMusic(){
        music.play();
        playBtn.classList.remove("pause");
        disk.classList.add("play");
    }

    const playMusic = ()=>{

        music.play();
        playBtn.classList.remove("pause");
        disk.classList.add("play");
    }