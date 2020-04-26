import { AutoloadingComponent } from '../autoloading-component.js'

export class TdtTickethead extends AutoloadingComponent
{
    init(ticketData)
    {
        const
            date        = this.querySelector('span[slot=date]'),
            startTime   = this.querySelector('span[slot=start-time]'),
            endTime     = this.querySelector('span[slot=end-time]'),
            duration    = this.querySelector('span[slot=duration]'),
            connections = this.querySelector('span[slot=connections]'),
            conditions  = this.querySelector('span[slot=conditions]'),
            price       = this.querySelector('span[slot=price]')

        date.textContent        = ticketData.startDate
        startTime.textContent   = ticketData.startTime
        endTime.textContent     = ticketData.endTime
        duration.textContent    = ticketData.totalDuration
        connections.textContent = ticketData.connectionsDisplay
        conditions.textContent  = ticketData.conditions
        price.textContent       = ticketData.priceDisplay
    }
}

TdtTickethead.config = {
    TAGNAME: 'tdt-tickethead',
    PATH: './app/components/tdt-tickethead/'
}