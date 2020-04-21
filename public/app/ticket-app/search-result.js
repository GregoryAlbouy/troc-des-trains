import { TicketEvent } from './ticket-event.js';
import { TdtTicket } from '../components/tdt-ticket/tdt-ticket.js';

export class SearchResult
{
    content = []

    render()
    {
        const container = document.querySelector('.ticket-list-container')
        const appendTicket = (ticket) => {
            const resultTicket = container.appendChild(new TdtTicket())
            resultTicket.init(ticket.data)
        }
        const dispatchLoadEvent = (ticket) => ticket.dispatchEvent(new TicketEvent('allloaded'))

        this.content.forEach(appendTicket)
        container.childNodes.forEach(dispatchLoadEvent)
    }

    add(ticket)
    {
        this.content.push(ticket)
    }

    deactivateTicket(ticket)
    {
        ticket.close()
        console.log(`ticket with id ${ticket.data.id} deactivated`)

    }

    reactivateTicket(ticket)
    {

    }
}