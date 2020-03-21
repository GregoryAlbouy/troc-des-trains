
class TdtTicketList extends HTMLElement
{
    constructor() 
    {
        super();

        // DOM
        this._root = this.attachShadow({ mode: 'open' }) // mode open: permet de modifier son arborescence. (?)

        // Data
        this._ticketList = [
            {
                id: 0,
                startTime: '9:10',
                endTime: '12:31'
            },
            {
                id: 1,
                startTime: '15:19',
                endTime: '18:40'
            }
        ]; 
    }

    // lifecycle callbacks :

    createdCallback() {} // quand enregistré via document.registerElement()

    attachedCallback() {} // à l'insertion dans le DOM

    detachedCallback() {} // au retrait du DOM

    attributeChangedCallback() {} // au changement d'attribu

    connectedCallback() {
        // Avec le shadowDOM, this.innerHTML devient this._root.innerHTML
        this._root.innerHTML = `
            <style></style>
            <template id="ticket-template">
                <h2 id="id"></h2>
                <p id="start-time"></p>
                <p id ="end-time"></p>
            </template>
            <div id="result"></div>
        `;

        // De même, document.querySelector() => this._root.querySelector()
        this._templateContent = this._root.querySelector('#ticket-template').content;
        this._result = this._root.querySelector('#result');

        for (const ticket of this._ticketList) {
            const clone = document.importNode(this._templateContent, true);

            //
            clone.querySelector('#id').innerHTML = ticket.id;
            clone.querySelector('#start-time').innerHTML = ticket.startTime;
            clone.querySelector('#end-time').innerHTML = ticket.endTime; 

            // Add to DOM
            this._root.querySelector('#result').appendChild(clone);
        }
    }
}

window.customElements.define('tdt-ticket-list', TdtTicketList); 