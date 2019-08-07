function handleStudents() {
    const studentsTable = document.getElementById("studentsTable");
    const student = {
        id: document.getElementById("id"),
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        facultyNumber: document.getElementById("facultyNumber"),
        grade: document.getElementById("grade")
    }

    const createBtn = document.getElementById("createBtn");

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

        [...students].sort((a, b) => {
            return a.ID - b.ID
        }).forEach(student => insertStudentTemplate(student))
    }

    function insertStudentTemplate(student) {
        const htmlTemplate = `
            <td>${student.ID}</td>
            <td>${student.FirstName}</td>
            <td>${student.LastName}</td>
            <td>${student.FacultyNumber}</td>
            <td>${(student.Grade).toFixed(2)}</td>
        `
        const tr = document.createElement("tr");
        tr.innerHTML = htmlTemplate;
        studentsTable.appendChild(tr);
    }

    async function createStudent() {
        
        const body = JSON.stringify({
            ID: parseInt(student.id.value),
            FirstName: student.firstName.value,
            LastName: student.lastName.value,
            FacultyNumber: student.facultyNumber.value,
            Grade: parseFloat(student.grade.value)
        });

        student.id.value = "";
        student.firstName.value = "";
        student.lastName.value = "";
        student.facultyNumber.value = "";
        student.grade.value = "";

        await postRequest(request.url, body, request.headers);
    }
}

handleStudents();