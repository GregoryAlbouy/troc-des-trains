import { AutoloadingComponent } from '../autoloading-component.js'
import { TdtCartTicket } from '../tdt-cart-ticket/tdt-cart-ticket.c.js'
import { TicketAnimation } from '../../ticket-app/ticket-animation.js'

export class TdtCart extends AutoloadingComponent
{
    tickets = []
    dom = {}

    connectedCallback()
    {
        this.dom.btn = document.querySelector('.header-btn--cart')
        this.dom.ticketList = this.root.querySelector('.cart-list')
        this.dom.total = this.root.querySelector('.total')
        this.dom.totalLabel = this.root.querySelector('.total-label')

        this.dom.btn.addEventListener('click', () => this.toggleAttribute('open'))
    }

    updateDisplay()
    {
        this.dom.total.textContent = `${parseFloat(this.getTotal()).toFixed(2)}€`
        this.dom.totalLabel.textContent = this.tickets.length ? 'Total :' : 'Le panier est vide !'
        this.dom.btn.setAttribute('data-value', this.tickets.length)
    }

    getTotal()
    {
        const price = (ticket) => parseFloat(ticket.data.price)
        const add = (a, b) => a + b

        return this.tickets.map(price).reduce(add, 0)
    }

    render()
    {
        // reset dom content first
        while (this.dom.ticketList.lastElementChild) {
            this.dom.ticketList.removeChild(this.dom.ticketList.lastElementChild)
        }

        this.tickets.forEach((ticket) => {
            const cartTicket = this.dom.ticketList.appendChild(new TdtCartTicket())
            cartTicket.init(ticket.data)
        })
    }

    add(ticket)
    {
        if (ticket.inCart) return
        this.tickets.push(ticket)
        ticket.inCart = true
        this.updateDisplay()
        this.render()
    }

    remove(cartTicketElt, ticket)
    {
        if (!this.tickets.find(match => match === ticket)) return

        this.tickets = this.tickets.filter((match) => match !== ticket);
        ticket.inCart = false

        return new Promise((resolve) => {
            new TicketAnimation('fadeout', cartTicketElt, 1000)
                .then(() => {
                    this.dom.ticketList.removeChild(cartTicketElt)
                    this.updateDisplay()
                    resolve()
                })
        })
    }

    containsTicket(ticket)
    {
        return this.tickets.map((cartTicket) => cartTicket.data.id).includes(ticket.data.id)
    }
}

TdtCart.config = {
    TAGNAME: 'tdt-cart',
    PATH: './app/components/tdt-cart/'
}