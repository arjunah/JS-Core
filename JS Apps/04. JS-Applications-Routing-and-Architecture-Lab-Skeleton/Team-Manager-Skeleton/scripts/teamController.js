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

    function leaveTeam(context) {

        sessionStorage.setItem("teamId", "undefined");

        const headers = storage.createHeaders("loggedIn");

        const body = {}

        return requester.edit(storage.userURL + context.params.userId, headers, body)
            .then(res => {
                console.log("Left the team!");
                this.redirect("#/catalog")
            })
    }

    function joinTeam(context) {
        
        sessionStorage.setItem("teamId", context.params.teamId)

        const headers = storage.createHeaders("loggedIn");

        const body = {
            teamId: context.params.teamId
        }

        return requester.edit(storage.userURL + sessionStorage.getItem("userId"), headers, body)
            .then(res => {
                console.log("Joined a team!");
                this.redirect("#/catalog")
            })
    }

    function createTeam() {

    }

    function editTeam() {

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