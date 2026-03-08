function saveHistory(item){

let h=JSON.parse(localStorage.getItem("history")||"[]")

h.unshift(item)

localStorage.setItem("history",JSON.stringify(h.slice(0,50)))

}

function getHistory(){

return JSON.parse(localStorage.getItem("history")||"[]")

}
