
let request = new XMLHttpRequest();
let url = "https://pokeapi.co/api/v2/pokemon?limit=50";
request.open("GET", url, true);

pokeFavList = []
request.onload = function() {
    let data = JSON.parse(this.response);
    data.results.forEach(poke => {
        let url1 = poke.url
        let request1 = new XMLHttpRequest();
        request1.open("GET", url1, false);
        request1.onload = function() {
            let data1 = JSON.parse(this.response);
            let pokeDiv = document.createElement("div")
            pokeDiv.classList.add(data1.name,"pokeDiv",data1.types[0].type.name, data1.types[1] ? "s"+ data1.types[1].type.name : "s"+data1.types[0].type.name)
            let pokeImg = document.createElement("img")
            let pokeTitle = document.createElement("h4")
            let svgFav = document.createElement("i")
            let svgInfo = document.createElement("i")
            document.querySelector("#modals").innerHTML+=`
            <div class="modal fade" id="${data1.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${data1.name.toUpperCase()}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <a href = "https://pokemon.fandom.com/wiki/${data1.name}" target="_blank"><img src = ${data1.sprites.front_default}></a>
                    <p>Type: ${capitalize(data1.types[0].type.name)}</p>
                    ${data1.types[1] ? '<p>Seconday Type: '+capitalize(data1.types[1].type.name)+'</p>':''}
                    <p>Base Experience: ${data1.base_experience}</p>
                    <span style="margin-right:30px">Height: ${data1.height}</span>
                    
                    <span>Weight: ${data1.weight}</span>
                    <hr/>
                    <div style="background-color:rgb(202, 200, 200);border-radius:10px;padding:15px;">
                    <h3>Base Stats</h3>
                        <li>${capitalize(data1.stats[0].stat.name)}: ${data1.stats[0].base_stat}</li>
                        <li>${capitalize(data1.stats[1].stat.name)}: ${data1.stats[1].base_stat}</li>
                        <li>${capitalize(data1.stats[2].stat.name)}: ${data1.stats[2].base_stat}</li>
                        <li>${capitalize(data1.stats[3].stat.name)}: ${data1.stats[3].base_stat}</li>
                        <li>${capitalize(data1.stats[4].stat.name)}: ${data1.stats[4].base_stat}</li>
                        <li>${data1.stats[5].stat.name.toUpperCase()}: ${data1.stats[5].base_stat}</li>
                    </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>`
            svgInfo.classList.add("fa","fa-chevron-down")
            pokeTitle.innerHTML = data1.name
            svgFav.classList.add("fa", (pokeFavList.includes(data1.name) ? "fa-heart" : "fa-heart-o"))

            pokeDiv.appendChild(svgFav)
            pokeDiv.appendChild(pokeTitle)
            pokeDiv.appendChild(pokeImg)
            pokeDiv.appendChild(document.createElement("br"))
            pokeDiv.appendChild(svgInfo)
            svgInfo.addEventListener("click",()=>{
                $("#"+data1.name).modal()
            })
            pokeImg.style.height = "50%"
            pokeImg.src = `https://play.pokemonshowdown.com/sprites/ani/${data1.name}.gif`
            document.querySelector("#pokelist").appendChild(pokeDiv)
        };
        
        request1.send();
    });
    document.querySelectorAll('.fa-heart,.fa-heart-o').forEach(favF => {
        favF.addEventListener("click",function toggleFav(event){
            toggleH = event.target
            if (toggleH.classList[1].includes('fa-heart-o')) {
                toggleH.classList.remove("fa-heart-o")
                toggleH.classList.add("fa-heart")
                pokeFavList.push(toggleH.parentNode.classList[0])
            } else{
                toggleH.classList.remove("fa-heart")
                toggleH.classList.add("fa-heart-o")
                pokeFavList.splice(pokeFavList.indexOf(toggleH.parentNode.id),1)
            }
        })
    });
}


function applyFavs(){
    var children = Array.from(document.getElementById('pokelist').children);
    children.forEach(e=>{
        pokeName = e.children[1].innerHTML;
        e.children[0].classList.add((pokeFavList.includes(pokeName) ? "fa-heart" : "fa-heart-o"))
        e.children[0].classList.remove((pokeFavList.includes(pokeName) ? "fa-heart-o" : "fa-heart"))

    })
    document.querySelector('.spinner').style.display = 'none';
}

setTimeout(applyFavs, 2000)

request.send();


function capitalize(input) {
    return input[0].toUpperCase() + input.slice(1);
}
document.getElementById('searchBar').addEventListener("keyup",(e)=>{
    toHide = []
    for (var i = 0; i < document.getElementById("pokelist").children.length; i++) {
        document.getElementById("pokelist").children[i].style.display = "block"
        if(!(document.getElementById("pokelist").children[i].classList[0].startsWith(e.target.value)||document.getElementById("pokelist").children[i].classList[1].startsWith(e.target.value)||document.getElementById("pokelist").children[i].classList[2].startsWith(e.target.value)||document.getElementById("pokelist").children[i].classList[3].startsWith(e.target.value))){
            toHide.push(document.getElementById("pokelist").children[i]);
        }
    }
    toHide.forEach(el=>{el.style.display = "none"})
})


