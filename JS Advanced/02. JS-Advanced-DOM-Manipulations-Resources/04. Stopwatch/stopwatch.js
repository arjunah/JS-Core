function stopwatch() {
    let timer = document.getElementById("time");
    const start = document.getElementById("startBtn");
    const stop = document.getElementById("stopBtn");

    start.addEventListener("click", updateTimer);
    stop.addEventListener("click", stopTimer);

    let seconds = 0;
    let minutes = 0;
    let check = false;

    function updateTimer() {
        let interval = setInterval(ticker, 1000);
        function ticker() {
            if (check) {
            clearInterval(interval);
            seconds = 0;
            minutes = 0;
            check = false;
            return;
            }
            start.setAttribute("disabled", true);
            stop.removeAttribute("disabled");
            
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes == 60) {
                minutes = 0;
            }
            if (minutes < 10) {
                timer.innerHTML = "0" + minutes + ":";
            } else {
                timer.innerHTML = minutes + ":";
            }
            if (seconds < 10) {
                timer.innerHTML += "0" + seconds;
            } else {
                timer.innerHTML += seconds;
            }
            seconds++;
        }
        return ticker();
    }

    function stopTimer() {
        check = true;
        start.removeAttribute("disabled");
        stop.setAttribute("disabled", true);
    }
}