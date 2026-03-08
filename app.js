const API="https://dracin-providers.vercel.app/api/v1/shortime/stream"

loadHome()

async function loadHome(){

loadHero()

createRow("Trending",API+"/theme?kind=trending")
createRow("New Release",API+"/home/new-release?page=1&limit=20")
createRow("Watching",API+"/home/watching?page=1&limit=20")
createRow("Recommended",API+"/home/recommend?page=1&limit=20")
createRow("Random",API+"/random?page=1&limit=20")

}

async function loadHero(){

let res=await fetch(API+"/banner?page=1&limit=5")

let json=await res.json()

let b=json.data[0]

document.getElementById("hero").innerHTML=`

<div class="hero">

<img src="${b.landscapeImage}">

</div>

`

}

async function createRow(title,url){

let content=document.getElementById("content")

let section=document.createElement("div")

section.className="section"

section.innerHTML=`

<h2>${title}</h2>
<div class="row"></div>

`

content.appendChild(section)

let row=section.querySelector(".row")

let res=await fetch(url)

let json=await res.json()

json.data.forEach(d=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="${d.cover}">
<div class="card-title">${d.title}</div>

`

card.onclick=()=>openDetail(d.id)

row.appendChild(card)

})

}

async function openDetail(id){

let res=await fetch(API+"/contents/"+id)

let json=await res.json()

let d=json.data

currentEpisodes=d.episodeList

let box=document.getElementById("detail")

box.innerHTML=`

<h1>${d.title}</h1>

<p>${d.summary}</p>

<div id="episodes"></div>

`

let ep=document.getElementById("episodes")

d.episodeList.forEach((e,i)=>{

let b=document.createElement("button")

b.innerText=e.title

b.onclick=()=>playEpisode(e.id,i)

ep.appendChild(b)

})

}

function explore(){

loadHome()

}

function historyPage(){

let h=getHistory()

let c=document.getElementById("content")

c.innerHTML="<h2>Watch History</h2>"

h.forEach(i=>{

let d=document.createElement("div")

d.innerText=i.title

c.appendChild(d)

})

}

function profile(){

let c=document.getElementById("content")

c.innerHTML=`

<h2>User Profile</h2>

<p>Local user</p>

`

}

function openSearch(){

let q=prompt("Search drama")

if(!q)return

search(q)

}

async function search(q){

let res=await fetch(API+"/random?page=1&limit=50")

let json=await res.json()

let results=json.data.filter(d=>d.title.toLowerCase().includes(q.toLowerCase()))

let c=document.getElementById("content")

c.innerHTML="<h2>Search Results</h2>"

results.forEach(d=>{

let div=document.createElement("div")

div.innerText=d.title

div.onclick=()=>openDetail(d.id)

c.appendChild(div)

})

}
