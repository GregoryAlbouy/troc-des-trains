import { TicketList } from './ticket-list.js'

export class Cart
{
    content = []
    // dom = document.querySelector('.menu--cart')
    costElement = document.querySelector('.menu--cart .total-amount')

    add(ticket)
    {
        this.content.push(ticket)
        ticket.inCart = true
        this.updateCostElement()
    }

    remove(ticket)
    {
        console.log(this.content)
        this.content = this.content.filter((match) => match !== ticket)
        ticket.inCart = false
        this.updateCostElement()
    }

    updateCostElement()
    {
        this.costElement.textContent = `${parseFloat(this.getCost()).toFixed(2)}€`
    }

    getCost()
    {
        const price = (ticket) => parseFloat(ticket.data.price)
        const add = (a, b) => a + b

        return this.content.map(price).reduce(add, 0)
    }


    // append cloned ticket
    render()
    {
        this.content.forEach((ticket) => {

        })
    }
}