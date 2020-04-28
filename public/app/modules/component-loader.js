
import { TdtButton } from '../components/tdt-button/tdt-button.c.js'
import { TdtSearchbox } from '../components/tdt-searchbox/tdt-searchbox.c.js'
import { TdtTicket } from '../components/tdt-ticket/tdt-ticket.c.js'
import { TdtTickethead } from '../components/tdt-tickethead/tdt-tickethead.c.js'
import { TdtTicketbody } from '../components/tdt-ticketbody/tdt-ticketbody.c.js'
import { TdtCartTicket } from '../components/tdt-cart-ticket/tdt-cart-ticket.c.js'
import { TdtCart } from '../components/tdt-cart/tdt-cart.c.js'
// import { TdtApp } from '../components/tdt-app/tdt-app.c.js'
// import { TdtHeader } from '../components/tdt-header/tdt-header.c.js'
// import { TdtFooter } from '../components/tdt-footer/tdt-footer.c.js'

export const loadComponents = () => {
    const components = [
        TdtButton,
        TdtSearchbox,
        TdtTicket,
        TdtTickethead,
        TdtTicketbody,
        TdtCartTicket,
        TdtCart,
        // TdtApp,
        // TdtHeader,
        // TdtFooter
    ]
    
    const defineComponent = (component) => customElements.define(component.config.TAGNAME, component)

    const preloadTemplate = (component) => component.loadTemplate()

    components.forEach(defineComponent)

    return Promise.all(components.map(preloadTemplate))
}
