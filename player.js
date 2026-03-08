let currentEpisodes=[]
let currentIndex=0

async function playEpisode(id,index){

currentIndex=index

let res=await fetch(API+"/episodes/"+id+"/video-url?platform=android")
let json=await res.json()

let videoUrl=json.data.videoUrl

let video=document.getElementById("video")

document.getElementById("player").style.display="block"

if(Hls.isSupported()){

let hls=new Hls()

hls.loadSource(videoUrl)

hls.attachMedia(video)

}else{

video.src=videoUrl

}

video.play()

video.onended=autoNext

setupSubtitles(json.data.subtitles)

}

function autoNext(){

currentIndex++

if(currentEpisodes[currentIndex]){

playEpisode(currentEpisodes[currentIndex].id,currentIndex)

}

}

function setupSubtitles(list){

let select=document.getElementById("subtitles")

select.innerHTML=""

list.forEach(s=>{

let o=document.createElement("option")

o.value=s.url
o.innerText=s.label

select.appendChild(o)

})

}

document.getElementById("speed").onchange=function(){

document.getElementById("video").playbackRate=this.value

}

function closePlayer(){

document.getElementById("player").style.display="none"

document.getElementById("video").pause()

}
