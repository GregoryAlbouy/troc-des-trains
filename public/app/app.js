import { TicketApp } from './ticket-app/ticket-app.js'
import { Ticket } from './ticket-app/ticket.js'
import { loadComponents } from './modules/component-loader.js'

function testdate() {
    const date1 = new Date("2020-12-01T00:00")
    const date2 = new Date("2020-12-01T03:00")
    const diff = Number(date2) - Number(date1)
    const diffdate = new Date(diff)

    console.log(diffdate.getUTCHours())
}
testdate()

// export const debugTicket = new Ticket({
//     "id": 99,
//     "vendorName": "Marcel Patulacci",
//     "vendorPicture": "https://picsum.photos/200/300",
//     "price": "49.99",
//     "conditions": "Carte Sénior",
//     "steps": [
//     {
//         "startStation": "Paris Gare de Lyon",
//         "endStation": "Lilles Flandres",
//         "startTime": "2020-12-01T12:17",
//         "endTime": "2020-12-01T14:25"
//     },
//     {
//         "startStation": "Lilles Flandres",
//         "endStation": "Lyon Part-Dieu",
//         "startTime": "2020-12-01T15:05",
//         "endTime": "2020-12-01T19:42"
//     },
//     {
//         "startStation": "Lyon Part-Dieu",
//         "endStation": "Bordeaux St-Jean",
//         "startTime": "2020-12-01T19:55",
//         "endTime": "2020-12-01T21:17"
//     },
//     {
//         "startStation": "Lilles Flandres",
//         "endStation": "Montpellier St-Roch",
//         "startTime": "2020-12-01T21:34",
//         "endTime": "2020-12-01T23:55"
//     }]
// })
// debugTicket.inCart = true


export let ticketApp = null

loadComponents()
    .then(() => ticketApp = new TicketApp())