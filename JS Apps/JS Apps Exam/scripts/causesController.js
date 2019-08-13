const causesController = function() {

    function getCauses() {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.causesURL, headers)
            .then(causes => {
                return causes
            }).catch(console.error())
    }

    function getCurrentCause(currentCauseId) {

        const headers = storage.createHeaders("loggedIn");
        
        return requester.get(storage.causesURL + currentCauseId, headers)
            // .then(cause => {
            //     return cause
            // }).catch(console.error())
    }

    function createCause() {
        
        checkInput(this.params);

        const headers = storage.createHeaders("loggedIn");

        const body = {
            cause: this.params.cause,
            picUrl: this.params.pictureUrl,
            neededFunds: this.params.neededFunds,
            description: this.params.description,
            donors: [],
            collectedFunds: 0
        }
        
        requester.post(storage.causesURL, headers, body)
            .then(this.redirect("#/dashboard"))
    }

    function makeDonation() {
        debugger;

        const currentCauseId = this.params.currentCauseId;

        let cause = getCurrentCause(currentCauseId);

        console.log(cause)
        
        const headers = storage.createHeaders("loggedIn");

        cause.collectedFunds = parseFloat(cause.collectedFunds) + parseFloat(this.params.currentDonation);

        if (!cause.donors.contains(sessionStorage.getItem("username"))) {
            cause.donors.push(sessionStorage.getItem("username"));
        }
        
        requester.edit(storage.causesURL + currentCause, headers, cause)
             .then(res => {
                 this.redirect(`#/cause-details/${currentCause}`)
             })
        
    }

    function deleteCause() {

        const currentCauseId = this.params.currentCauseId;
        
        const headers = storage.createHeaders("loggedIn");

        requester.del(storage.causesURL + currentCauseId, headers)
            .then(this.redirect("#/dashboard"))
        
    }

    function checkInput(params) {
        if (params.cause && params.pictureUrl && params.neededFunds && params.description) {
            return
        } else {
            throw new Error("Empty fields!")
        }
    }

    return {
        getCauses,
        getCurrentCause,
        createCause,
        makeDonation,
        deleteCause
    }

}();