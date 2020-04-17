export class TicketList
{
    content = []

    render()
    {
        const container = document.querySelector('.ticket-list-container')
        this.content.forEach((ticket) => {
            const listItem = document.createElement('li');
            listItem.appendChild(ticket.element)
            container.appendChild(listItem);
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