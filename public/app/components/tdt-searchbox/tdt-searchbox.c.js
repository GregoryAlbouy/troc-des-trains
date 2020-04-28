import { ticketApp } from '../../app.js'
import { AutoloadingComponent } from '../autoloading-component.js'
import { SearchResult } from '../../ticket-app/search-result.js'
import { Utils } from '../../modules/utils.js'

export class TdtSearchbox extends AutoloadingComponent
{
    constructor()
    {
        super()
        this.dom = {}
    }

    connectedCallback()
    {
        this.dom.fromInput = this.root.querySelector('.search input[name=from]')
        this.dom.toInput = this.root.querySelector('.search input[name=to]')
        this.dom.dateInput = this.root.querySelector('.search input[name=date]')
        this.dom.btn = this.root.querySelector('.js-search-btn')

        this.dom.dateInput.placeholder = Utils.datetime(new Date(Date.now())).toDate()

        this.dom.btn.addEventListener('click', () => {
            const activeConditions = [...this.root.querySelectorAll('.filter input[type=checkbox]')]
                .filter((condition) => condition.checked)
                .map((condition) => parseInt(condition.value))

            this.requestSearchResult(activeConditions)
        })
    }

    async requestSearchResult(conditions)
    {
        const ticketTable = await ticketApp.getTicketTable(conditions)
        console.log(ticketTable)
        const alteredTicketTable = ticketTable.map((ticket) => {
            ticket.steps[0].startStation = this.dom.fromInput.value || this.dom.fromInput.placeholder
            ticket.steps[ticket.steps.length - 1].endStation = this.dom.toInput.value || this.dom.toInput.placeholder
            ticket.dummyDate = this.dom.dateInput.value || this.dom.dateInput.placeholder
            return ticket
        })
        return new SearchResult(alteredTicketTable)
    }

}

TdtSearchbox.config = {
    TAGNAME: 'tdt-searchbox',
    PATH: './app/components/tdt-searchbox/'
}