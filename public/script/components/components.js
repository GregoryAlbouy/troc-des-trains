// import { TdtCart } from "./tdt-cart/tdt-cart.js"
import { TdTCartTicket } from "./tdt-cart-ticket/tdt-cart-ticket.js"
// import { TdtSearchbox } from "./tdt-searchbox/tdt-searchbox.js"
// import { TdtTicket } from "./tdt-ticket/tdt-ticket.js"

export const components = {
    defineAll: () => {
        // customElements.define('tdt-cart', TdtCart)
        customElements.define('tdt-cart-ticket', TdTCartTicket)
        // customElements.define('tdt-searchbox', TdtSearchbox)
        // customElements.define('tdt-ticket', TdtTicket)
    }
}