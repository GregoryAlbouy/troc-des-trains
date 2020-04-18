export class Cart
{
    content = []
    dom = {
        element: null,
        btn: document.querySelector('.header-btn--cart'),
        ticketList: null,
        total: null
    }

    constructor()
    {
        this.create()


        const updateDisplay = () => {
            console.log('event activated')
            this.dom.btn.setAttribute('data-value', this.content.length)
        }
        const handler = () => updateDisplay.apply(this)

        this.dom.ticketList.addEventListener('ticketappend', handler)
    }

    add(ticket)
    {
        this.content.push(ticket)
        ticket.inCart = true
        this.updateTotal()
    }

    remove(ticket)
    {
        this.content = this.content.filter((match) => match !== ticket)
        ticket.inCart = false
        this.updateTotal()
    }

    updateTotal()
    {
        this.dom.total.textContent = `${parseFloat(this.getTotal()).toFixed(2)}€`
    }

    getTotal()
    {
        const price = (ticket) => parseFloat(ticket.data.price)
        const add = (a, b) => a + b

        return this.content.map(price).reduce(add, 0)
    }

    create()
    {
        this.dom.element = document.createElement('section')
        this.dom.element.classList.add('menu', 'menu--cart')
        this.dom.element.innerHTML = this.getHTML()
        
        this.dom.ticketList = this.dom.element.querySelector('.cart-list')
        this.dom.total = this.dom.element.querySelector('.total-amount')

        this.dom.btn.addEventListener('click', () => this.dom.element.classList.toggle('on'))
        
        document.body.append(this.dom.element)
    }

    getHTML()
    {
        return `
            <h2 class="menu-title">Mes billets</h2>
            <div class="cart-list"></div>
            <div class="order-section">
                <p class="total">Total TTC</p>
                <p class="total-amount"></p>
            </div>
            <button class="btn btn--add">Commander</button>
        `
    }
}