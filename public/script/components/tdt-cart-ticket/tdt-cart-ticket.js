import { ticketApp } from '../../app.js'

export class TdtCartTicket extends HTMLElement
{
    static STYLE_URL = './script/components/tdt-cart-ticket/tdt-cart-ticket.style.css'
    static TEMPLATE_URL = './script/components/tdt-cart-ticket/tdt-cart-ticket.template.html'
    
    init(ticketData)
    {
        this.getHTML()
            .then((template) => {
                this.innerHTML = template
                this.set(ticketData)
            })
    }

    set(ticketData)
    {
        const
            dateElt        = this.querySelector('.journey-date'),
            startTimeElt   = this.querySelectorAll('.step-time')[0],
            endTimeElt     = this.querySelectorAll('.step-time')[1],
            durationElt    = this.querySelector('.journey-duration'),
            connectionsElt = this.querySelector('.journey-connections'),
            conditionsElt  = this.querySelector('.conditions'),
            priceElt       = this.querySelector('.price'),
            removeBtn      = this.querySelector('.close-btn')


        this.classList.add('ticket', 'in-cart')
        this.style.display = 'block'

        startTimeElt.setAttribute('datetime', `2020-01-16 ${ticketData.startTime}`)
        endTimeElt.setAttribute('datetime', `2020-01-16 ${ticketData.endTime}`)

        dateElt.textContent        = '26-01-2020'
        startTimeElt.textContent   = ticketData.startTime
        endTimeElt.textContent     = ticketData.endTime
        durationElt.textContent    = ticketData.totalDuration
        connectionsElt.textContent = ticketData.connections
        conditionsElt.textContent  = ticketData.conditions
        priceElt.textContent       = ticketData.price

        removeBtn.onclick = () => ticketApp.removeFromCartById(this, ticketData.id)
    }

    getHTML()
    {
        return fetch(TdTCartTicket.TEMPLATE_URL)
                .then((response) => response.text())
    }
}