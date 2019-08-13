const app = Sammy("#main", function() {

    this.use("Handlebars", "hbs");

    //home
    this.get("#/home", router.loadHome);
    
    //register
    this.get("#/register", router.loadRegister);
    this.post("#/register", userController.register);
   
    //login
    this.get("#/login", router.loadLogin);
    this.post("#/login", userController.login);
    
    //logout
    this.get("#/logout", userController.logout);
    
    //dashboard
    this.get("#/dashboard", router.loadDashboard);
    
    //causes-details
    this.get("#/cause-details/:currentCauseId", router.loadCauseDetails);
    
    //create-cause
    this.get("#/create", router.loadCreate);
    this.post("#/create", causesController.createCause)

    //make donation
    this.post("#/cause-details/:currentCauseId", causesController.makeDonation)

    //delete cause
    this.get("#/delete-cause/:currentCauseId", causesController.deleteCause)
});

(() => {
    app.run("#/home")
})();