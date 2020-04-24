export class TdtTickethead extends HTMLElement
{
    STYLE_URL = './app/components/tdt-tickethead/tdt-tickethead.style.css'
    TEMPLATE_URL = './app/components/tdt-tickethead/tdt-tickethead.template.html'

    // async connectedCallback()
    // {
    //     // this.classList.add('ticket-head')
    //     // // this.style.display = 'block' // already 'flex'
    //     // this.innerHTML = await this.getHTML()
    //     // this.setFromSlots() // if use slots instead of set()
    // }

    async set(ticketData)
    {
        this.classList.add('ticket-head')
        // this.style.display = 'block'
        this.innerHTML = await this.getHTML()
        const
            dateElt        = this.querySelector('.journey-date'),
            startTimeElt   = this.querySelectorAll('.step-time')[0],
            endTimeElt     = this.querySelectorAll('.step-time')[1],
            durationElt    = this.querySelector('.journey-duration'),
            connectionsElt = this.querySelector('.journey-connections'),
            conditionsElt  = this.querySelector('.conditions'),
            priceElt       = this.querySelector('.price')

        startTimeElt.setAttribute('datetime', ticketData.startTime)
        endTimeElt.setAttribute('datetime', ticketData.endTime)

        dateElt.textContent        = ticketData.startDate
        startTimeElt.textContent   = ticketData.startTime
        endTimeElt.textContent     = ticketData.endTime
        durationElt.textContent    = ticketData.totalDuration
        connectionsElt.textContent = ticketData.connectionsDisplay
        conditionsElt.textContent  = ticketData.conditions
        priceElt.textContent       = ticketData.priceDisplay
    }

    async getHTML()
    {
        return await (await fetch(this.TEMPLATE_URL)).text()
    }
}