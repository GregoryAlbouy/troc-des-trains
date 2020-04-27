import { ticketApp } from '../../app.js'
import { AutoloadingComponent } from '../autoloading-component.js'
import { SearchResult } from '../../ticket-app/search-result.js'

export class TdtSearchbox extends AutoloadingComponent
{
    dom = {
        conds: [],
        cond0: null,
        cond1: null,
        cond2: null,
        btn: null
    }

    conditions = [ false, false, false ]

    connectedCallback()
    {
        // this.dom.cond0 = this.root.querySelector('input[name=cond-0]')
        // this.dom.cond1 = this.root.querySelector('input[name=cond-1]')
        // this.dom.cond2 = this.root.querySelector('input[name=cond-2]')
        // this.dom.conds = [...this.root.querySelectorAll('.filter input[type=checkbox]')]
        this.dom.btn = this.root.querySelector('.js-search-btn')

        // console.log(this.dom.conds)

        this.dom.btn.addEventListener('click', () => {
            const activeConditions = [...this.root.querySelectorAll('.filter input[type=checkbox]')]
                .filter((cond) => cond.checked)
                .map((cond) => parseInt(cond.value))

            this.requestSearchResult(activeConditions)
        })
    }

    async requestSearchResult(conditions)
    {
        const ticketTable = await ticketApp.getTicketTable(conditions)
        console.log('ticketTable: ', ticketTable)
        return new SearchResult(ticketTable)
    }

}

TdtSearchbox.config = {
    TAGNAME: 'tdt-searchbox',
    PATH: './app/components/tdt-searchbox/'
}