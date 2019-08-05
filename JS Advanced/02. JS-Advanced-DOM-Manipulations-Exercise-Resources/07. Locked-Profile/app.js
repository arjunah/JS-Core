function lockedProfile() {
    let buttons = document.getElementsByTagName("button");
    [...buttons].forEach(b => b.addEventListener("click", handleClick));

    function handleClick(e) {
        const isLocked = e.target.parentNode.querySelector("input[type=radio]").checked;
        console.log(isLocked)
        let button = e.target;
        console.log(button)
        let info = e.target.parentNode.querySelector("div");
        console.log(info)
        if (isLocked) {
            return
        } else {
            if (info.style.display === "none" || !info.style.display) {
                info.style.display = "block";
                button.textContent = "Hide it"
            } else {
                info.style.display = "none";
                button.textContent = "Show more"
            }
        }
    }
}