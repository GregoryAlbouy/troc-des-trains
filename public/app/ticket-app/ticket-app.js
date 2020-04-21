import { Cart } from './cart.js'
import { SearchResult } from './search-result.js'
import { Ticket } from './ticket.js'
// import { ticketDataList } from './ticket-data.js'
import { Utils } from '../modules/utils.js'
import { TicketAnimation } from './ticket-animation.js'

/**
 * TODO: separate data file for vendors and make a join to display infos on tickets
 * [ { name, picture, rating, comments, reviews } ... ]
 */
export class TicketApp
{
    TICKET_DATA_URL = 'http://localhost/trocdestrains/data/tickets.json'
    cart = new Cart()
    searchResult = new SearchResult()
    
    constructor()
    {
        window.addEventListener('clickadd', this.addToCart.bind(this))
        window.addEventListener('clickremove', this.removeFromCart.bind(this))

        this.init()

        // TODO: make it conditionnal to the user search
        // const matchedList = this.getTicketTable()
        //     .then()
        // this.loadTicketsInTicketList(matchedList)
        /*
        // Declarations

        let
            cartContent = 0,
            totalCost = 0,
            removeBtnList = document.querySelectorAll('.menu--cart .ticket .close-btn');

        const
            ticketList = document.querySelectorAll('.ticket'),
            addBtnList = document.querySelectorAll('.ticket .btn--add'),
            cartMenuList = document.querySelector('.cart-list'),
            cartIcon = document.querySelector('.header-btn--cart');

        // Methods
        const add = (ticket, i) => {

            // Close the active ticket first
            ticket.classList.remove('open');
            ticket.querySelector('.ticket-body').style.height = '0px';

            // Clone the ticket to animate it and keep the original still
            const ticketCopy = Utils.cloneElement(ticket);
            ticketCopy.classList.add('to-cart');

            // Once the ticket is closed, let's show the animation
            setTimeout(() => {
    
                ticket.parentNode.appendChild(ticketCopy);
                ticket.classList.add('added');

                // Modification of the data
                cartContent += 1;
                cartIcon.setAttribute('data-value', cartContent);
                
                // finally, add it to cart
                setTimeout(() => {
                    // Prepare element's style
                    ticketCopy.classList.remove('to-cart');
                    ticketCopy.classList.add('in-cart');
                    ticketCopy.style.removeProperty('top');
                    ticketCopy.style.removeProperty('left');
                    ticketCopy.setAttribute('data-id', i)

                    // Add it physically
                    // let cartMenuItem = document.createElement('li');
                    // cartMenuItem.appendChild(ticketCopy);
                    // cartMenuList.appendChild(cartMenuItem);
                    cartMenuList.appendChild(ticketCopy);

                    // Update the total price
                    totalCost += getPrice(i);
                    updateCostDisplay();
                    updateRemoveBtnListener()
                }, 300);
            }, 300);
        };

        const remove = (cartTicket, id) => {
            // Fade out then delete the cart item
            cartTicket.style.opacity = "0";
            setTimeout(() => {
                // Remove the <li> element containing the ticket
                cartTicket.parentNode.removeChild(cartTicket);
                updateRemoveBtnListener();

                // Find in the results section the deactivated ticket and reactivate it
                let ticketResultList = document.querySelectorAll('.ticket-list-container .ticket');
                for (const ticket of ticketResultList) {
                    if (parseInt(ticket.getAttribute('data-id')) == id) {
                        ticket.classList.remove('added');
                    }
                }

                // Finally, update data
                cartContent -= 1;
                cartIcon.setAttribute('data-value', cartContent);
                totalCost -= getPrice(id);
                updateCostDisplay();
            }, 1000);
        };

        // Returns the price from a ticket's id
        const getPrice = (id) => parseFloat(ticketDataList[id].price);

        // Update the total price in cart menu
        const updateCostDisplay = () => {
            const displayTotal = document.querySelector('.total-amount');
            displayTotal.textContent = totalCost.toFixed(2) + '€';
        };

        // Update the list of ticket items in the cart menu from the DOM
        const updateRemoveBtnListener = () => {

            removeBtnList = document.querySelectorAll('.ticket.in-cart .close-btn');

            for (const removeBtn of removeBtnList) {
                let ticketElt = removeBtn.parentNode,
                    ticketId = parseInt(ticketElt.getAttribute('data-id'));
                
                removeBtn.onclick = () => { remove(ticketElt, ticketId); };
            }
        };
        
        for (let i=0; i<addBtnList.length; i++) {
            addBtnList[i].addEventListener('click', () => { add(ticketList[i], i) })
        }
        */

    }

    async init()
    {
        // TODO: make it a selected data from user search request
        const ticketTable = await this.getTicketTable()
        this.renderSearchResult(ticketTable)
    }

    async getTicketTable()
    {
        return await (await fetch(this.TICKET_DATA_URL)).json()
    }

    addToCart(event)
    {
        const ticket = this.getTicketById(event.detail.id)
        const ticketElt = event.detail.elt

        if (ticket.inCart) return

        (async () => {
            await ticketElt.close()
            new TicketAnimation('addTicket', ticketElt, 600)
            ticketElt.classList.add('added') //  TODO: hande fully in JS? without css class
            this.cart.add(ticket)
        })()
    }

    /**
     * TODO: move here animations, keep only logic in cart instance (same for searchResult)
     */
    removeFromCart(event)
    {
        const ticket = this.getTicketById(event.detail.id)
        const ticketElt = event.detail.elt

        if (!ticket.inCart) return
        this.cart.remove(ticketElt, ticket)
    }

    renderSearchResult(ticketTable)
    {
        ticketTable.forEach((ticketData) => {
            this.searchResult.add(new Ticket(ticketData))
        })
        this.searchResult.render()
    }

    /**
     * A) from database: loose the setted properties in Ticket instance ==> make a new instance??
     * ===> return new Ticket(data.find())
     * /!\ two different instances: might be a mess dealing with inCart state 
     * 
     * B) from ticket instance: seems more logical.
     * Need to find a way to get it without using searchResult instance content
     */
    getTicketById(ticketId)
    {
        // return ticketDataList.find((ticket => ticket.id === ticketId))
        return this.searchResult.content.find((ticket => ticket.data.id === ticketId))
    }
}