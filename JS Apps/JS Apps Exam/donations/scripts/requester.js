const requester = function() {

    function get(url, headers) {
        return fetch(url, {
            method: "GET",
            headers: headers
        }).then(responseHandler)
    }

    function post(url, headers, body) {
        console.log(url, headers, body)   
        return fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            }).then(responseHandler)
    }

    function edit(url, headers, body) {
        return fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        }).then(responseHandler)
    }

    function del(url, headers) {
        return fetch(url, {
            method: "DELETE",
            headers: headers
        })
    }

    function responseHandler(response) {
        console.log(response)
        if (response.status >= 400) {
            throw new Error(`Error!! ${response.status}: ${response.statusText}`)
        }

        if (response.status !== 204) {
            return response.json()
        } else {
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