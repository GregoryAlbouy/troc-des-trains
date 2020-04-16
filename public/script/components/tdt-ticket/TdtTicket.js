class TdtTicket extends HTMLElement
{
    constructor()
    {
        // this.root = this.attachShadow({ mode: 'open' })
    }

    attributeChangedCallback(attribute, oldValue, newValue)
    {

    }

    connectedCallback()
    {

    }
}

customElements.define('tdt-ticket', TdtTicket)