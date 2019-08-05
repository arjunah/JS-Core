function addItem() {
    const text = document.getElementById("newItemText");
    const valueItem = document.getElementById("newItemValue");
    const menu = document.getElementById("menu");

    const option = document.createElement("option");
    option.textContent = text.value;
    option.setAttribute("value", valueItem.value)
    menu.appendChild(option);
    text.value = "";
    valueItem.value = "";
}