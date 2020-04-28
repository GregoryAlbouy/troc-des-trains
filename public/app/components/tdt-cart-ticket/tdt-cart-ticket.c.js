import { AutoloadingComponent } from '../autoloading-component.js'
import { TicketEvent } from '../../ticket-app/ticket-event.js'

export class TdtCartTicket extends AutoloadingComponent
{  
    init(ticketData)
    {
        const thead = this.root.querySelector('tdt-tickethead')
        const removeBtn = thead.root.querySelector('.js-remove-btn')

        thead.init(ticketData)
        removeBtn.addEventListener('click', () => window.dispatchEvent(new TicketEvent('clickremove', {
            detail: { id: ticketData.id, elt: this }
        })))
    }
}

TdtCartTicket.config = {
    TAGNAME: 'tdt-cart-ticket',
    PATH: './app/components/tdt-cart-ticket/'
}