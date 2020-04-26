import { AutoloadingComponent } from '../autoloading-component.js'

export class TdtCartTicket extends AutoloadingComponent
{  
    init(ticketData)
    {
        this.root.querySelector('tdt-tickethead').init(ticketData)
    }
}

TdtCartTicket.config = {
    TAGNAME: 'tdt-cart-ticket',
    PATH: './app/components/tdt-cart-ticket/'
}