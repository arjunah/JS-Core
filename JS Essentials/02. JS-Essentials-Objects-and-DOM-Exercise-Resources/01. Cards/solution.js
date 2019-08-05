function solve() {
    let cards = document.getElementsByTagName("img");
    let cardUpValue = 0;
    let cardDownValue = 0;
    let cardUpIndex = -1;
    let cardDownIndex = -1;

    let history = [];

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", (e) => {
            cards[i].src = "images/whiteCard.jpg";
        
            let cardValue = Number(cards[i].name);

            if (cards[i].parentElement.id === "player1Div") {
                cardUpValue = cardValue;
                cardUpIndex = i;
                document.getElementById("result").getElementsByTagName("span")[0].innerHTML = cardUpValue;
            } else {
                cardDownValue = cardValue;
                cardDownIndex = i;
                document.getElementById("result").getElementsByTagName("span")[2].innerHTML = cardDownValue;
    
            }

            if (cardUpIndex != -1 && cardDownIndex != -1) {
                if (cardUpValue > cardDownValue) {
                    cards[cardUpIndex].style.border = "2px solid green";
                    cards[cardDownIndex].style.border = "2px solid red";
                } else if (cardUpValue < cardDownValue) {
                    cards[cardDownIndex].style.border = "2px solid green";
                    cards[cardUpIndex].style.border = "2px solid red";
                }

                history.push(`[${cardUpValue} vs ${cardDownValue}]`);

                cardUpValue = 0;
                cardDownValue = 0;
                cardUpIndex = -1;
                cardDownIndex = -1;

                let showHistory = document.getElementById("history");
                showHistory.textContent = history.join(" ") + " ";
            }
        });
    }
}