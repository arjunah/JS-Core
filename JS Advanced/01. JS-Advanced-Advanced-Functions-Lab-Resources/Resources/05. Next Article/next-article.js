function getArticleGenerator(input){
    return function () {
        const div = document.getElementById("content");
        if (input.length > 0) {
            const art = document.createElement("article");
            div.appendChild(art);
            art.innerHTML = input.shift();
        }
    }
}