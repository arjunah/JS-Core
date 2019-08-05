function solve() {
   let send = document.getElementById("send");
   send.addEventListener("click", (e) => {
       let messageText = document.getElementById("chat_input").value;
       let div = document.createElement("div");
       div.innerHTML = messageText;
       div.className = "message my-message"
       document.getElementById("chat_messages").appendChild(div);
       document.getElementById("chat_input").value = "";
   })
}


