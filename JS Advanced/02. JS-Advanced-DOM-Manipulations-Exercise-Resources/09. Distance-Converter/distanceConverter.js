function attachEventsListeners() {
    const button = document.getElementById("convert");
    button.addEventListener("click", convert);
    const inputUnit = document.getElementById("inputUnits");
    const outputUnit = document.getElementById("outputUnits");
    let inputField = document.getElementById("inputDistance");
    let outputField = document.getElementById("outputDistance");

    function convert() {
        const fromUnit = inputUnit.options[inputUnit.selectedIndex].value;
        const toUnit = outputUnit.options[outputUnit.selectedIndex].value;

        const inputValue = inputField.value;

        let meters = 0;

        switch (fromUnit) {
            case "km": meters = inputValue * 1000; break;
            case "m": meters = inputValue; break;
            case "cm": meters = inputValue * 0.01; break;
            case "mm": meters = inputValue * 0.001; break;
            case "mi": meters = inputValue * 1609.34; break;
            case "yrd": meters = inputValue * 0.9144; break;
            case "ft": meters = inputValue * 0.3048; break;
            case "in": meters = inputValue * 0.0254; break;
        }

        let outputValue = 0;

        switch (toUnit) {
            case "km": outputValue = meters / 1000; break;
            case "m": outputValue = meters; break;
            case "cm": outputValue = meters * 100; break;
            case "mm": outputValue = meters * 1000; break;
            case "mi": outputValue = meters / 1609.34; break;
            case "yrd": outputValue = meters / 0.9144; break;
            case "ft": outputValue = meters / 0.3048; break;
            case "in": outputValue = meters / 0.0254; break;
        }
        
        outputField.value = outputValue;

    }
}