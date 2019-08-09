const storage = function() {

    const appKey = "kid_BkSrKTgmr";
    const appSecret = "568a763be1964b8cad67d05563ec0497";

    const baseURL = "https://baas.kinvey.com/";
    const userURL = `${baseURL}user/${appKey}/`;
    const teamsURL = `${baseURL}appdata/${appKey}`;


    function createHeaders(authType, username, password) {

        let auth = "";
        switch (authType) {
            case "register": auth = `Basic ${btoa(`${appKey}:${appSecret}`)}`; 
            break;

            case "login": auth = `Basic ${btoa(`${username}:${password}`)}`; 
            break;

            case "loggedIn": auth = `Kinvey ${sessionStorage.getItem(authtoken)}`; 
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
        
        return new Promise(async function(resolve) {
            if (userInfo) {

                await (() => {
                    const user = userInfo;
                    const authtoken = user._kmd.authtoken;
                    const username = user.username;
                    const teamCreator = user._id;
        
                    sessionStorage.setItem("authtoken", authtoken);
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("teamCreator", teamCreator);
                })();
                
                resolve();    
            }
        })   
    }

    return {
        userURL,
        teamsURL,
        createHeaders,
        saveUserSession
    }

}();