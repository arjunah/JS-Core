const teamController = function() {

    function getTeams() {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.teamsURL, headers)
            .then(teams => {
                return teams
            })
    }

    function getCurrentTeam(currentTeamId) {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.teamsURL + currentTeamId, headers)
            .then(team => {
                return team
            })
    }

    function getTeamMembers(currentTeamId) {

        const headers = storage.createHeaders("loggedIn");

        return requester.get(storage.userURL, headers)
            .then(users => {

                let teamMembers = [];

                [...users].filter(user => {
                    if (user.teamId === currentTeamId) {
                        teamMembers.push(user.username);
                    }
                })
                return teamMembers
            })
    }

    function leaveTeam() {

        sessionStorage.setItem("teamId", "undefined");

        const headers = storage.createHeaders("loggedIn");

        const body = {}

        requester.edit(storage.userURL + this.params.userId, headers, body)
            .then(res => {
                console.log("Left the team!");
                this.redirect("#/catalog")
            })
    }

    function joinTeam() {
        
        sessionStorage.setItem("teamId", this.params.teamId)

        const headers = storage.createHeaders("loggedIn");

        const body = {
            teamId: this.params.teamId
        }

        requester.edit(storage.userURL + sessionStorage.getItem("userId"), headers, body)
            .then(res => {
                console.log("Joined a team!");
                this.redirect("#/catalog")
            })
    }

    function createTeam() {

        const headers = storage.createHeaders("loggedIn");

        const body = {
            name: this.params.name,
            comment: this.params.comment
        }

        requester.post(storage.teamsURL, headers, body)
            .then(res => {
                this.params.teamId = res._id;
                joinTeam(this);
            })
    }

    function editTeam() {

        const headers = storage.createHeaders("loggedIn");

        body = {
            name: this.params.name,
            comment: this.params.comment
        }

        requester.edit(storage.teamsURL + this.params.currentTeamId, headers, body)
            .then(res => {
                this.redirect("#/catalog");
            })
    }

    return {
        getTeams,
        getCurrentTeam,
        getTeamMembers,
        leaveTeam,
        joinTeam,
        createTeam,
        editTeam
    }

}();