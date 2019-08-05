function requests() {
    const loadBtn = document.getElementById("loadBooks");
    const submitBtn = document.getElementById("submit");
    const bookTableBody = document.getElementById("bookTableBody");

    const appKey = "kid_BkSrKTgmr";
    const appSecret = "568a763be1964b8cad67d05563ec0497";
    const user = "guest";
    const pass = "guest";
    const baseURL = `https://baas.kinvey.com/appdata/${appKey}/books`;

    const headers = {
        "Authorization": "Basic " + window.btoa(`${user}:${pass}`)
    }

    loadBtn.addEventListener("click", loadBooks);
    submitBtn.addEventListener("click", createBook);

    function resHandler(res) {
        if (res.status >= 400) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        return res.json();
    }

    function getBooks(url, header) {

        return fetch(url, { headers: header })
            .then(resHandler);
    }

    async function loadBooks() {
    
        const books = await getBooks(baseURL, headers);
        
        [...books].forEach(book => {
            const htmlTemplate = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            `

            const bookRow = document.createElement("tr");
            bookRow.setAttribute("id", `${book._id}`);
            bookRow.innerHTML = htmlTemplate;
            bookTableBody.appendChild(bookRow);
        })
    }
}

requests();