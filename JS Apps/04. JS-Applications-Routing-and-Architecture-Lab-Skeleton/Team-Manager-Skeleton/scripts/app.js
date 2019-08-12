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
    //create-team
    this.get("#/create-team", router.loadCreate)
    this.post("#/create-team", teamController.createTeam)
    //edit-team
    this.get("#/edit-team/:currentTeamId", router.loadEdit)
    this.post("#/edit-team/:currentTeamId", teamController.editTeam)
});

(() => {
    app.run("#/home")
})();