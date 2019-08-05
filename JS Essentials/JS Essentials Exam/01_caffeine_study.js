function caffeine(days) {
    let cofCaf = 450 * 40;
    let cocaCaf = 500 * 8;
    let teaCaf = 1050 * 20;
    let cafDaily = cofCaf + cocaCaf + teaCaf;
    let fifthDay = 1500 * 30;
    let ninthDay = 1000 * 8 + 1000 * 30;

    let totalCaf = days * cafDaily + ((days - days % 5) / 5) * fifthDay + ((days - days % 9) / 9) * ninthDay;

    console.log(`${totalCaf / 100} milligrams of caffeine were consumed`);
}