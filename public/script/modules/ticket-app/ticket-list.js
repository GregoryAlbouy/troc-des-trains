import { Utils } from '../utils.js';

export class TicketList
{
    content = []

    render()
    {
        const container = document.querySelector('.ticket-list-container')
        // const append = (ticket) => {

        // }
        this.content.forEach((ticket) => {
            const listItem = document.createElement('li');
            listItem.appendChild(ticket.dom.element)
            container.appendChild(listItem);
            ticket.toggleAccordion()
            // Utils.toggleAccordion(ticket.dom.head, ticket.dom.body)
        })
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