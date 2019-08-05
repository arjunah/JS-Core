function attachEventsListeners() {
    let inputs = document.getElementsByTagName("div");
    [...inputs].forEach(d => d.querySelector("input[type = button]").addEventListener("click", convert));

    function convert(e) {
        const button = e.target.id;
        const inputValue = e.target.previousElementSibling.value;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        
        switch (button) {
            case "daysBtn":
                hours = inputValue * 24;
                minutes = hours * 60;
                seconds = minutes * 60;

                document.getElementById("hours").value = hours;
                document.getElementById("minutes").value = minutes;
                document.getElementById("seconds").value = seconds;
                break;
                
            case "hoursBtn":
                days = inputValue / 24;
                minutes = inputValue * 60;
                seconds = minutes * 60;

                document.getElementById("days").value = days;
                document.getElementById("minutes").value = minutes;
                document.getElementById("seconds").value = seconds;
                break;

            case "minutesBtn":
                days = inputValue / 60 / 24;
                hours = inputValue / 60;
                seconds = inputValue * 60;

                document.getElementById("days").value = days;
                document.getElementById("hours").value = hours;
                document.getElementById("seconds").value = seconds;
                break;

            case "secondsBtn":
                days = inputValue / 60 / 60 / 24;
                hours = days * 24;
                minutes = inputValue / 60;

                document.getElementById("days").value = days;
                document.getElementById("hours").value = hours;
                document.getElementById("minutes").value = minutes;
        }
    }
}