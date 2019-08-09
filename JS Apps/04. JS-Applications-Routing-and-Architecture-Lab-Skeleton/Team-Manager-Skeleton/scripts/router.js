const router = function() {

    function loadHome() {

        const isLoggedIn = sessionStorage.getItem("authtoken") ? true : false;

        if (isLoggedIn) {
            this.isLoggedIn = isLoggedIn;
            this.username = sessionStorage.getItem("username");
        }
        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function() {
            this.partial("./templates/home/home.hbs")
        })
    }

    function loadAbout() {
        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function() {
            this.partial("./templates/about/about.hbs")
        })
    }

    function loadRegister() {
        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            registerForm: "./templates/register/registerForm.hbs"

        }).then(function() {
            this.partial("./templates/register/registerPage.hbs")
        })
    }

    return {
        loadHome,
        loadAbout,
        loadRegister
    }

}();