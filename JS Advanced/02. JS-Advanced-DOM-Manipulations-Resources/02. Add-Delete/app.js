function addItem() {

    let input = document.querySelector("input[type='text']")

    const list = document.getElementById("items")

    let li = document.createElement("li")
    li.innerHTML = input.value
    const a = document.createElement("a")
    a.innerHTML = "[Delete]"
    a.href = "#"
    a.addEventListener("click", deleteItem);
    function deleteItem() {
        const t = document.getElementById("items");
        t.removeChild(this.parentNode)

    }
    list.appendChild(li)
    li.appendChild(a)
    input.value = ""
}