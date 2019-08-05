function attachGradientEvents() {
    const gradient = document.getElementById("gradient");

    gradient.addEventListener("mousemove", (e) => {
        let percent = e.offsetX / gradient.clientWidth;
        percent = Math.trunc(percent * 100);

        document.getElementById("result").textContent = percent + "%";
    });

    
    gradient.addEventListener("mouseout", () => {
        document.getElementById("result").innerHTML = "";
    });
}