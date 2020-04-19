import { Cart } from './cart.js'
import { TicketList } from './ticket-list.js'
import { Ticket } from './ticket.js'
import { ticketDataList } from './ticket-data.js'
import { Utils } from '../modules/utils.js'

export class TicketApp
{
    cart = new Cart()
    ticketList = new TicketList()
    
    constructor()
    {
        const matchedList = ticketDataList // has to be the results of the search

        this.loadTicketsInTicketList(matchedList)
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

    removeFromCartById(cartTicketElt, ticketId)
    {
        this.cart.removeById(cartTicketElt, ticketId)
        console.log('placeholder: reactivate ticket in ticket list')
    }

    addToCart(ticket)
    {
        this.ticketList.deactivateTicket(ticket)
        this.cart.add(ticket)
        // Utils.animateAdd2(ticket)
    }

    removeFromCart(ticket)
    {
        // Utils.animateRemove(ticket)
        //     .then(() => {
        //         console.log(this)
        //     })
        this.cart.remove(ticket)
        this.ticketList.reactivateTicket(ticket)
    }

    loadTicketsInTicketList(matchedList)
    {
        matchedList.forEach((ticketData) => {
            this.ticketList.add(new Ticket(this, ticketData))
        })
        this.ticketList.render()
    }

    getTicketFromId(ticketId)
    {
        return ticketDataList.find((ticket => ticket.id === ticketId))
    }
}