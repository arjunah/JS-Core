function growingWord() {
    let p = document.getElementsByTagName("p")[2];
    let fSize = p.style.fontSize.slice(0, -2) * 2 || 2;

    let blueDiv = document.getElementById("blueDiv");
    let greenDiv = document.getElementById("greenDiv");
    let redDiv = document.getElementById("redDiv");

    let isBlue = blueDiv.getAttribute("check") == "true";
    let isGreen = greenDiv.getAttribute("check") == "true";
    let isRed = redDiv.getAttribute("check") == "true";

    if (fSize == 2 || isBlue) {
        p.style.color = "blue";
        blueDiv.setAttribute("check", false);
        greenDiv.setAttribute("check", true);
    } else if (isGreen) {
        p.style.color = "green";
        greenDiv.setAttribute("check", false);
        redDiv.setAttribute("check", true);
    } else if (isRed) {
        p.style.color = "red";
        redDiv.setAttribute("check", false);
        blueDiv.setAttribute("check", true);
    }

    p.style.fontSize = `${fSize}px`;
}