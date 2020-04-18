import { TicketEvent } from '../ticket-event.js';

export class TicketList
{
    content = []

    render()
    {
        const container = document.querySelector('.ticket-list-container')
        const appendTicket = (ticket) => {
            container.append(ticket.dom.element)
            ticket.dom.element.dispatchEvent(new TicketEvent('ticketappend', {
                detail: {
                    parent: container,
                    element: ticket
                }
            }))
        }

        this.content.forEach(appendTicket)
    }

    add(ticket)
    {
        this.content.push(ticket)
    }

    deactivateTicket(ticket)
    {
        console.log(`ticket with id ${ticket.data.id} deactivated`)
    }

    reactivateTicket(ticket)
    {

    }
}