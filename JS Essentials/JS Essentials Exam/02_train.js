function train(wagon, passengers) {
    let trainFull = [];
    let current = 0;

    for (let i = 0; i < passengers.length; i++) {
        current += passengers[i];

        if (current <= wagon) {
            trainFull.push(current);
            current = 0;
        } else {
            trainFull.push(wagon);
                current -= wagon;
        }
    }
    
    if (current == 0) {
        console.log(trainFull);
        console.log("All passengers aboard");
    } else {
        console.log(trainFull);
        console.log(`Could not fit ${current} passengers`)
    }
}