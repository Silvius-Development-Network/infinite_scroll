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
                section.appendChild(h1);
                root.appendChild(section);
                getPokemonImg(pokemon.url)
                    .then(function(imgUrl){
                        var img = document.createElement("img");
                        img.src = "./assets/img/diabeticus.png";
                        img.dataset.src = imgUrl;
                        observerImg.observe(img);
                        section.appendChild(img);
                    })
            });
            
            var lastChild = document.querySelector("#root section:last-child");

            observer.observe(lastChild);

        });

}