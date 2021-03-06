const router = function() {
    //home
    function loadHome() {

        checkLogIn(this);

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function() {
            this.partial("./views/home/home.hbs")
        })
    }

    function loadRegister() {

        checkLogIn(this);

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"

        }).then(function() {
            this.partial("./views/register/register.hbs")
        })
    }

    function loadLogin() {
        
        checkLogIn(this);

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"

        }).then(function() {
            this.partial("./views/login/login.hbs")
        })
    }
    
    async function loadDashboard() {

        checkLogIn(this);

        this.causes = await causesController.getCauses();

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs",
            cause: "./views/causes/cause.hbs"
        }).then(function() {
            this.partial("./views/causes/dashboard.hbs")
        })
    }

    async function loadCauseDetails() {

        checkLogIn(this);

        const currentCauseId = this.params.currentCauseId;

        this.currentCauseId = currentCauseId;
        this.cause = await causesController.getCurrentCause(currentCauseId);
                
        //check if cause creator
        if (sessionStorage.getItem("userId") === this.cause._acl.creator) {
            this.isCauseCreator = true;
        } else {
            this.isCauseCreator = false;
        }

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs",
            donors: "./views/causes/donors.hbs"
        }).then(function() {
            this.partial("./views/causes/details.hbs")
        })
    }

    function loadCreate() {
        
        checkLogIn(this);

        this.loadPartials({
            notification: "./views/common/notification.hbs",
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs",

        }).then(function() {
            this.partial("./views/create/create.hbs")
        })
    }

    function checkLogIn(context) {
        if (sessionStorage.getItem("authtoken")) {

            context.isLoggedIn = true;
            context.username = sessionStorage.getItem("username");
            context.userId = sessionStorage.getItem("userId")

        } else {
            this.isLoggedIn = false;
        }

        context.success = sessionStorage.getItem("success");
        context.error = sessionStorage.getItem("error");
    }

    return {
        loadHome,
        loadRegister,
        loadLogin,
        loadDashboard,
        loadCauseDetails,
        loadCreate
    }

}();