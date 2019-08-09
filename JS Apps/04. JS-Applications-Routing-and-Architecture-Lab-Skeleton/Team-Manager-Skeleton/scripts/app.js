const app = Sammy("#main", function() {

    this.use("Handlebars", "hbs")

    this.get("#/home", router.loadHome);

    this.get("#/about", router.loadAbout);
    
    this.get("#/register", router.loadRegister);
    this.post("#/register", userController.register);
});

(() => {
    app.run("#/home")
})();