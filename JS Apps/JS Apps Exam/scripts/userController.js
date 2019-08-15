const userController = function() {

    function register() {
        if (this.params.username && this.params.password && (this.params.password === this.params.rePassword)) {

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
                sessionStorage.setItem("success", "Successful registration!")
                this.redirect("#/home")
            })
        } else {
            if (!(this.params.username || this.params.password)) {
                sessionStorage.setItem("error", "The username and password fields cannot be empty!")
                this.redirect("#/register")
            } else if (!(this.params.password === this.params.rePassword)) {
                sessionStorage.setItem("error", "The password and the repeat password fields must be the same!")
                this.redirect("#/register")
            }
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
                sessionStorage.setItem("success", "Successful login!")
                this.redirect("#/home")
            }).catch( err => {
                sessionStorage.setItem("error", "Invalid credentials!")
                this.redirect("#/login")
            });
        } else {
            sessionStorage.setItem("error", "The username and password fields cannot be empty!")
            this.redirect("#/login")
        }
    }

    function logout() { 
        const headers = storage.createHeaders("loggedIn");

        requester.post(`${storage.userURL}_logout`, headers)
        .then(response => {
            sessionStorage.clear();
            console.log(response);
            sessionStorage.setItem("success", "Successful logout!")
            this.redirect("#/home")
        }).catch(err => {
            sessionStorage.clear();
            sessionStorage.setItem("error", "Something went wrong!")
            this.redirect("#/home")
        });  
    }

    return {
        register,
        login,
        logout
    }
}();