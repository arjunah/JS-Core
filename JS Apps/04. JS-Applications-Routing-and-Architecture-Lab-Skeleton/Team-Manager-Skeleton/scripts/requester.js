const requester = function() {

    function get() {

    }

    function post(url, headers, body) {
        
        return fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            }).then(responseHandler)
    }

    function edit() {
        
    }

    function del() {
        
    }

    function responseHandler(response) {
        if (response.status >= 400) {
            throw new Error(`Error!! ${response.status}: ${response.statusText}`)
        }
        return response.json()
    }

    return {
        get,
        post,
        edit,
        del
    }
}();