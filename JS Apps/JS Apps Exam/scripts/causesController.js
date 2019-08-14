const causesController = function () {

    function getCauses() {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.causesURL, headers)
            .then(causes => {
                return causes
            })
    }

    function getCurrentCause(currentCauseId) {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.causesURL + currentCauseId, headers)
        
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

        getCurrentCause(currentCauseId).then(cause => {
            console.log(cause);

            const headers = storage.createHeaders("loggedIn");

            cause.collectedFunds = parseFloat(cause.collectedFunds) + parseFloat(this.params.currentDonation);

            if (!cause.donors.includes(sessionStorage.getItem("username"))) {
                cause.donors.push(sessionStorage.getItem("username"));
            }

            requester.edit(storage.causesURL + currentCauseId, headers, cause)
                .then(this.redirect(`#/cause-details/${currentCauseId}`))
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