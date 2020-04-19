import { TdTCartTicket } from "./tdt-cart-ticket/tdt-cart-ticket.js";

export const components = {
    defineAll: () => {
        customElements.define('tdt-cart-ticket', TdTCartTicket)
    }
}