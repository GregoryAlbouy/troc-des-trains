// import { TdtCart } from './tdt-cart/tdt-cart.js'
import { TdtCartTicket } from './tdt-cart-ticket/tdt-cart-ticket.js'
import { TdtSearchbox } from './tdt-searchbox/tdt-searchbox.js'
import { TdtTicket } from './tdt-ticket/tdt-ticket.js'
import { TdtTickethead } from './tdt-tickethead/tdt-tickethead.js'
import { TdtTicketbody } from './tdt-ticketbody/tdt-ticketbody.js'

export const components = {
    defineAll: () => {
        // customElements.define('tdt-cart', TdtCart)
        customElements.define('tdt-cart-ticket', TdtCartTicket)
        customElements.define('tdt-searchbox', TdtSearchbox)
        customElements.define('tdt-ticket', TdtTicket)
        customElements.define('tdt-tickethead', TdtTickethead)
        customElements.define('tdt-ticketbody', TdtTicketbody)
    }
}