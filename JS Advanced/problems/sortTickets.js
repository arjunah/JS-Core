function sortTickets(tickets, criterion) {

    class Ticket {
        constructor (destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }

        static sorted(ticketArray, sortBy) {
            switch (sortBy) {
                case "destination":
                    return [...ticketArray].sort((a, b) => {a.destination - b.destination});
                case "price":
                    return [...ticketArray].sort((a, b) => {a.price - b.price});
                case "status":
                    return [...ticketArray].sort((a, b) => {a.status - b.status});
            }
        }
    }

    let inputTickets = [];
    for (let i = 0; i < tickets.length; i++) {
        let ticketProps = tickets[i].split("|");
        let currentTicket = new Ticket;
        currentTicket.destination = ticketProps[0];
        currentTicket.price = Number(ticketProps[1]);
        currentTicket.status = ticketProps[2];
        inputTickets.push(currentTicket);
    }

    return Ticket.sorted(inputTickets, criterion);
}

console.log(sortTickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'))