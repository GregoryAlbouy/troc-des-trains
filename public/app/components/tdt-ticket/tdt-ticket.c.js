import { AutoloadingComponent } from '../autoloading-component.js'
import { ticketApp } from '../../app.js'
import { TicketAnimation } from '../../ticket-app/ticket-animation.js'
import { TicketEvent } from '../../ticket-app/ticket-event.js'

export class TdtTicket extends AutoloadingComponent
{
    elt = {}

    init(ticketData)
    {
        const activateAccordion = () => {
            this.close()
    
            this.elt.head.addEventListener('click', () =>  {
                const isOpen = (ticket) => ticket.getAttribute('open') === ''

                if (!isOpen(this)) {
                    // close all
                    this.parentNode.childNodes.forEach((ticket) => {
                        if (isOpen(ticket)) ticket.close()
                    })
                    this.open()
                } else {
                    this.close()
                }
            })
        }

        const setListeners = () => {
            const
                addBtn = this.elt.body.root.querySelector('.js-add-btn'),
                removeBtn = this.elt.head.root.querySelector('.js-remove-btn')

            if (!!addBtn) addBtn.onclick = () => window.dispatchEvent(new TicketEvent('clickadd', {
                detail: { id: this.ticketId, elt: this }
            }))
        }

        this.ticketId = ticketData.id
        this.elt.head = this.root.querySelector('tdt-tickethead')
        this.elt.body = this.root.querySelector('tdt-ticketbody')

        this.elt.head.init(ticketData)
        this.elt.body.init(ticketData)
        
        activateAccordion()
        setListeners()
    }

    open()
    {
        this.setAttribute('open', '')
        return new TicketAnimation('openAccordion', this.elt.body.root.querySelector('.ticket-body'), 300)
    }

    close()
    {
        this.removeAttribute('open')
        return new TicketAnimation('closeAccordion', this.elt.body.root.querySelector('.ticket-body'), 300)
    }

    addToCart(ticketId)
    {
        ticketApp.addToCartById(ticketId)
    }
}

TdtTicket.config = {
    TAGNAME: 'tdt-ticket',
    PATH: './app/components/tdt-ticket/'
}