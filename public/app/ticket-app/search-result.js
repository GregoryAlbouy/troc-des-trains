import { TicketEvent } from './ticket-event.js';
import { TdtTicket } from '../components/tdt-ticket/tdt-ticket.c.js';
// import { debugTicket } from '../app.js'

export class SearchResult
{
    content = [
        // debugTicket
    ]

    render()
    {
        const container = document.querySelector('.ticket-list-container')
        const appendTicket = (ticket) => {
            const resultTicket = container.appendChild(new TdtTicket())
            resultTicket.init(ticket.data)
            if (ticket.inCart) resultTicket.setAttribute('added', '')
        }
        // const dispatchLoadEvent = (ticket) => ticket.dispatchEvent(new TicketEvent('allloaded'))

        this.content.forEach(appendTicket)
        // container.childNodes.forEach(dispatchLoadEvent)
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
        const match = this.content.find((match) => match === ticket)

        if (!match) return

        const container = document.querySelector('.ticket-list-container')

        container.childNodes.forEach((ticketElt) => {
            if (ticketElt.ticketId === ticket.data.id) ticketElt.removeAttribute('added')
        })


        // if not added return

        
        
    }
}