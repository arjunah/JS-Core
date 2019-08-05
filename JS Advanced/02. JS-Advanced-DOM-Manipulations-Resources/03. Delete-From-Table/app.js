function deleteByEmail() {
    const mail = document.getElementsByName("email")[0].value;
    const cols = document.querySelectorAll("#customers tr td");
    const del = [...cols].find(c => c.textContent == mail)
    const msg = document.getElementById("result");
    if (del && mail.indexOf("@") > -1) {
        del.parentNode.remove();
        msg.textContent = "Deleted."
        document.getElementsByName("email")[0].value = "";
    } else {
        msg.textContent = "Not found."
        document.getElementsByName("email")[0].value = "";
    }

}