function subtract() {
    const first = document.getElementById("firstNumber").value;
    const second = document.getElementById("secondNumber").value;
    let result = document.getElementById("result");

    const value = Number(first) - Number(second);

    result.textContent = value;
}