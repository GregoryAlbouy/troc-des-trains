import { ticketApp } from '../../app.js'
import { TicketAnimation } from '../../ticket-app/ticket-animation.js'

export class TdtTicket extends HTMLElement
{
    STYLE_URL = './app/components/tdt-ticket/tdt-ticket.style.css'
    TEMPLATE_URL = './app/components/tdt-ticket/tdt-ticket.template.html'

    elt = {}

    constructor()
    {
        super()
        // this.shadow = this.attachShadow({ mode: 'open' })
    }

    async init(ticketData)
    {
        this.style.display = 'block' // to be moved to shadow style
        this.classList.add('ticket') // to be included in shadow style
        this.innerHTML = await this.getHTML()
        this.set(ticketData)
    }

    async loadString(URL)
    {
        return await (await fetch(URL)).text()
    }

    async getHTML()
    {
        return `
            <style>${await this.loadString(this.STYLE_URL)}</style>
            ${await this.loadString(this.TEMPLATE_URL)}
        `
    }

    async getCSS() {}
    
    async set(ticketData)
    {
        this.ticketId = ticketData.id
        this.elt.head = this.querySelector('tdt-tickethead')
        this.elt.body = this.querySelector('tdt-ticketbody')

        // const setAccordion = () => {
        //     this.bodyHeight = this.elt.body.getBoundingClientRect().height
        //     this.activateAccordion()
        //     console.log(performance.now() - start)
        // }

        await Promise.all([
            this.elt.head.set(ticketData),
            this.elt.body.set(ticketData)
        ]).then(() => this.activateAccordion())

        // addBtn.onclick = () => this.addToCart(ticketData.id) // set in tdt-ticketbody

    }

    open()
    {
        this.classList.add('open')
        return new TicketAnimation('openAccordion', this.elt.body, 300)

        // window.scroll(0, this.getBoundingClientRect().top) // works well with html { scroll-behaviour: smooth }. Needs to add offset

        // this.scrollIntoView()

        // const top = this.getBoundingClientRect().top
        // while(window.pageYOffset !== top) {
        //     if (window.pageYOffset < top) window.scroll(0, 10)
        //     if (window.pageYOffset > top) window.scroll(0, -10)
        // }
    }

    close()
    {
        this.classList.remove('open')
        return new TicketAnimation('closeAccordion', this.elt.body, 300)
    }

    activateAccordion()
    {
        this.elt.body.autoHeight = this.elt.body.getBoundingClientRect().height
        // First, show the ticket closed.
        if (!this.classList.contains('open')) this.elt.body.style.height = '0px'

        // Finally, restitute its height on click or set it to 0 depending on its state
        this.elt.head.addEventListener('click', () =>  {
            // close all
            if (!this.classList.contains('open')) {
                this.parentNode.childNodes.forEach((ticket) => ticket.close())
                this.open()
            } else {
                this.close()
            }
        })
    }

    addToCart(ticketId)
    {
        ticketApp.addToCartById(ticketId)
    }

}