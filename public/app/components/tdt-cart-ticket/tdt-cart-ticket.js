import { ticketApp } from '../../app.js'
import { Utils } from '../../modules/utils.js'
import { TicketEvent } from '../../ticket-app/ticket-event.js'

export class TdtCartTicket extends HTMLElement
{
    STYLE_URL = './app/components/tdt-cart-ticket/tdt-cart-ticket.style.css'
    TEMPLATE_URL = './app/components/tdt-cart-ticket/tdt-cart-ticket.template.html'
    
    async init(ticketData)
    {
        this.innerHTML = await this.getTemplate()
        // const style = document.createElement('style')
        // this.insertAdjacentElement('afterbegin', style)
        this.set(ticketData)
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

        startTimeElt.setAttribute('datetime', ticketData.startTime)
        endTimeElt.setAttribute('datetime', ticketData.endTime)

        dateElt.textContent        = ticketData.startDate
        startTimeElt.textContent   = ticketData.startTime
        endTimeElt.textContent     = ticketData.endTime
        durationElt.textContent    = ticketData.totalDuration
        connectionsElt.textContent = ticketData.connectionsDisplay
        conditionsElt.textContent  = ticketData.conditions
        priceElt.textContent       = ticketData.priceDisplay

        removeBtn.onclick = () => window.dispatchEvent(new TicketEvent('clickremove', {
            detail: { id: ticketData.id, elt: this }
        }))
    }

    async getTemplate()
    {
        return await (await fetch(this.TEMPLATE_URL)).text()
    }

    async getStyle()
    {
        return await (await fetch(this.STYLE_URL)).text()
    }
}