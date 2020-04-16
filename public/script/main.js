import { Utils } from './modules/utils.js'
import { TicketList } from './modules/ticket-app/ticket-list.js'

document.addEventListener('DOMContentLoaded', () => {

    /* Declarations */
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
        const targetHeight = Utils.getOffset(target).height;

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


    /* Launch HMI */

    const ticketList = new TicketList() 

    // Launches toggleAccordion function for all elements in accordionList
    for (const accordion of accordionList) {

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
    for (const dropdown of dropdownList) {
        toggleDropdown(dropdown.trigger, dropdown.target);
    }

});