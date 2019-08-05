function solve() {
    let text = document.getElementById("input").innerHTML;
    let sentences = text.split(/\./);
    let count = (sentences.length - sentences.length % 3) / 3;
    let output = document.getElementById("output");
    for (let i = 0; i < sentences.length; i += 3) {
        let p = document.createElement("p");
        for (let j = i; j < i + 3; j++) {
            if (j == sentences.length) {
                break;
            }
            if (j != sentences.length - 1) {
              p.innerHTML += sentences[j] + ".";
            } else {
              p.innerHTML += sentences[j];
            }
        }
        output.appendChild(p);
    }
}