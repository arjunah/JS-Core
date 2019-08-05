function solve() {
    let menuTo = document.getElementById("selectMenuTo");
    let hexOpt = document.createElement("option");
    hexOpt.innerHTML = "Hexadecimal";
    hexOpt.value = "hexadecimal";
    menuTo.appendChild(hexOpt);
    
    let binOpt = document.createElement("option");
    binOpt.innerHTML = "Binary";
    binOpt.value = "binary";
    menuTo.appendChild(binOpt);
   

    let convert = document.getElementsByTagName("button")[0];
    convert.addEventListener("click", (e) => {
        let num = Number(document.getElementById("input").value);
        let convertTo = menuTo.options[menuTo.selectedIndex].text;
        let result = "";
        if (convertTo === "Binary") {
            while (num >= 1) {
                result = num % 2 + result;
                num = (num - num % 2) / 2;
            }
        } else {
            do {
                let current = num % 16;
                switch (current) {
                    case 10: current = "A"; break;
                    case 11: current = "B"; break;
                    case 12: current = "C"; break;
                    case 13: current = "D"; break;
                    case 14: current = "E"; break;
                    case 15: current = "F"; break;
                }
                result = current + result;
                num = (num - num % 16) / 16;
            } while (num != 0);
        }
        document.getElementById("result").value = result;
    });
}