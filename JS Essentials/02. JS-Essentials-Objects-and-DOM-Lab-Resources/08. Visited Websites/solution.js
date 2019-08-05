function solve() {
    let links = document.getElementsByClassName("link-1");
    // const soft = links[0];
    // const google = links[1];
    // const you = links[2];
    // const wiki = links[3];
    // const mail = links[4];
    // const stack = links[5];

    // soft.addEventListener("click", (e) => {
    //     let p = soft.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })

    // google.addEventListener("click", (e) => {
    //     let p = google.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })

    // you.addEventListener("click", (e) => {
    //     let p = you.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })

    // wiki.addEventListener("click", (e) => {
    //     let p = wiki.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })

    // mail.addEventListener("click", (e) => {
    //     let p = mail.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })

    // stack.addEventListener("click", (e) => {
    //     let p = stack.getElementsByTagName("p")[0];
    //     let t = p.textContent.split(" ");
    //     let c = Number(t[1]);
    //     c++;
    //     t[1] = c;
    //     p.textContent = t.join(" ");
    // })


    for (let link of links) {
        link.addEventListener("click", (event) => {
            let currentLink = event.currentTarget;
            let p = currentLink.getElementsByTagName("p")[0];
            let text = p.textContent.split(" ");
            let clicks = Number(text[1]);
            clicks++;
            text[1] = clicks;
            p.textContent = text.join(" ");
        })
    }
}