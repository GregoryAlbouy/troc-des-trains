import { ticketApp } from '../app.js'
import { TicketAnimation } from './ticket-animation.js'
import { TdtCartTicket } from "../components/tdt-cart-ticket/tdt-cart-ticket.js"

/**
 * TODO: avoid the need of cartTicketElt in removeById(cartTicketElt, ticketId)
 */
export class Cart
{
    content = []
    dom = {
        element: null,
        btn: document.querySelector('.header-btn--cart'),
        container: null,
        total: null
    }

    constructor()
    {
        this.create()
    }

    add(ticket)
    {
        if (ticket.inCart) return
        this.content.push(ticket)
        ticket.inCart = true
        this.updateDisplay()
        this.render() // test
    }

    remove(cartTicketElt, ticket)
    {
        if (!this.content.find(match => match === ticket)) return

        this.content = this.content.filter((match) => match !== ticket);

        (async () => {
            await new TicketAnimation('fadeout', cartTicketElt, 1000)
            this.dom.container.removeChild(cartTicketElt)
            this.updateDisplay()
        })()
    }

    updateDisplay()
    {
        this.dom.total.textContent = `${parseFloat(this.getTotal()).toFixed(2)}€`
        this.dom.btn.setAttribute('data-value', this.content.length)
    }

    getTotal()
    {
        const price = (ticket) => parseFloat(ticket.data.price)
        const add = (a, b) => a + b

        return this.content.map(price).reduce(add, 0)
    }

    create()
    {
        this.dom.element = document.createElement('section')
        this.dom.element.classList.add('menu', 'menu--cart')
        this.dom.element.innerHTML = this.getHTML()
        
        this.dom.container = this.dom.element.querySelector('.cart-list')
        this.dom.total = this.dom.element.querySelector('.total-amount')

        this.dom.btn.addEventListener('click', () => this.dom.element.classList.toggle('on'))
        
        document.body.append(this.dom.element)
    }

    render()
    {
        // reset dom content first
        while (this.dom.container.lastElementChild) {
            this.dom.container.removeChild(this.dom.container.lastElementChild)
        }

        this.content.forEach((ticket) => {
            // TODO: replace with ticket.renderCartTicket OR ticket.render('cart')
            const cartTicket = this.dom.container.appendChild(new TdtCartTicket())
            cartTicket.init(ticket.data)
            // cartTicket.removeBtn.onclick = this.remove.bind(this)
        })
    }

    getHTML()
    {
        return `
            <h2 class="menu-title">Mes billets</h2>
            <div class="cart-list"></div>
            <div class="order-section">
                <p class="total">Total TTC</p>
                <p class="total-amount"></p>
            </div>
            <button class="btn btn--add">Commander</button>
        `
    }
}