(function venueMaster() {

    // variables
    const venueInfo = document.getElementById("venue-info");
    const getVenuesBtn = document.getElementById("getVenues");
    const venueDate = document.getElementById("venueDate");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("guest:pass")
    }

    let venueIDs =[];
    let allVenues = [];
    let qty;
    let name;
    let id;
    let price;

    // eventListeners
    getVenuesBtn.addEventListener("click", getVenues);
    document.addEventListener("click", moreInfo);
    document.addEventListener("click", selectTickets);
    document.addEventListener("click", confirmPurchase);
    
    // requests
    function resHandler(res) {
        if(res.status >= 400) {
            throw new Error(`${res.status}: ${res.statusText}`)
        }

        return res.json()
    }

    function postRequest(url, headers) {
        return fetch(url, {
            method: "POST",
            headers: headers
        }).then(resHandler)
    }

    function getRequest(url, headers) {
        return fetch(url, {
            method: "GET",
            headers: headers
        }).then(resHandler)
    }

    // get and list venues
    async function getVenueIDs() {
        const date = venueDate.value;
        venueDate.value = "";
        const url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`;

        venueIDs = await postRequest(url, headers);
    }

    function insertVenueTemplate(venue) {
        const venueInfoTemplate = `
            <div class="venue" id="${venue._id}">
                <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
                <div class="venue-details" style="display: none;">
                    <table>
                        <tr>
                            <th>Ticket Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td class="venue-price">${venue.price} lv</td>
                            <td><select class="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select></td>
                            <td><input class="purchase" type="button" value="Purchase"></td>
                        </tr>
                    </table>
                    <span class="head">Venue description:</span>
                    <p class="description">${venue.description}</p>
                    <p class="description">Starting time: ${venue.startingHour}</p>
                </div>
            </div>
        `

        venueInfo.innerHTML += venueInfoTemplate;
    }

    async function getVenues() {

        venueInfo.innerHTML = "";

        await getVenueIDs();

        [...venueIDs].forEach(async (id) => {
            const url = `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${id}`
            const venue = await getRequest(url, headers);

            allVenues.push(venue);

            insertVenueTemplate(venue);
        })
    }

    // show more info
    function moreInfo(event) {
        if (event.target.matches("input") && event.target.value === "More info") {
            
            let node = event.target.parentNode;
            
            while (!node.classList.contains("venue")) {
                node = node.parentNode;
            }

            let info = node.querySelector(".venue-details");
            if (info.style.display === "none") {
                info.style.display = "block";
            } else {
                info.style.display = "none";
            }
        }
    }

    // purchase
    function selectTickets(event) {
        if (event.target.matches("input") && event.target.value === "Purchase") {

            let node = event.target.parentNode;
            
            while (!node.classList.contains("venue")) {
                node = node.parentNode;
            }

            id = node.id;
            const numOfTickets = node.querySelector(".quantity");
            qty = Number(numOfTickets.options[numOfTickets.selectedIndex].text);
            name = ([...allVenues].find(v => {
                if (v._id === id) {
                    return v
                }
            })).name;

            price = ([...allVenues].find(v => {
                if (v._id === id) {
                    return v.price
                }
            })).price;

            const confirmationTemplate = `
                <span class="head">Confirm purchase</span>
                <div class="purchase-info">
                    <span>${name}</span>
                    <span>${qty} x ${price}</span>
                    <span>Total: ${qty * price} lv</span>
                    <input type="button" value="Confirm">
                </div>
            `
            venueInfo.innerHTML = confirmationTemplate;
        }
    }

    async function confirmPurchase(event) {
        if (event.target.matches("input") && event.target.value === "Confirm") {

            const url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&amp;qty=${qty}`;

            let confirmFragment = (await postRequest(url, headers)).html;
            confirmFragment = confirmFragment.replace("undefined", qty)
            confirmFragment = confirmFragment.replace("NaN", price * qty)
            venueInfo.innerHTML = confirmFragment;
        }
    }
})()