const userController = function() {

    function register() {
        if (this.params.password === this.params.repeatPassword) {

            const username = this.params.username;
            const password = this.params.password;
            const userData = {
                username: username,
                password: password
            };
            const headers = storage.createHeaders("register");

            requester.post(storage.userURL, headers, userData)
            .then(userInfo => {
                storage.saveUserSession(userInfo);
                this.redirect("#/home")
            });
        }
    }

    function login() {
        if (this.params.username && this.params.password) {
            const username = this.params.username;
            const password = this.params.password;
            const userData = {
                username: username,
                password: password
            };
            const headers = storage.createHeaders("login", username, password);

            requester.post(`${storage.userURL}login`, headers, userData)
            .then(userInfo => {
                storage.saveUserSession(userInfo);
                this.redirect("#/home")
            });
        }
    }

    function logout() { 
        const headers = storage.createHeaders("loggedIn");

        requester.post(`${storage.userURL}_logout`, headers)
        .then(response => {
            sessionStorage.clear();
            console.log(response);
            this.redirect("#/home")
        });  
    }

    return {
        register,
        login,
        logout
    }
}();