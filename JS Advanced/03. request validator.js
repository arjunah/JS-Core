function validate(request) {
        
    checkMethod();
    checkURI();
    checkVersion();
    checkMessage();

    function checkMethod() {
        if (!("method" in request)) {
            throw Error("Invalid request header: Invalid Method");
        }
        const regex = new RegExp("(^GET$)|(^POST$)|(^DELETE$)|(^CONNECT$)");
        if (!regex.test(request.method)) {
            throw Error("Invalid request header: Invalid Method");
        }
    }

    function checkURI() {
        if (!("uri" in request)) {
            throw Error("Invalid request header: Invalid URI");
        }
        const regex = new RegExp("^([A-Z]|[a-z]|\\.|[0-9])*$")
        if ((request.uri != "*" && !regex.test(request.uri)) || request.uri == "") {
            throw Error("Invalid request header: Invalid URI");
        }
    }

    function checkVersion() {
        if (!("version" in request)) {
            throw Error("Invalid request header: Invalid Version");
        }
        const regex = new RegExp("(HTTP/0.9)|(HTTP/1.0)|(HTTP/1.1)|(HTTP/2.0)");
        if (!regex.test(request.version)) {
            throw Error("Invalid request header: Invalid Version");
        }
    }

    function checkMessage() {
        if (!("message" in request)) {
            throw Error("Invalid request header: Invalid Message");
        }
        const regex = new RegExp("^[^<>&\"'\\\\]*$");
        if (!regex.test(request.message)) {
            throw Error("Invalid request header: Invalid Message");
        }
    }
    return request;
}

try {
console.log(validate({
    method: "GET",
    uri: "adfg.dg.adg",
    version: 'HTTP/1.1',
    message: 'dgh\\dfg'
}))
} catch (e) {
    console.log(e.message);
}