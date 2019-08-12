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
            .then(cause => {
                return cause
            }).catch(console.error())
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
        
        return requester.post(storage.causesURL, headers, body)
            .then(this.redirect("#/dashboard")).catch(console.error())
    }

    async function makeDonation(currentCauseId) {

        const headers = storage.createHeaders("loggedIn");

        let cause = JSON.parse(await causesController.getCurrentCause(currentCauseId));
        
        cause.collectedFunds += parseFloat(this.params.currentDonation);

        cause.donors.push(sessionStorage.getItem("username"));

        return requester.edit(storage.causesURL + currentCauseId, headers, cause)
             .then(this.redirect(`#/cause-details/${currentCauseId}`)).catch(console.error())
        
    }

    function deleteCause(currentCauseId) {

        const headers = storage.createHeaders("loggedIn");

        return requester.del(storage.causesURL + currentCauseId, headers)
            .then(this.redirect("#/dashboard")).catch(console.error())
        
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