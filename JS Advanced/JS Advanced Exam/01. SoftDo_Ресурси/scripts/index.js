// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution() {

    let pending = document.getElementById("pendingQuestions");

    const send = document.getElementsByTagName("button")[0];

    send.addEventListener("click", addQuestion);

    function addQuestion() {
        let question = document.getElementsByTagName("textarea")[0].value;
        let name = document.querySelector("input[type=username]").value;
        if (name === "") {
            name = "Anonymous";
        }
        let newQuestion = document.createElement("div");
        newQuestion.classList.add("pendingQuestion");
        pending.appendChild(newQuestion);
        let image = document.createElement("img");
        image.setAttribute("src", "./images/user.png");
        image.setAttribute("width", 32);
        image.setAttribute("height", 32);
        newQuestion.appendChild(image);
        let userName = document.createElement("span");
        userName.textContent = name;
        newQuestion.appendChild(userName);
        let p = document.createElement("p");
        newQuestion.appendChild(p);
        p.textContent = question;
        console.log(p)
        let actions = document.createElement("div");
        actions.classList.add("actions");
        newQuestion.appendChild(actions);
        let archive = document.createElement("button");
        archive.textContent = "Archive";
        archive.classList.add("archive");
        let open = document.createElement("button");
        open.textContent = "Open";
        open.classList.add("open")
        actions.appendChild(archive);
        actions.appendChild(open);
        archive.addEventListener("click", archive);
        open.addEventListener("click", open);

        function archive() {
            
        }
    
        function open() {
    
        }
    }

    
}
