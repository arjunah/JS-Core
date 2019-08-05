function spaceshipCrafting() {
    let titanBar = 0;
    let alumBar = 0;
    let magnesBar = 0;
    let carBar = 0;

    let titCore = 467.5;
    let alCore = 1265;
    let magCore = 1815;
    let carCore = 1650;
    let lostCore = (40 / 4) / 100;

    titCore = Math.round(titCore - titCore * lostCore);
    alCore = Math.round(alCore - alCore * lostCore);
    magCore = Math.round(magCore - magCore * lostCore);
    carCore = Math.round(carCore - carCore * lostCore);

    titanBar = Math.round(titCore / 25);
    alumBar = Math.round(alCore / 50);
    magnesBar = Math.round(magCore / 75);
    carBar = Math.round(carCore / 100);

    let undef = 0;
    let nullMast = 0;
    let jsonCrew = 0;
    let falseFleet = 0;

    let undRes = [7, 9, 7, 7];
    let nullRes = [5, 7, 7, 5];
    let jsonRes = [3, 5, 5, 2];
    let falseRes = [2, 2, 3, 1];

    let matrixRes = [undRes, nullRes, jsonRes, falseRes];

    let resources = [titanBar, alumBar, magnesBar, carBar];

    let check = true;

    while (check) {
        for (let i = 0; i < matrixRes.length; i++) {
            check = true;
            for (let j = 0; j < 4; j++) {
                if (resources[j] - matrixRes[i][j] < 0) {
                    check = false;
                    break;
                }
            }
            if (check) {
                if (i == 0) {
                    undef++;
                } else if (i == 1) {
                    nullMast++;
                } else if (i == 2) {
                    jsonCrew++;
                } else if (i == 3) {
                    falseFleet++;
                }
                for (let k = 0; k < 4; k++) {
                    resources[k] -= matrixRes[i][k];
                }
            }
            if (i == 3 && !check) {
                break;
            }
        }
    }

    let barsOut = `${resources[0]} titanium bars, ${resources[1]} aluminum bars, ${resources[2]} magnesium bars, ${resources[3]} carbon bars`

    console.log(barsOut);

    let spaceOut = [`${undef} THE-UNDEFINED-SHIP`, `${nullMast} NULL-MASTER`, `${jsonCrew} JSON-CREW`, `${falseFleet} FALSE-FLEET`];
    let counts = [undef, nullMast, jsonCrew, falseFleet];

    for (let i = 0; i < 4; i++) {
        if (counts[i] == 0) {
            spaceOut.splice(i, 1, "");
        }
    }


    console.log(spaceOut.filter(s => s != "").join(", "));
}

spaceshipCrafting();