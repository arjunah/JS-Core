function addItem() {

    let input = document.querySelector("input[type='text']")

    const list = document.getElementById("items")

    let li = document.createElement("li")
    li.innerHTML = input.value
    list.appendChild(li)
    input.value = ""
}
