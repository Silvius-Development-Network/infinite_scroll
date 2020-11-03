var root = document.getElementById("root");

var offSet = 0;

function getPokemon(offSet){
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=10`)
        .then(res => res.json())
        .then(function(data){
            data.results.forEach(pokemon => {
                var section = document.createElement("section");
                var h1 = document.createElement("h1");
                section.classList.add("pokemon");
                section.style.marginBottom = "50px";
                h1.classList.add("pokemon__title");
                h1.textContent = pokemon.name;
                section.appendChild(h1)
                root.appendChild(section);
            });
            
            var lastChild = document.querySelector("#root section:last-child");

            observer.observe(lastChild)

        });

}

var observer = new IntersectionObserver(function(entries){
    if (entries[0].intersectionRatio == 0) return;
    observer.unobserve(entries[0].target);
    offSet += 10;
    getPokemon(offSet);
}, {
    threshold: .5
})

getPokemon(offSet);