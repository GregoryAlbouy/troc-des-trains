import { TdtCart } from '../components/tdt-cart/tdt-cart.c.js'
import { TdtSearchbox } from '../components/tdt-searchbox/tdt-searchbox.c.js'
// import { Searchbox } from './searchbox.js'
import { SearchResult } from './search-result.js'
// import { Ticket } from './ticket.js'
// import { ticketDataList } from './ticket-data.js'
// import { Utils } from '../modules/utils.js'
import { TicketAnimation } from './ticket-animation.js'
import { TicketEvent } from './ticket-event.js'
// import { debugTicket } from '../app.js'


/**
 * TODO: separate data file for vendors and make a join to display infos on tickets
 * [ { name, picture, rating, comments, reviews } ... ]
 */
export class TicketApp
{
    constructor()
    {
        this.TICKET_DATA_URL = '../data/tickets.json'
        this.cart = document.body.appendChild(new TdtCart())
        this.searchbox = document.querySelector('.search-section').appendChild(new TdtSearchbox)
        this.searchResult = null

        window.addEventListener('clickadd', this.addToCart.bind(this))
        window.addEventListener('clickremove', this.removeFromCart.bind(this))

        // to be moved to header component when ready
        document.querySelector('.header-btn--cart').addEventListener('click', () => {
            window.dispatchEvent(new TicketEvent('cart-btn-click'))
        })

        this.init()
    }

    async init()
    {
        // TODO: make it a selected data from user search request
        const ticketTable = await this.getTicketTable()
        this.searchResult = this.renderSearchResult(ticketTable)
    }

    async getTicketTable(filters = [])
    {
        const ticketTable = await (await fetch(this.TICKET_DATA_URL)).json()

        if (!filters.length) return ticketTable

        // const filterResult = ticketTable.filter((ticket) => {
        //     const reduceResult = filters.reduce((a, b) => (ticket.conditions === a || ticket.conditions === b), false)
        //     console.log('REDUCE RESULR: ', reduceResult)
        //     return reduceResult
        // })

        const filterResult = ticketTable.filter((ticket) => {
            const reduceResult = filters.some((condition) => ticket.conditions === condition)
            return reduceResult
        })
        
        // console.log('RESULT: ', filterResult)
        return filterResult
    }

    addToCart(event)
    {
        const ticket = this.getTicketById(event.detail.id)
        const ticketElt = event.detail.elt

        if (ticket.inCart) return

        (async () => {
            await ticketElt.close()
            new TicketAnimation('addTicket', ticketElt, 600)
            ticketElt.setAttribute('added', '') //  TODO: hande fully in JS? without css class
            this.cart.add(ticket)
        })()
    }

    /**
     * TODO: move here animations, keep only logic in cart instance (same for searchResult)
     */
    removeFromCart(event)
    {
        const ticket = this.getTicketById(event.detail.id)
        const ticketElt = event.detail.elt

        if (!ticket.inCart) return
        this.cart.remove(ticketElt, ticket)
            .then(() => this.searchResult.reactivateTicket(ticket))
        // this.searchResult.reactivateTicket(ticket)
    }

    renderSearchResult(ticketTable)
    {
        return new SearchResult(ticketTable)
        // ticketTable.forEach((ticketData) => {
        //     this.searchResult.add(new Ticket(ticketData))
        // })
        // this.searchResult.render()
    }

    /**
     * A) from database: loose the setted properties in Ticket instance ==> make a new instance??
     * ===> return new Ticket(data.find())
     * /!\ two different instances: might be a mess dealing with inCart state 
     * 
     * B) from ticket instance: seems more logical.
     * Need to find a way to get it without using searchResult instance content
     */
    getTicketById(ticketId)
    {
        // return ticketDataList.find((ticket => ticket.id === ticketId))
        return this.searchResult.content.find((ticket => ticket.data.id === ticketId))
    }
}