const router = function() {

    function loadHome(context) {

        checkLogIn(context);

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function() {
            this.partial("./templates/home/home.hbs")
        })
    }

    function loadAbout(context) {

        checkLogIn(context);

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

    function loadLogin() {
        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            loginForm: "./templates/login/loginForm.hbs"

        }).then(function() {
            this.partial("./templates/login/loginPage.hbs")
        })
    }
    
    async function loadCatalog(context) {

        checkLogIn(context);

        this.teams = await teamController.getTeams();

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            team: "./templates/catalog/team.hbs"
        }).then(function() {
            this.partial("./templates/catalog/teamCatalog.hbs")
        })
    }

    async function loadTeamDetails(context) {

        checkLogIn(context);

        const currentTeamId = context.params.currentTeamId;

        this.currentTeamId = currentTeamId;
        this.team = await teamController.getCurrentTeam(currentTeamId);
        this.teamMembers = await teamController.getTeamMembers(currentTeamId);

        if (sessionStorage.getItem("userId") === this.team._acl.creator) {
            this.teamCreator = true;
        } else {
            this.teamCreator = false;
        }

        if (sessionStorage.getItem("teamId") === this.team._id) {
            this.isTeamMember = true;
        } else {
            this.isTeamMember = false;
        }

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            teamControls: "./templates/catalog/teamControls.hbs",
            teamMember: "./templates/catalog/teamMember.hbs"
        }).then(function() {
            this.partial("./templates/catalog/details.hbs")
        })
    }

    function loadCreate(context) {

        checkLogIn(context);

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            createForm: "./templates/create/createForm.hbs"

        }).then(function() {
            this.partial("./templates/create/createPage.hbs")
        }) 
    }

    function checkLogIn(context) {
        if (sessionStorage.getItem("authtoken")) {
            context.isLoggedIn = true;
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId");
            context.userId = sessionStorage.getItem("userId")

            if (context.teamId !== "undefined") {
                context.hasTeam = true;
            } else {
                context.hasTeam = false;
            }

        } else {
            this.isLoggedIn = false;
        }
    }

    return {
        loadHome,
        loadAbout,
        loadRegister,
        loadLogin,
        loadCatalog,
        loadTeamDetails,
        loadCreate
    }

}();