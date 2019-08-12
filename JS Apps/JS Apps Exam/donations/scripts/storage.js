const storage = function () {

    const appKey = "kid_S18ilk3XB";
    const appSecret = "0fbd04f39fa240c28fd2f9be1cec4eb3";

    const baseURL = "https://baas.kinvey.com/";
    const userURL = `${baseURL}user/${appKey}/`;
    const causesURL = `${baseURL}appdata/${appKey}/causes/`;


    function createHeaders(authType, username, password) {

        let auth = "";
        switch (authType) {
            case "register": auth = `Basic ${btoa(`${appKey}:${appSecret}`)}`;
                break;

            case "login": auth = `Basic ${btoa(`${username}:${password}`)}`;
                break;

            case "loggedIn": auth = `Kinvey ${sessionStorage.getItem("authtoken")}`;
                break;
        };

        const headers = {
            "Content-Type": "application/json", 
            "Credentials": "include",
            "Authorization": `${auth}`
        };

        return headers
    }

    function saveUserSession(userInfo) {

        const authtoken = userInfo._kmd.authtoken;
        const username = userInfo.username;
        const userId = userInfo._id;

        sessionStorage.setItem("authtoken", authtoken);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userId", userId);
    }

    return {
        userURL,
        causesURL,
        createHeaders,
        saveUserSession
    }

}();