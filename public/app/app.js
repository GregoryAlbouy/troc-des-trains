import { TicketApp } from './ticket-app/ticket-app.js'
import { components } from './components/components.js'

function testdate() {
    const date1 = new Date("2020-12-01T00:00")
    const date2 = new Date("2020-12-01T03:00")
    const diff = Number(date2) - Number(date1)
    const diffdate = new Date(diff)

    console.log(diffdate.getUTCHours())
}
testdate()

components.defineAll()
export const ticketApp = new TicketApp()