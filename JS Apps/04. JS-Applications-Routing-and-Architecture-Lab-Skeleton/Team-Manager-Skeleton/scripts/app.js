const app = Sammy("#main", function() {

    this.use("Handlebars", "hbs");

    //home
    this.get("#/home", router.loadHome);
    //about
    this.get("#/about", router.loadAbout);
    //register
    this.get("#/register", router.loadRegister);
    this.post("#/register", userController.register);
    //login
    this.get("#/login", router.loadLogin);
    this.post("#/login", userController.login)
    //logout
    this.get("#/logout", userController.logout)
    //catalog
    this.get("#/catalog", router.loadCatalog)
    //team-details
    this.get("#/team-details/:currentTeamId", router.loadTeamDetails)
    //leave-team
    this.get("#/leave-team/:userId", teamController.leaveTeam)
    //join-team
    this.get("#/join-team/:teamId", teamController.joinTeam)
});

(() => {
    app.run("#/home")
})();