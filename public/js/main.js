document.addEventListener('DOMContentLoaded', () => {

    /* Declarations */

    let
        cartContent = 0,
        totalCost = 0,
        removeBtnList = document.querySelectorAll('.menu--cart .ticket .close-btn');

    const
        accordionList = [
            {
                trigger: document.querySelectorAll('.ticket-head'),
                target: document.querySelectorAll('.ticket-body'),
                isIterable: true
            },
            {
                trigger: document.querySelectorAll('.conditions-btn'),
                target: document.querySelectorAll('.conditions-content'),
                isIterable: true
            }
        ],
        dropdownList = [
            {
                trigger: document.querySelector(`.header-btn--cart`),
                target: document.querySelector(`.menu--cart`)
            }
        ];

    /* Functions */

    // Dropdown function for header elements
    const toggleDropdown = (trigger, target) => {
        trigger.addEventListener('click', () => target.classList.toggle('on'));
    };

    // Makes an accordion without having to set height: 0 in the css file. Also allows css transition with auto height
    const toggleAccordion = (trigger, target) => {

        // First, get actual height of the target element to reinject it later
        const targetHeight = getOffset(target).height;

        // Then, set it to 0 to hide it
        if (!target.classList.contains('open')) target.style.height = '0px';

        // Finally, restitute its height on click or set it to 0 depending on its state
        trigger.addEventListener('click', () =>  {
            trigger.parentNode.classList.toggle('open');

            if (trigger.parentNode.classList.contains('open')) {
                target.style.height = targetHeight + 'px';

                // Test autoscroll 1
                // target.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });

                // Test autoscroll 2
                // window.scroll(0, getOffset(target).top);
            } else {
                target.style.height = '0px';
            }
        });
    };

    // Duplicates an element and positions it in absolute at the same place
    const cloneElement = element => {

        // Get actual position of the original element and create the clone
        const
            elementPos = getOffset(element),
            clone = element.cloneNode(true);

        // Set clone's position to the dynamic position of original element
        clone.style.top = elementPos.top + 'px';
        clone.style.left = elementPos.left + 'px';

        return clone;
    };

    // Returns offset properties used in various functions
    const getOffset = element => {
        return {
            top: element.offsetTop - element.scrollTop,
            left: element.offsetLeft - element.scrollLeft,
            height: element.offsetHeight
        }
    };

    // Contains all functions related to tickets managing (add, remove...)
    const ticketManager = () => {

        /* Declarations */
        const
            ticketList = document.querySelectorAll('.ticket'),
            addBtnList = document.querySelectorAll('.ticket .btn--add'),
            cartMenuList = document.querySelector('.cart-list'),
            cartIcon = document.querySelector('.header-btn--cart');

        /* Methods */
        const add = (ticket, i) => {

            // Close the active ticket first
            ticket.classList.remove('open');
            ticket.querySelector('.ticket-body').style.height = '0px';

            // Clone the ticket to animate it and keep the original still
            const ticketCopy = cloneElement(ticket);
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
            displayTotal = document.querySelector('.total-amount');
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
    }

    /* Launch HMI */

    ticketManager();

    // Launches toggleAccordion function for all elements in accordionList
    for (accordion of accordionList) {

        // If it's an array, then launch the function each occurrence
        if (accordion.isIterable) {
            for (let i=0; i<accordion.trigger.length; i++) {
                toggleAccordion(accordion.trigger[i], accordion.target[i]);
            }
        // Else, simply launch the function
        } else {
            toggleAccordion(accordion.trigger, accordion.target);
        }
    }

    // Idem for dropdown
    for (dropdown of dropdownList) {
        toggleDropdown(dropdown.trigger, dropdown.target);
    }
})