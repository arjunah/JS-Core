function create(words) {
    let content = document.getElementById("content");
    [...words].forEach(e => {
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = e;
        p.style.display = "none";
        div.appendChild(p);
        content.appendChild(div);
        div.addEventListener("click", () => {
            p.style.display = "block";
        })
    });
}