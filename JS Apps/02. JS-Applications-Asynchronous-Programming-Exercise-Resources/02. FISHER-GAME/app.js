function attachEvents() {

    const buttons = {
        load: document.querySelector("button.load"),
        add: document.querySelector("button.add"),
        updateOrDelete: document.getElementById("catches")
    }

    const catchesContainer = document.getElementById("catches");
    const addForm = document.getElementById("addForm");
    const inputs = addForm.getElementsByTagName("input");

    buttons.load.addEventListener("click", loadCatches);
    buttons.add.addEventListener("click", addCatch);
    buttons.updateOrDelete.addEventListener("click", updateCatch);
    buttons.updateOrDelete.addEventListener("click", deleteCatch);
    
    async function loadCatches() {

        catchesContainer.innerHTML = "";

        const catches = await fetch("https://fisher-game.firebaseio.com/catches.json", { method: "GET" })
            .then(resHandler);

        createCatchHTML(catches);
    }

    function createCatchHTML(catches) {
        Object.keys(catches).forEach((key) => {
            
            const dataId = key;

            const { angler, bait, captureTime, location, species, weight } = catches[key];

            const html = `
                <label>Angler</label>
                <input type="text" class="angler" value="${angler}" />
                <hr>
                <label>Weight</label>      
                <input type="number" class="weight" value="${weight}" />
                <hr>
                <label>Species</label>
                <input type="text" class="species" value="${species}" />
                <hr>
                <label>Location</label>
                <input type="text" class="location" value="${location}" />
                <hr>
                <label>Bait</label>
                <input type="text" class="bait" value="${bait}" />
                <hr>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${captureTime}" />
                <hr>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            `

            const divCatch = document.createElement("div");
            divCatch.classList.add("catch");
            divCatch.setAttribute("data-id", `${dataId}`);
            divCatch.innerHTML = html;
            catchesContainer.appendChild(divCatch);
        })
    } 

    function addCatch() {
        
        const body = {
            angler: inputs[0].value,
            bait: inputs[4].value,
            captureTime: inputs[5].value,
            location: inputs[3].value,
            species: inputs[2].value,
            weight: inputs[1].value
        }

        fetch("https://fisher-game.firebaseio.com/catches.json",
            {
                method: "POST",
                body: JSON.stringify(body)
            })

    }

    function updateCatch(event) {

        if(event.target.classList.contains("update")) {
            
            const updateInputs = event.target.parentNode.getElementsByTagName("input");

            const catchId = event.target.parentNode.getAttribute("data-id");

            const body = {
                angler: updateInputs[0].value,
                bait: updateInputs[4].value,
                captureTime: updateInputs[5].value,
                location: updateInputs[3].value,
                species: updateInputs[2].value,
                weight: updateInputs[1].value
            }
    
            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`,
                {
                    method: "PUT",
                    body: JSON.stringify(body)
                })
        }
    }

    function deleteCatch(event) {

        if(event.target.classList.contains("delete")) {

            const deleteId = event.target.parentNode.getAttribute("data-id");

            fetch(`https://fisher-game.firebaseio.com/catches/${deleteId}.json`,
                {
                    method: "DELETE"
                })

            event.target.parentNode.remove();

        }
    }

    function resHandler(response) {
        if (response.status > 400) {
            throw new Error(`Error: ${response.statusText}`)
        }

        return response.json();
    }
}

attachEvents();

