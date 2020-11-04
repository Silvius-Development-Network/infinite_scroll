var observer = new IntersectionObserver(function(entries){
    if (entries[0].intersectionRatio == 0) return;
    observer.unobserve(entries[0].target);
    offSet += 10;
    getPokemon(offSet);
}, {
    threshold: 1
})