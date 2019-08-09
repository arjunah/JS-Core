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
            .then(data => {
                storage.saveUserSession(data);
                this.redirect("#/home")
            });
        }
    }

    return {
        register
    }
}();