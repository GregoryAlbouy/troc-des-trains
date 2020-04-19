import { TicketApp } from './ticket-app/ticket-app.js'
import { components } from './components/components.js'

components.defineAll()
export const ticketApp = new TicketApp()