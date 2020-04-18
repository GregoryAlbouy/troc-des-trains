import { TicketEvent } from './ticket-event.js'

export class Utils
{
    // Returns offset properties used in various functions
    static getOffset(element)
    {
        return {
            top: element.offsetTop - element.scrollTop,
            left: element.offsetLeft - element.scrollLeft,
            width: element.offsetWidth,
            height: element.clientHeight
        }
    }

    /**
     * Duplicates an element and positions it in absolute at the same place
     * @param {Element} element Element to be cloned
     * @function
     * @returns {Element} clone
     */
    static floatingCopy(element)
    {
        // Get actual position of the original element and create the clone
        const
            elementPos = Utils.getOffset(element),
            clone = element.cloneNode(true)

        // Set clone's position to the dynamic position of original element
        clone.style.top = elementPos.top + 'px'
        clone.style.left = elementPos.left + 'px'

        return clone
    }

    static addAnimation(ticket)
    {
        // Close the active ticket first
        ticket.close()

        // Clone the ticket to animate it and keep the original still
        const ticketCopy = Utils.floatingCopy(ticket.dom.element);
        ticketCopy.classList.add('to-cart');

        // Once the ticket is closed, let's show the animation
        setTimeout(() => {

            ticket.dom.element.parentNode.appendChild(ticketCopy);
            ticket.dom.element.classList.add('added');
            
            // FIX: à mettre dans la classe Cart
            // ticket.ticketApp.cart.dom.btn.setAttribute('data-value', ticket.ticketApp.cart.content.length);
            
            // finally, add it to cart
            setTimeout(() => {
                const container = document.querySelector('.cart-list')
                // Prepare element's style
                ticketCopy.classList.remove('to-cart');
                ticketCopy.classList.add('in-cart');
                ticketCopy.style.removeProperty('top');
                ticketCopy.style.removeProperty('left');
                container.appendChild(ticketCopy);
                ticket.ticketApp.cart.dom.ticketList.dispatchEvent(new TicketEvent('ticketappend', {
                    detail: {
                        parent: container,
                        element: ticketCopy
                    }
                }))
            }, 300);
        }, 300);
    }


}