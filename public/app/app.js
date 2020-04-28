import { TicketApp } from './ticket-app/ticket-app.js'
import { loadComponents } from './modules/component-loader.js'

export let ticketApp = null

loadComponents()
    .then(() => ticketApp = new TicketApp())