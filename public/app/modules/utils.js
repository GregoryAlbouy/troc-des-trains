import { TicketEvent } from '../ticket-app/ticket-event.js'

/**
 * TODO: move all animations to TicketAnimation
 */
export class Utils
{
    // Returns offset properties used in various functions
    static getOffset(element)
    {
        return {
            top: element.offsetTop - element.scrollTop,
            left: element.offsetLeft - element.scrollLeft,
            width: element.offsetWidth,
            height: element.offsetHeight
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

    static ghostOf(element)
    {
        // Get actual position of the original element and create the clone
        const
            elementPosition = Utils.getOffset(element),
            ghost = element.cloneNode(true)

        // Set clone's position to the actual position of original element
        ghost.style.top = elementPosition.top + 'px'
        ghost.style.left = elementPosition.left + 'px'

        ghost.classList.add('added')

        return ghost
    }

    static datetime(stringDate, stringDateStart)
    {
        const datetime = new Date(Date.parse(stringDate))
        const datetimeStart = stringDateStart ? new Date(Date.parse(stringDateStart)) : null

        const formatNumber = (n) => n <= 9 ? `0${n}` : `${n}`

        const getFormattedNumbers = (datetime) => {
            return {
                YYYY: datetime.getFullYear(),
                MM: formatNumber(datetime.getMonth() + 1),
                dd: formatNumber(datetime.getDate()),
                hh: datetime.getUTCHours(),
                mm: formatNumber(datetime.getMinutes())
            }
        }

        const formatDate = (d) => `${d.dd}/${d.MM}/${d.YYYY}`
        const formatTime = (d) => `${d.hh}:${d.mm}`
        const formatDuration = (d) => `${d.hh}h${d.mm}`

        const getDuration = (datetime, datetimeStart) => {
            const datediff = new Date(Date.parse(datetime) - Date.parse(datetimeStart))
            return formatDuration(getFormattedNumbers(datediff))
        }

        return {
            toDate: () => formatDate(getFormattedNumbers(datetime)),
            toTime: () => formatTime(getFormattedNumbers(datetime)),
            toDuration: () => getDuration(datetime, datetimeStart)
        }
    }

    static animateAdd2(ticket)
    {
        ticket.close()

        const ghost = Utils.ghostOf(ticket.dom.element)
        ticket.dom.element.insertAdjacentHTML('beforeBegin', ghost.outerHTML)
        
        ticket.dom.element.classList.add('to-cart')

        setTimeout(() => {
            const container = ticket.ticketApp.cart.dom.ticketList

            ticket.dom.element.classList.remove('to-cart')
            ticket.dom.element.classList.add('in-cart')
            ticket.dom.element.style.removeProperty('top');
            ticket.dom.element.style.removeProperty('left');

            container.appendChild(ticket.dom.element);

            ticket.ticketApp.cart.dom.ticketList.dispatchEvent(new TicketEvent('ticketappend', {
                detail: {
                    parent: container,
                    element: ticket.dom.element
                }
            }))
        }, 300)


    }

    static animateAdd(ticket)
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

    static animateRemove(ticket)
    {
        // Fade out then delete the cart item
        ticket.dom.element.style.opacity = '0';

        return new Promise((resolve, reject => {
            setTimeout(() => resolve(), 1000)
        }))

        setTimeout(() => {
            // Remove the <li> element containing the ticket
            ticket.dom.element.parentNode.removeChild(ticket.dom.element);

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
    }


}