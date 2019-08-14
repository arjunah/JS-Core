const requester = function () {

    function get(url, headers) {
        document.getElementById("loadingNotification").style.display = "block";
        return fetch(url, {
            method: "GET",
            headers: headers
        }).then(responseHandler)
    }

    function post(url, headers, body) {
        document.getElementById("loadingNotification").style.display = "block";
        return fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(responseHandler)
    }

    function edit(url, headers, body) {
        document.getElementById("loadingNotification").style.display = "block";
        return fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        }).then(responseHandler)
    }

    function del(url, headers) {
        document.getElementById("loadingNotification").style.display = "block";
        return fetch(url, {
            method: "DELETE",
            headers: headers
        })
    }

    function responseHandler(response) {

        if (response.status >= 400) {

            document.getElementById("loadingNotification").style.display = "none";

            throw new Error(`Error!! ${response.status}: ${response.statusText}`)
        }

        if (response.status !== 204) {

            document.getElementById("loadingNotification").style.display = "none";

            return response.json()
        } else {
            
            document.getElementById("loadingNotification").style.display = "none";

            return "Logged out successfully!"
        }
    }

    return {
        get,
        post,
        edit,
        del
    }
}();