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

        try {
            checkInput(this.params)
        } catch (err) {
            sessionStorage.setItem("error", "You must fill in all fields!")
            this.redirect("#/create");
            return
        }

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
            .then(cause => {
                sessionStorage.setItem("success", "Cause successfully created!")
                this.redirect("#/dashboard")
            })
            .catch(err => {
                sessionStorage.setItem("error", "Failed to create cause, try again.")
                this.redirect("#/create")
            })
    }

    function makeDonation() {

        const currentCauseId = this.params.currentCauseId;

        getCurrentCause(currentCauseId).then(cause => {
            if (this.params.currentDonation !== "") {
                const headers = storage.createHeaders("loggedIn");

                cause.collectedFunds = parseFloat(cause.collectedFunds) + parseFloat(this.params.currentDonation);
    
                if (!cause.donors.includes(sessionStorage.getItem("username"))) {
                    cause.donors.push(sessionStorage.getItem("username"));
                }
    
                requester.edit(storage.causesURL + currentCauseId, headers, cause)
                    .then(cause => {
                        sessionStorage.setItem("success", "Thank you for your donation!")
                        this.redirect(`#/cause-details/${currentCauseId}`)
                    })
                    .catch(err => {
                        sessionStorage.setItem("error", "Something went wrong, try again.")
                        this.redirect(`#/cause-details/${currentCauseId}`)
                    })
            } else {
                sessionStorage.setItem("error", "You must input a valid number!")
                this.redirect(`#/cause-details/${currentCauseId}`)
            }  
        })
    }

    function deleteCause() {

        const currentCauseId = this.params.currentCauseId;

        const headers = storage.createHeaders("loggedIn");

        requester.del(storage.causesURL + currentCauseId, headers)
            .then(cause => {
                sessionStorage.setItem("success", "Cause successfully closed!")
                this.redirect("#/dashboard")
            })

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