function handleStudents() {
    const studentsTable = document.getElementById("studentsTable");
    const student = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        facultyNumber: document.getElementById("facultyNumber"),
        grade: document.getElementById("grade")
    }

    const createBtn = document.getElementById("createBtn");

    let id = 1;

    createBtn.addEventListener("click", createStudent);
    window.addEventListener("load", loadStudents);

    const request = {
        url: "https://baas.kinvey.com/appdata/kid_BkSrKTgmr/students/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("guest:guest")
        }
    }

    function resHandler(res) {
        if(res.status >= 400) {
            throw new Error(`${res.status}: ${res.statusText}`)
        }

        return res.json()
    }

    function getRequest(url, headers) {
        return fetch(url, { method: "GET", headers})
            .then(resHandler)
    }

    function postRequest(url, body, headers) {
        return fetch(url, { method: "POST", body, headers})
            .then(resHandler);
    }

    async function loadStudents() {
        const students = await getRequest(request.url, request.headers);

        [...students].sort((a))
    }

    async function createStudent() {
        
        const body = JSON.stringify({
            ID: id,
            FirstName: firstName.value,
            LastName: lastName.value,
            FacultyNumber: facultyNumber.value,
            Grade: grade.value
        });

        id++;

        firstName.value = "";
        lastName.value = "";
        facultyNumber.value = "";
        grade.value = "";

        await postRequest(request.url, body, request.headers);
    }
}

handleStudents();